# app.py
from __future__ import annotations
import os, json, duckdb
from typing import List, Tuple

from fastapi import FastAPI, HTTPException, Query
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from dotenv import load_dotenv

# ---------- env / settings ----------
load_dotenv()  # reads .env from the current folder

def _resolve_db_path() -> str:
    raw = os.getenv("DUCKDB_PATH", "warehouse.duckdb")
    if not os.path.isabs(raw):
        raw = os.path.abspath(os.path.join(os.path.dirname(__file__), raw))
    print("Resolved DUCKDB_PATH:", raw, "exists:", os.path.exists(raw))
    return raw

DB_PATH = _resolve_db_path()
READ_ONLY = os.getenv("READ_ONLY", "true").lower() in ("1", "true", "yes")
ALLOW_ORIGINS = [o.strip() for o in os.getenv("CORS_ALLOW_ORIGINS", "http://localhost:5173").split(",") if o.strip()]

app = FastAPI(title=f"EMSV API ({'RO' if READ_ONLY else 'RW'})")
app.add_middleware(
    CORSMiddleware,
    allow_origins=ALLOW_ORIGINS,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ---------- single shared DuckDB connection ----------
_con: duckdb.DuckDBPyConnection | None = None

@app.on_event("startup")
def _startup():
    global _con
    _con = duckdb.connect(DB_PATH, read_only=READ_ONLY)
    # Install/load spatial once; no-ops if already installed
    _con.execute("INSTALL spatial;")
    _con.execute("LOAD spatial;")
    # Optional (DuckDB >= 0.10) – ignore if older
    try:
        _con.execute("SET lock_timeout='5s';")
    except duckdb.Error:
        pass

@app.on_event("shutdown")
def _shutdown():
    global _con
    if _con:
        _con.close()
        _con = None

def q(sql: str, params: list | tuple = ()):
    """Query helper against the shared connection with friendly errors."""
    try:
        assert _con is not None
        return _con.execute(sql, params).fetchall()
    except duckdb.Error as e:
        raise HTTPException(500, f"DuckDB error: {e}") from e

# ---------- helpers ----------
def parse_bbox(bbox: str | None) -> tuple[str, list]:
    if not bbox:
        return "", []
    parts = bbox.split(",")
    if len(parts) != 4:
        raise HTTPException(400, "bbox debe ser 'minx,miny,maxx,maxy'")
    minx, miny, maxx, maxy = map(float, parts)
    return "WHERE ST_Intersects(geom, ST_MakeEnvelope(?, ?, ?, ?))", [minx, miny, maxx, maxy]

def fc(features: list[dict]) -> dict:
    return {"type": "FeatureCollection", "features": features}

# -------------------------------
# ENDPOINTS
# -------------------------------
@app.get("/health")
def health():
    q("SELECT 1")
    return {"ok": True, "mode": "read-only" if READ_ONLY else "read-write"}

# ---------- Buffers ----------
def _select_buffers(where_sql: str, params: list) -> List[Tuple]:
    sql = f"""
        WITH f AS (
          SELECT id, user_id, buffer_m, geom
          FROM point_buffers
          {where_sql}
        )
        SELECT id, user_id, buffer_m, ST_AsGeoJSON(geom) AS geom_json
        FROM f;
    """
    return q(sql, params)

@app.get("/buffers")
def get_buffers(bbox: str | None = None, limit: int = 1000, offset: int = 0):
    where_sql = ""
    params: list = []
    if bbox:
        w, p = parse_bbox(bbox)
        where_sql = f"{w} LIMIT ? OFFSET ?"
        params = p + [limit, offset]
    else:
        where_sql = "LIMIT ? OFFSET ?"
        params = [limit, offset]

    rows = _select_buffers(where_sql, params)
    features = [{
        "type": "Feature",
        "geometry": json.loads(gjson) if isinstance(gjson, str) else gjson,
        "properties": {"id": rid, "user_id": ruser, "buffer_m": float(rbuf) if rbuf is not None else None}
    } for rid, ruser, rbuf, gjson in rows]
    return fc(features)

# ---------- Points ----------
class SavePointReq(BaseModel):
    lon: float
    lat: float
    buffer_m: float = 100.0
    user_id: str | None = None

@app.post("/points")
def save_point(req: SavePointReq):
    if READ_ONLY:
        raise HTTPException(403, "Esta API está en modo read-only")
    # Create a short transaction for safety
    try:
        assert _con is not None
        _con.execute("BEGIN")
        new_id = _con.execute("SELECT COALESCE(MAX(id),0)+1 FROM points").fetchone()[0]
        _con.execute(
            """
            INSERT INTO points (id, user_id, geom, buffer_m, props)
            VALUES (?, ?, ST_Point(?, ?), ?, {'source':'form'}::JSON)
            """,
            [new_id, req.user_id, req.lon, req.lat, req.buffer_m],
        )
        _con.execute("COMMIT")
    except Exception:
        _con.execute("ROLLBACK")
        raise
    return {"ok": True, "id": new_id}

@app.get("/points/count")
def points_count(bbox: str | None = None):
    where, params = parse_bbox(bbox)
    cnt = q(f"SELECT COUNT(*) FROM big_points {where};", params)[0][0]
    return {"count": int(cnt)}

@app.get("/points/features")
def points_features(
    bbox: str | None = Query(None, description="minx,miny,maxx,maxy (WGS84)"),
    limit: int = 2000,
    offset: int = 0,
):
    where, params = parse_bbox(bbox)
    rows = q(f"""
        WITH f AS (
          SELECT geom, * EXCLUDE (geom)
          FROM big_points
          {where}
          LIMIT ? OFFSET ?
        )
        SELECT ST_AsGeoJSON(geom) AS gjson, to_json(f) AS props
        FROM f;
    """, params + [limit, offset])

    features = [{
        "type": "Feature",
        "geometry": json.loads(gjson),
        "properties": json.loads(props) if isinstance(props, str) else (props or {})
    } for gjson, props in rows]
    return fc(features)

# ---------- Shadows ----------
@app.get("/shadows/features")
def shadows_features(
    bbox: str | None = Query(None, description="minx,miny,maxx,maxy (WGS84)"),
    limit: int = 5000,
    offset: int = 0,
):
    where, params = parse_bbox(bbox)
    rows = q(f"""
        WITH f AS (
          SELECT geom, shadow_count
          FROM shadows
          {where}
          LIMIT ? OFFSET ?
        )
        SELECT ST_AsGeoJSON(geom) AS gjson, shadow_count FROM f;
    """, params + [limit, offset])

    features = [{
        "type": "Feature",
        "geometry": json.loads(gjson),
        "properties": {"shadow_count": float(sc) if sc is not None else None}
    } for gjson, sc in rows]
    return fc(features)

class ZonalReq(BaseModel):
    geometry: dict  # GeoJSON Polygon/MultiPolygon

@app.post("/shadows/zonal")
def shadows_zonal(req: ZonalReq):
    geojson = json.dumps(req.geometry)
    n, avg, mn, mx = q("""
        WITH zone AS (SELECT ST_GeomFromGeoJSON(?::VARCHAR) AS g),
        hits AS (
          SELECT s.shadow_count
          FROM shadows s, zone z
          WHERE ST_Intersects(s.geom, z.g)
        )
        SELECT COUNT(*), AVG(shadow_count), MIN(shadow_count), MAX(shadow_count) FROM hits;
    """, [geojson])[0]

    return {
        "count": int(n or 0),
        "avg": float(avg) if avg is not None else None,
        "min": float(mn) if mn is not None else None,
        "max": float(mx) if mx is not None else None,
    }

# ---------- Buildings ----------
@app.get("/buildings/features")
def buildings_features(
    bbox: str | None = Query(None, description="minx,miny,maxx,maxy (WGS84)"),
    limit: int = 50000,
    offset: int = 0,
):
    where, params = parse_bbox(bbox)
    rows = q(f"""
        WITH f AS (
          SELECT geom, * EXCLUDE (geom)
          FROM buildings
          {where}
          LIMIT ? OFFSET ?
        )
        SELECT ST_AsGeoJSON(geom) AS gjson, to_json(f) AS props FROM f;
    """, params + [limit, offset])

    features = [{
        "type": "Feature",
        "geometry": json.loads(gjson),
        "properties": json.loads(props) if isinstance(props, str) else (props or {})
    } for gjson, props in rows]
    return fc(features)

@app.get("/buildings/by_ref")
def building_by_reference(ref: str = Query(..., description="Referencia catastral exacta")):
    ref_norm = ref.strip()
    rows = q("""
        WITH f AS (
          SELECT geom, * EXCLUDE (geom)
          FROM buildings
          WHERE UPPER(reference) = UPPER(?)
          LIMIT 1
        )
        SELECT ST_AsGeoJSON(geom) AS gjson, to_json(f) AS props FROM f;
    """, [ref_norm])

    if not rows:
        raise HTTPException(404, "Referencia no encontrada")

    gjson, props = rows[0]
    return {
        "type": "Feature",
        "geometry": json.loads(gjson),
        "properties": json.loads(props) if isinstance(props, str) else (props or {})
    }

# ---------- Address lookup ----------
@app.get("/address/lookup")
def lookup_address(street: str, number: str, include_feature: bool = False):
    import unicodedata

    def norm(s: str) -> str:
        s = "" if s is None else s
        s = unicodedata.normalize("NFD", s)
        s = "".join(ch for ch in s if unicodedata.category(ch) != "Mn")
        s = s.upper().strip()
        for p in ["CALLE ", "CL ", "C/ ", "AVENIDA ", "AV ", "AV.", "PASEO ", "PS ", "PLAZA ", "PZA "]:
            if s.startswith(p):
                s = s[len(p):]
        return " ".join(s.split())

    street_norm = norm(street)
    number_norm = norm(number)

    row = q("""
        SELECT reference
        FROM address_index
        WHERE street_norm = ? AND number_norm = ?
        LIMIT 1;
    """, [street_norm, number_norm])

    if not row:
        raise HTTPException(404, "Dirección no encontrada")

    reference = row[0][0]
    if not include_feature:
        return {"reference": reference}

    feat = q("""
        SELECT ST_AsGeoJSON(geom) as gjson, reference
        FROM buildings
        WHERE reference = ?
        LIMIT 1;
    """, [reference])

    feature = None
    if feat:
        gjson_str, ref_val = feat[0]
        feature = {"type": "Feature", "geometry": json.loads(gjson_str), "properties": {"reference": ref_val}}
    return {"reference": reference, "feature": feature}


# --- helpers para convertir tablas a FeatureCollection y mapa calle->número->ref

def table_to_featurecollection(table_name: str) -> dict | None:
    try:
        rows = q(f"""
            WITH f AS (
              SELECT geom, * EXCLUDE (geom)
              FROM {table_name}
            )
            SELECT ST_AsGeoJSON(geom) AS gjson, to_json(f) AS props
            FROM f;
        """)
    except HTTPException:
        return None

    if not rows:
        return None

    feats = []
    for gjson, props in rows:
        feats.append({
            "type": "Feature",
            "geometry": json.loads(gjson),
            "properties": json.loads(props) if isinstance(props, str) else (props or {}),
        })
    return {"type": "FeatureCollection", "features": feats}

def build_street_number_index() -> dict | None:
    try:
        rows = q("SELECT street_norm, number_norm, reference FROM address_index;")
    except HTTPException:
        return None
    if not rows:
        return None
    out = {}
    for street_norm, number_norm, reference in rows:
        street = str(street_norm or "").upper()
        number = str(number_norm)
        out.setdefault(street, {})[number] = reference
    return out

@app.get("/api/visor_emsv")
def get_visor_emsv():
    limites = table_to_featurecollection("geo_limites_getafe_emsv")
    con_viv = table_to_featurecollection("geo_emsv_parcela_con_vivienda")
    sin_viv = table_to_featurecollection("geo_emsv_parcela_sin_vivienda")
    calle_num_ref = build_street_number_index()
    return {
        "geo_limites_getafe_emsv": limites,
        "geo_emsv_parcela_con_vivienda": con_viv,
        "geo_emsv_parcela_sin_vivienda": sin_viv,
        "json_emsv_calle_num_reference": calle_num_ref,
    }


# ---------- CELS points (centroids) ----------
@app.get("/cels/features")
def cels_features(
    bbox: str | None = Query(None, description="minx,miny,maxx,maxy (WGS84)"),
    limit: int = 20000,
    offset: int = 0,
):
    where, params = parse_bbox(bbox)
    rows = q(f"""
        WITH j AS (
          SELECT 
            ST_PointOnSurface(b.geom) AS pt,  -- point we’ll use for geometry & bbox
            c.id,
            c.nombre,
            c.street_norm,
            c.number_norm,
            c.reference,
            c.auto_CEL
          FROM buildings b
          JOIN autoconsumos_CELS c
            ON LEFT(UPPER(b.reference), 14) = LEFT(UPPER(c.reference), 14)
          {where.replace("geom", "pt")}      -- make the bbox filter use the POINT
          LIMIT ? OFFSET ?
        )
        SELECT 
          ST_AsGeoJSON(pt) AS gjson,
          to_json(struct_pack(
            id := id,
            nombre := nombre,
            street_norm := street_norm,
            number_norm := number_norm,
            reference := reference,
            auto_CEL := auto_CEL
          )) AS props
        FROM j;
    """, params + [limit, offset])

    return {
        "type": "FeatureCollection",
        "features": [
            {
                "type": "Feature",
                "geometry": json.loads(gjson),
                "properties": json.loads(props) if isinstance(props, str) else (props or {}),
            }
            for gjson, props in rows
        ],
    }





# ---------- CELS membership check ----------
class CelsWithinReq(BaseModel):
    geometry: dict  # GeoJSON geometry (Point, Polygon, etc.)

@app.post("/cels/within")
def cels_within_buffer(
    req: CelsWithinReq,
    radius_m: float = Query(500, description="Radio del buffer CELS en metros")
):
    """
    Devuelve todos los CELS cuyos buffers contienen (intersectan) la geometría dada.
    Versión simplificada usando distancia en grados (aproximada).
    """
    geojson_str = json.dumps(req.geometry)
    
    # Convertir metros a grados aproximadamente (1 grado ≈ 111km en latitud)
    # Para Madrid (40°N), 1 grado longitud ≈ 85km
    radius_deg = radius_m / 85000.0  # aproximación para longitud en Madrid
    
    try:
        rows = q("""
            WITH input_geom AS (
              SELECT ST_GeomFromGeoJSON(?::VARCHAR) AS geom
            ),
            cels_points AS (
              SELECT 
                c.id,
                c.nombre,
                c.street_norm,
                c.number_norm,
                c.reference AS cels_ref,
                c.auto_CEL,
                ST_Centroid(b.geom) AS point_geom
              FROM autoconsumos_CELS c
              JOIN buildings b 
                ON LEFT(UPPER(b.reference), 14) = LEFT(UPPER(c.reference), 14)
            ),
            input_point AS (
              SELECT ST_Centroid(geom) AS center FROM input_geom
            )
            SELECT 
              cp.id,
              cp.nombre,
              cp.street_norm,
              cp.number_norm,
              cp.cels_ref,
              cp.auto_CEL,
              ST_Distance(cp.point_geom, ip.center) AS distance_deg
            FROM cels_points cp, input_point ip
            WHERE ST_Distance(cp.point_geom, ip.center) <= ?
            ORDER BY distance_deg;
        """, [geojson_str, radius_deg])
        
        cels = []
        for row in rows:
            # Convertir distancia de grados a metros (aproximado)
            distance_deg = float(row[6]) if row[6] is not None else None
            distance_m = distance_deg * 85000.0 if distance_deg else None
            
            cels.append({
                "id": row[0],
                "nombre": row[1] if row[1] else "(sin nombre)",
                "street_norm": row[2],
                "number_norm": row[3],
                "reference": row[4],
                "auto_CEL": int(row[5]) if row[5] is not None else None,
                "distance_m": distance_m,
            })
        
        return {
            "count": len(cels),
            "cels": cels,
            "radius_m": radius_m
        }
    except Exception as e:
        print(f"Error in /cels/within: {e}")
        raise HTTPException(500, f"Error: {str(e)}")






# Agrega este endpoint temporal para debug en app.py
@app.get("/debug/cels/count")
def debug_cels_count():
    """Endpoint temporal para verificar datos CELS"""
    try:
        # Contar registros en autoconsumos_CELS
        count_cels = q("SELECT COUNT(*) FROM autoconsumos_CELS")[0][0]
        
        # Contar registros en buildings que coinciden
        count_matches = q("""
            SELECT COUNT(*)
            FROM buildings b
            JOIN autoconsumos_CELS c
              ON LEFT(UPPER(b.reference), 14) = LEFT(UPPER(c.reference), 14)
        """)[0][0]
        
        # Muestra ejemplo
        sample = q("""
            SELECT c.id, c.nombre, c.reference, c.auto_CEL
            FROM autoconsumos_CELS c
            LIMIT 5
        """)
        
        return {
            "cels_count": int(count_cels),
            "buildings_with_cels": int(count_matches),
            "sample": [{"id": r[0], "nombre": r[1], "reference": r[2], "auto_CEL": r[3]} for r in sample]
        }
    except Exception as e:
        return {"error": str(e)}
    

@app.get("/cadastre/feature")
def cadastre_by_refcat(
    refcat: str = Query(..., description="Referencia catastral"),
    include_feature: bool = Query(False, description="Incluir geometría GeoJSON")
):
    """Busca un edificio por referencia catastral exacta"""
    ref_norm = refcat.strip()
    
    if not include_feature:
        # Solo devolver si existe
        exists = q("SELECT 1 FROM buildings WHERE UPPER(reference) = UPPER(?) LIMIT 1", [ref_norm])
        if not exists:
            raise HTTPException(404, "Referencia catastral no encontrada")
        return {"reference": ref_norm}
    
    # Con geometría
    rows = q("""
        WITH f AS (
          SELECT geom, * EXCLUDE (geom)
          FROM buildings
          WHERE UPPER(reference) = UPPER(?)
          LIMIT 1
        )
        SELECT ST_AsGeoJSON(geom) AS gjson, to_json(f) AS props FROM f;
    """, [ref_norm])

    if not rows:
        raise HTTPException(404, "Referencia catastral no encontrada")

    gjson, props = rows[0]
    return {
        "reference": ref_norm,
        "feature": {
            "type": "Feature",
            "geometry": json.loads(gjson),
            "properties": json.loads(props) if isinstance(props, str) else (props or {})
        }
    }







class ZonalReq(BaseModel):
    geometry: dict  # GeoJSON Polygon/MultiPolygon/Point/...

@app.post("/irradiance/zonal")
def irradiance_zonal(req: ZonalReq):
    geojson = json.dumps(req.geometry)
    n, avg, mn, mx = q("""
        WITH zone AS (
          SELECT ST_Transform(
                     ST_GeomFromGeoJSON(?::VARCHAR),
                     'EPSG:4326','EPSG:25830', TRUE   -- <-- fuerza lon,lat de entrada
                 ) AS g
        ),
        hits AS (
          SELECT p.value
          FROM irr_points p, zone z
          WHERE ST_Intersects(p.geom, z.g)
        )
        SELECT COUNT(*), AVG(value), MIN(value), MAX(value) FROM hits;
    """, [geojson])[0]

    return {
        "count": int(n or 0),
        "avg": float(avg) if avg is not None else None,
        "min": float(mn) if mn is not None else None,
        "max": float(mx) if mx is not None else None,
    }

def parse_bbox_for_srid(bbox: str | None, target_srid: int) -> tuple[str, list]:
    if not bbox:
        return "", []
    parts = bbox.split(",")
    if len(parts) != 4:
        raise HTTPException(400, "bbox debe ser 'minx,miny,maxx,maxy'")
    minx, miny, maxx, maxy = map(float, parts)
    where = (
        "WHERE ST_Intersects("
        "  geom,"
        "  ST_Transform("
        "    ST_MakeEnvelope(?, ?, ?, ?),"
        "    'EPSG:4326',"
        f"    'EPSG:{target_srid}',"
        "    TRUE"                  # <-- fuerza lon,lat
        "  )"
        ")"
    )
    params = [minx, miny, maxx, maxy]
    return where, params


@app.get("/irradiance/features")
def irradiance_features(
    bbox: str | None = Query(None, description="minx,miny,maxx,maxy (WGS84)"),
):
    where, params = parse_bbox_for_srid(bbox, target_srid=25830)
    rows = q(f"""
        SELECT
          ST_AsGeoJSON(ST_Transform(geom, 'EPSG:25830','EPSG:4326', TRUE)) AS gjson,
          value
        FROM irr_points
        {where};
    """, params)

    features = [{
        "type": "Feature",
        "geometry": json.loads(gjson),
        "properties": {"value": float(val) if val is not None else None}
    } for gjson, val in rows]

    return fc(features)



# ---------- Building metrics ----------
@app.get("/buildings/metrics")
def buildings_metrics(reference: str):
    ref = reference.strip()
    rows = q("""
        SELECT reference,
               irr_average,
               area_m2,
               superficie_util_m2,
               pot_kWp,
               energy_total_kWh,
               factor_capacidad_pct,
               irr_mean_kWhm2_y
        FROM edificios_metrics
        WHERE UPPER(reference) = UPPER(?)
        LIMIT 1;
    """, [ref])

    if not rows:
        raise HTTPException(404, "No metrics for this reference")

    r = rows[0]
    return {
        "reference": r[0],
        "metrics": {
            "irr_average": float(r[1]) if r[1] is not None else None,
            "area_m2": float(r[2]) if r[2] is not None else None,
            "superficie_util_m2": float(r[3]) if r[3] is not None else None,
            "pot_kWp": float(r[4]) if r[4] is not None else None,
            "energy_total_kWh": float(r[5]) if r[5] is not None else None,
            "factor_capacidad_pct": float(r[6]) if r[6] is not None else None,
            "irr_mean_kWhm2_y": float(r[7]) if r[7] is not None else None,
        }
    }





from pydantic import  Field, confloat




from pydantic import BaseModel
from fastapi import HTTPException, Query

# ----------------- Pydantic -----------------
Percent_0_100 = confloat(ge=0, le=100)

class CelsBase(BaseModel):
    nombre: str
    street_norm: str
    number_norm: int
    reference: str
    auto_CEL: int  # 1=CEL, 2=Autoconsumo compartido
    por_ocupacion: Percent_0_100 | None = Field(
        default=None, description="Porcentaje de ocupación 0–100"
    )



class CelsOut(CelsBase):
    id: int

@app.get("/cels")
def list_cels(
    query: str | None = Query(None),
    search: str | None = Query(None),       # alias usado por el frontend
    limit: int = 200,
    offset: int = 0,
):
    term = query or search
    where = ""
    params: list = []
    if term:
        where = (
            "WHERE "
            "UPPER(nombre) LIKE UPPER(?) OR "
            "UPPER(street_norm) LIKE UPPER(?) OR "
            "UPPER(reference) LIKE UPPER(?)"
        )
        like = f"%{term}%"
        params = [like, like, like]

    rows = q(
        f"""
        SELECT id, nombre, street_norm, number_norm, reference, auto_CEL, por_ocupacion
        FROM autoconsumos_CELS
        {where}
        ORDER BY id
        LIMIT ? OFFSET ?
        """,
        params + [limit, offset],
    )

    items = [
        {
            "id": int(r[0]),
            "nombre": r[1],
            "street_norm": r[2],
            "number_norm": int(r[3]) if r[3] is not None else None,
            "reference": r[4],
            "auto_CEL": int(r[5]) if r[5] is not None else None,
            "por_ocupacion": float(r[6]) if r[6] is not None else None,  # 0–100
        }
        for r in rows
    ]
    return {"items": items, "limit": limit, "offset": offset, "count": len(items)}


@app.get("/cels/{cid}")
def get_cels(cid: int):
    rows = q(
        """
        SELECT id, nombre, street_norm, number_norm, reference, auto_CEL, por_ocupacion
        FROM autoconsumos_CELS
        WHERE id = ?
        LIMIT 1
        """,
        [cid],
    )
    if not rows:
        raise HTTPException(404, "CELS no encontrado")
    r = rows[0]
    return {
        "id": int(r[0]),
        "nombre": r[1],
        "street_norm": r[2],
        "number_norm": int(r[3]) if r[3] is not None else None,
        "reference": r[4],
        "auto_CEL": int(r[5]) if r[5] is not None else None,
        "por_ocupacion": float(r[6]) if r[6] is not None else None,  # 0–100
    }





@app.post("/cels")
def create_cels(req: CelsBase):
    if READ_ONLY:
        raise HTTPException(403, "La API está en modo read-only (READ_ONLY)")
    try:
        assert _con is not None
        _con.execute("BEGIN")
        # evitar duplicados por referencia
        dup = q("SELECT 1 FROM autoconsumos_CELS WHERE UPPER(reference) = UPPER(?) LIMIT 1;", [req.reference])
        if dup:
            raise HTTPException(409, "Ya existe un registro con esa referencia.")
        new_id = _con.execute("SELECT COALESCE(MAX(id),0)+1 FROM autoconsumos_CELS").fetchone()[0]
        _con.execute(
            """
            INSERT INTO autoconsumos_CELS (id, nombre, street_norm, number_norm, reference, auto_CEL, por_ocupacion)
            VALUES (?, ?, ?, ?, ?, ?, ?)
            """,
            [
                new_id,
                req.nombre,
                req.street_norm,
                int(req.number_norm),
                req.reference,
                int(req.auto_CEL),
                float(req.por_ocupacion) if req.por_ocupacion is not None else None,
            ],
        )
        _con.execute("COMMIT")
        return {"ok": True, "id": int(new_id)}
    except HTTPException:
        _con.execute("ROLLBACK")
        raise
    except Exception as e:
        _con.execute("ROLLBACK")
        raise HTTPException(500, f"Error creando CELS: {e}")


@app.put("/cels/{cid}")
def update_cels(cid: int, req: CelsBase):
    if READ_ONLY:
        raise HTTPException(403, "La API está en modo read-only (READ_ONLY)")
    try:
        assert _con is not None
        _con.execute("BEGIN")
        # validar existencia
        cur = q("SELECT 1 FROM autoconsumos_CELS WHERE id = ? LIMIT 1;", [cid])
        if not cur:
            raise HTTPException(404, "CELS no encontrado")
        # chequear ref duplicada en otro id
        dup = q(
            "SELECT 1 FROM autoconsumos_CELS WHERE UPPER(reference) = UPPER(?) AND id <> ? LIMIT 1;",
            [req.reference, cid],
        )
        if dup:
            raise HTTPException(409, "Ya existe un registro con esa referencia.")
        _con.execute(
            """
            UPDATE autoconsumos_CELS
            SET nombre = ?, street_norm = ?, number_norm = ?, reference = ?, auto_CEL = ?, por_ocupacion = ?
            WHERE id = ?
            """,
            [
                req.nombre,
                req.street_norm,
                int(req.number_norm),
                req.reference,
                int(req.auto_CEL),
                float(req.por_ocupacion) if req.por_ocupacion is not None else None,
                cid,
            ],
        )
        _con.execute("COMMIT")
        return {"ok": True, "id": int(cid)}
    except HTTPException:
        _con.execute("ROLLBACK")
        raise
    except Exception as e:
        _con.execute("ROLLBACK")
        raise HTTPException(500, f"Error actualizando CELS: {e}")




















