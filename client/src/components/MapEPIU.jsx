import { useState, useEffect, useMemo } from "react";
import {
  MapContainer,
  TileLayer,
  GeoJSON,
  ZoomControl,
  useMapEvent,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import MapLegendEPIU from "./MapLegendEPIU";
import { useMapEPIUContext } from "./MapEPIUProvider";
import {
  Selections as Selections,
  pathToSelect,
} from "../constants/MapConstantsEPIU";
import { splitString } from "../utils/auxUtils";

/*
MAPA DE ZONAS EPIU
*/

const COLORS_MAP = {
  teal: {
    1: "#5498a9",
    2: "#42899b",
    3: "#3d7685",
  },
};

const styleLayer = {
  start: {
    fillColor: COLORS_MAP.teal[1],
    stroke: true,
    color: COLORS_MAP.teal[2],
    weight: 0.3,
    opacity: 1,
    fillOpacity: 0.7,
  },
  default: {
    stroke: true,
    weight: 0.7,
    opacity: 1,
    fillOpacity: 0.7,
  },
  highlight: {
    stroke: true,
    weight: 0.7,
    opacity: 1,
    fillOpacity: 0.9,
  },
};

function heatMapGeneric(select, value) {
  select = pathToSelect(select);
  value = parseInt(value);
  //if value is 0 or invalid, return gray color
  if (value === 0 || value === null || isNaN(value)) {
    return "#bababa";
  }

  //if value is greater than the first value, return the first gradient color
  if (value > Selections[select].legend.values[0]) {
    return Selections[select].legend.gradient[0];
  }

  let length = Selections[select].legend.values.length;
  //compare values and get gradient color
  for (let i = 1; i < length; i++) {
    //range 2 is added by 1 to avoid overlapping ranges
    let range1 = Selections[select].legend.values[i - 1];
    let range2 = Selections[select].legend.values[i] + 0.01;
    if (value <= range1 && value >= range2) {
      return Selections[select].legend.gradient[i];
    }
  }
}

function heatMapCertEmision(value) {
  let length =
    Selections["cert_emision_co2"].legend.values.length;
  //compare values and get gradient color
  for (let i = 0; i < length; i++) {
    if (
      value === Selections["cert_emision_co2"].legend.values[i]
    ) {
      return Selections["cert_emision_co2"].legend.gradient[i];
    }
  }
  // if value is not valid, return the gray color
  return "#bababa";
}

function heatMapCertcalificacionDemandaCalefaccion(value) {
  let length = Selections["calificacion_demanda_calefaccion"].legend.values.length;
  //compare values and get gradient color
  for (let i = 0; i < length; i++) {
    if (
      value === Selections["calificacion_demanda_calefaccion"].legend.values[i]
    ) {
      return Selections["calificacion_demanda_calefaccion"].legend.gradient[i];
    }
  }
  // if value is not valid, return the gray color
  return "#bababa";
}

function heatMapSiNo(select, value) {
  select = pathToSelect(select);
  if (value === "Sí" || value === 1) {
    return Selections[select].legend.color;
  }
  // if value is not valid, return the gray color
  return "#bababa";
}

function heatMapDistrito(value) {
  // Siempre sera diferente de ND puesto que todas las viviendas tienen distrito
  if (value != "ND") {
    return Selections["CDDISTRITO"].legend.gradient[Selections["CDDISTRITO"].legend.values.indexOf(value)];
  }
  // if value is not valid, return the gray color
  return "#bababa";
}

function heatMapEspecifConjHomo(value) {
  if (value) {
    return Selections["especif_conj_homo"].legend.gradient[Selections["especif_conj_homo"].legend.values.indexOf(value)];
  }
  // if value is not valid, return the gray color
  return "#bababa";
}

const VIEW_EPIU = [40.3122, -3.73];

function Map2({ mapRef, geojson, geojsonLimites }) {
  const [info, setInfo] = useState({});
  // const epiuRef = useRef();
  const { selectionValue, updateInfo } = useMapEPIUContext();
  const [tooltipValue, setTooltipValue] = useState("");

  useEffect(() => {
    console.log("selectionValue", selectionValue);
  }, [selectionValue]);

  function SetViewOnClick() {
    const map = useMapEvent("click", (e) => {
      map.setView(e.latlng, map.getZoom(), {
        animate: mapRef.current || false,
      });
    });

    return null;
  }

  function onEachFeature(feature, layer) {
    // console.log("feature props", feature.properties);
    // console.log("layer", layer);

    let tooltipLabel = Selections[pathToSelect(selectionValue)].label;
    let tooltipValue = eval(selectionValue);

    if (tooltipValue === null) {
      tooltipValue = "No disponible";
    }

    const tooltipContent = `
      <div style="text-align: center;">
        <h7 style="margin: 0; padding: 0;"><strong>${splitString(
          tooltipLabel,
          25
        ).replace(/\n/g, "<br>")}</strong></h7>
        <p style="margin: 0; padding: 0;">${tooltipValue}</p>
      </div>
    `;

    layer.bindTooltip(tooltipContent, {
      permanent: false,
      sticky: true,
      direction: "right",
      opacity: 0.8,
    });

    layer.setTooltipContent(tooltipContent);

    layer.on({
      click: (e) => {
        setInfo(feature.properties);
        updateInfo(feature.properties);
        console.log(feature.properties);
      },
      mouseover: highlightFeature,
      mouseout: resetHighlight,
    });
  }

  function highlightFeature(e) {
    let feature = e.target.feature;
    setTooltipValue(eval(selectionValue));
    let layer = e.target;
    layer.setStyle(styleLayer.highlight);
  }

  function resetHighlight(e) {
    let layer = e.target;
    layer.setStyle(styleLayer.default);
  }


  function mapStyleOptions(select, value) {
    //in general it's numeric so heatmapGeneric is used
    //if it's a categorical value, use heatmapCertEmision
    switch (select) {
      case Selections["cert_emision_co2"].path:
        return heatMapCertEmision(value);
      case Selections["cert_consumo_e_primaria"].path:
        return heatMapCertEmision(value);
      case Selections["calificacion_demanda_calefaccion"].path:
        return heatMapCertcalificacionDemandaCalefaccion(value);
      case Selections["CDDISTRITO"].path:
        return heatMapDistrito(value);
      case Selections["especif_conj_homo"].path:
        return heatMapEspecifConjHomo(value);
      case Selections["Building_Getafe_Medidas recibidas: Kit de eficiencia energética Cruz Roja"].path:
      case Selections["Building_Getafe_Medidas recibidas: Medidas de rehabilitación en vivienda" ].path:
      case Selections["Building_Getafe_Medidas recibidas: Medidas de rehabilitación en edificio"].path:
      case Selections["ERRP"].path:
        return heatMapSiNo(select, value);
      default:
        return heatMapGeneric(select, value);
    }
  }

  function mapStyle1(feature) {
    return {
      fillColor: mapStyleOptions(selectionValue, eval(selectionValue)),
      fillOpacity: 0.7,
      color: mapStyleOptions(selectionValue, eval(selectionValue)),
      weight: 0.3,
    };
  }

  function mapStyleLimites(feature) {
    return {
      color: "#000",
      weight: "2",
      dashArray: "4, 4",
      opacity: "0.5",
      fillOpacity: 0.0,
    };
  }

  function DynamicGeoJSON({
    geojsonData,
    selectionValue,
    onEachFeature,
    mapStyle,
  }) {
    // Use useMemo to conditionally render the GeoJSON component when selectionValue changes
    const geoJSONComponent = useMemo(() => {
      return (
        <GeoJSON
          data={geojsonData}
          onEachFeature={onEachFeature}
          style={mapStyle}
        />
      );
    }, [geojsonData, onEachFeature, mapStyle, selectionValue]);

    return geoJSONComponent;
  }

  return (
    <MapContainer
      center={VIEW_EPIU}
      zoom={15}
      ref={mapRef}
      style={{ height: "100%", width: "100%" }}
      zoomControl={false}
    >
      <TileLayer
        attribution='<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>'
        url="https://api.maptiler.com/maps/basic-v2-light/256/{z}/{x}/{y}.png?key=BLmB8erci1WE7XYWuf5R"
      />
      <ZoomControl position="bottomright" />
      <DynamicGeoJSON
        geojsonData={geojson.features}
        selectionValue={selectionValue}
        onEachFeature={onEachFeature}
        mapStyle={mapStyle1}
      />
      <GeoJSON data={geojsonLimites.features} style={mapStyleLimites} />
      <MapLegendEPIU position={"bottomleft"} selection={selectionValue} />
    </MapContainer>
  );
}

export default Map2;
