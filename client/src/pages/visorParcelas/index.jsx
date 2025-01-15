/**
 * Visor de Datos Urbanos – Escala Parcelas
 */
import { useState, useRef, useLayoutEffect } from "react";
import { Box, Typography, useTheme, Link } from "@mui/material";
import { tokens } from "../../theme";
import axios from "axios";
import { motion } from "framer-motion";
import SubUpBar from "../global/SubUpBar";
import Map from "../../components/MapParcelas";
import { useMapParcelasContext } from "../../components/MapParcelasProvider";
import { mapParcelasKeys, readableValueParcelas } from "../../utils/auxUtils";
import {
  Selections as Selections,
  pathToSelect,
} from "../../constants/MapConstantsParcelas";

const keysPanel1 = [
  "ref_catastral",
  "uso_principal",
  "numero_viviendas",
  "ano_constru",
  "CDDISTRITO",
  "barrio",
  "especif_conj_homo",
  "ERRP",
  "n_exptes",
  "Building_Getafe_porc viv OHS",
];

const keysPanel2 = [
  "Building_Getafe_Medidas recibidas: Kit de eficiencia energética Cruz Roja",
  "Building_Getafe_Medidas recibidas: Medidas de rehabilitación en vivienda",
  "Building_Getafe_Medidas recibidas: Medidas de rehabilitación en edificio",
];

const keysPanel3 = [
  "Building_Getafe_porc retraso pago facturas",
  "Building_Getafe_porc alquiler",
  "Building_Getafe_porc prop sin hipoteca",
  "Building_Getafe_porc prop con hipoteca",
  "Building_Getafe_disconfort inv",
  "Building_Getafe_disconfort ver",
];

const keysPanel4 = [
  "Building_Getafe_porc patologias exptes",
  "Building_Getafe_porc no calefaccion",
  "cert_emision_co2",
  "cert_consumo_e_primaria",
  "prod_fotovol",
  "irradiacion_anual_kwh/m2",
  "demanda_calefaccion",
  "calificacion_demanda_calefaccion"
];

const porcParcelas = [
  "Building_Getafe_porc viv OHS",
  "Building_Getafe_porc retraso pago facturas",
  "Building_Getafe_porc alquiler",
  "Building_Getafe_porc prop sin hipoteca",
  "Building_Getafe_porc prop con hipoteca",
  "Building_Getafe_porc patologias exptes",
  "Building_Getafe_porc no calefaccion",
  "Building_Getafe_disconfort inv",
  "Building_Getafe_disconfort ver",
];

const availableSelections = [
  "numero_viviendas",
  "ano_constru",
  "n_exptes",
  "Building_Getafe_porc viv OHS",
  "Building_Getafe_porc retraso pago facturas",
  "Building_Getafe_porc alquiler",
  "Building_Getafe_porc prop sin hipoteca",
  "Building_Getafe_porc prop con hipoteca",
  "Building_Getafe_disconfort inv",
  "Building_Getafe_disconfort ver",
  "Building_Getafe_porc patologias exptes",
  "Building_Getafe_porc no calefaccion",
  "prod_fotovol",
  "irradiacion_anual_kwh/m2",
  "demanda_calefaccion",
  "Building_Getafe_Medidas recibidas: Kit de eficiencia energética Cruz Roja",
  "Building_Getafe_Medidas recibidas: Medidas de rehabilitación en vivienda",
  "Building_Getafe_Medidas recibidas: Medidas de rehabilitación en edificio",
  "cert_emision_co2",
  "cert_consumo_e_primaria",
  "CDDISTRITO",
  "calificacion_demanda_calefaccion",
  "ERRP",
  "especif_conj_homo",
];

import {DIRECTION} from "../../data/direccion_server";

const baseURL = DIRECTION + "/api/visor-parcelas";

function VisorParcelas() {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [geoParcelas, setParcelas] = useState({});
  const [geoParcelasLimites, setParcelasLimites] = useState({});
  const [globales, setGlobales] = useState({});
  const mapRef = useRef();
  const { infoValue, selectionValue, updateSelection } = useMapParcelasContext();

  useLayoutEffect(() => {
    axios.get(baseURL).then((res) => {
      const data1 = res.data.geoParcelas;
      const data2 = res.data.globalesParcelas;
      const data3 = res.data.geoParcelasLimites;
      setParcelas(data1);
      setGlobales(data2);
      setParcelasLimites(data3);
      console.log("Created by Khora Urban Thinkers");
      console.log("Contact with us in https://khoraurbanthinkers.es/en/home-en/")
      console.log("Our X account https://x.com/khoraurban")
      console.log("Our Linkedin account https://www.linkedin.com/company/khora-urban-thinkers/posts/?feedView=all")
    });
  }, []);

  const handleSelectionClick = (indicator) => {
    if (availableSelections.includes(indicator)) {
      updateSelection(`feature.properties["${indicator}"]`);
    }
    return;
  };

  const infoPanel1 = Object.fromEntries(
    Object.entries(infoValue).filter(([key]) => keysPanel1.includes(key))
  );

  const infoPanel2 = Object.fromEntries(
    Object.entries(infoValue).filter(([key]) => keysPanel2.includes(key))
  );

  const infoPanel3 = Object.fromEntries(
    Object.entries(infoValue).filter(([key]) => keysPanel3.includes(key))
  );

  const infoPanel4 = Object.fromEntries(
    Object.entries(infoValue).filter(([key]) => keysPanel4.includes(key))
  );

  function infoTextDefault(nPanel) {
    let data = [];
    switch (nPanel) {
      case 1:
        data = keysPanel1;
        break;
      case 2:
        data = keysPanel2;
        break;
      case 3:
        data = keysPanel3;
        break;
      case 4:
        data = keysPanel4;
        break;
      default:
        data = [];
    }
    return data.map((key) => {
      return (
        <div
          key={key}
          style={{
            display: "flex",
            justifyContent: "space-between",
            padding: "0 0.3rem 0 0.3rem",
            borderRadius: "5px",
            background:
              pathToSelect(selectionValue) === key ? colors.gray[800] : "",
          }}
        >
          <Link
            onClick={() => handleSelectionClick(key)}
            underline={availableSelections.includes(key) ? "hover" : "none"}
            sx={{
              cursor: availableSelections.includes(key) ? "pointer" : "text",
              ":hover": { color: colors.gray[600] },
            }}
          >
            <Typography
              variant={"h7"}
              color={colors.gray[100]}
              style={{ flex: 1, textAlign: "left" }}
            >
              {mapParcelasKeys.get(key)}:
            </Typography>
          </Link>
          <Typography
            variant={"h7"}
            color={colors.gray[100]}
            fontWeight={700}
            style={{ flex: 1, textAlign: "right" }}
          >
            -
          </Typography>
        </div>
      );
    });
  }

  function infoText(data) {
    return Object.entries(data).map(([key, value]) => (
      <div
        key={key}
        style={{
          display: "flex",
          justifyContent: "space-between",
          padding: "0 0.3rem 0 0.3rem",
          borderRadius: "5px",
          background:
            pathToSelect(selectionValue) === key ? colors.gray[800] : "",
        }}
      >
        <Link
          onClick={() => handleSelectionClick(key)}
          underline={availableSelections.includes(key) ? "hover" : "none"}
          sx={{
            cursor: availableSelections.includes(key) ? "pointer" : "text",
            ":hover": { color: colors.gray[600] },
          }}
        >
          <Typography
            variant={"h7"}
            color={colors.gray[100]}
            style={{ flex: 3, textAlign: "left" }}
          >
            {mapParcelasKeys.get(key)}:
          </Typography>
        </Link>
        <Typography
          variant={"h7"}
          color={colors.gray[100]}
          fontWeight={700}
          style={{ flex: 2, textAlign: "right" }}
        >
          {value !== null ? readableValueParcelas(key, value) : "-"}
          {porcParcelas.includes(key) && value !== null ? "%" : ""}
        </Typography>
      </div>
    ));
  }

  function globalTextDash() {
    return (
      <div style={{ display: "flex" }}>
        <Typography
          variant={"h7"}
          color={colors.gray[100]}
          fontWeight={700}
          style={{ flex: 1, textAlign: "center" }}
        >
          -
        </Typography>
      </div>
    );
  }

  function globalText(key) {
    return (
      <div
        style={{
          display: "flex",
          background:
            pathToSelect(selectionValue) === key ? colors.gray[800] : "",
          borderRadius: "5px",
        }}
      >
        <Typography
          variant={"h7"}
          color={colors.gray[100]}
          fontWeight={700}
          style={{ flex: 1, textAlign: "center" }}
        >
          {globales[key]}
          {porcParcelas.includes(key) ? "%" : ""}
        </Typography>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <SubUpBar
        title={"Visor de Datos Urbanos – Escala Parcelas "}
        crumbs={[
          ["Inicio", "/"],
          ["Visor Parcelas", "/visor-parcelas"],
        ]}
        info={{
          title: "Visor de Datos Urbanos – Escala Parcelas ",
          description: (
            <Typography
              variant="h6"
              align="justify"
              sx={{ color: colors.gray[400] }}
            >
              <p>
              </p>
            </Typography>
          ),
        }}
      />
      <Box m="10px">
        <Box
          display={"grid"}
          gridTemplateColumns={"repeat(12,1fr)"}
          //60 topbar + 40 SubUpBar + 20 gaps + 10 extra
          gridAutoRows={`calc((100vh - 60px - 40px - 20px - 10px) / 8.8)`}
          gap={"10px"}
        >
          {/* Mapa */}
          <Box
            gridColumn={"span 8"}
            gridRow={"span 8"}
            backgroundColor={colors.gray[900]}
            display={"flex"}
            alignItems={"center"}
            justifyContent={"space-evenly"}
            flexDirection={"column"}
            borderRadius={"10px"}
          >
            {Object.keys(geoParcelas).length > 0 ? ( // Check if geojson is not empty
              <Map
                mapRef={mapRef}
                geojson={geoParcelas}
                geojsonLimites={geoParcelasLimites}
              />
            ) : (
              <Typography variant="h5" color={colors.gray[100]}>
                Cargando...
              </Typography>
            )}
          </Box>
          {/* Panel Datos Castastrales */}
          <Box
            gridColumn={"span 3"}
            gridRow={"span 3"}
            backgroundColor={colors.gray[900]}
            display={"flex"}
            alignItems={"stretch"}
            justifyContent={"space-evenly"}
            py={"5px"}
            px={"1rem"}
            flexDirection={"column"}
            borderRadius={"10px"}
          >
            <Typography
              variant={"h6"}
              color={"#fff"}
              fontWeight={600}
              px={"0.3rem"}
              sx={{ background: colors.blueAccent[400], borderRadius: "5px" }}
            >
              Datos catastrales
            </Typography>
            {infoValue && Object.keys(infoValue).length > 0
              ? infoText(infoPanel1)
              : infoTextDefault(1)}
          </Box>
          {/* Panel Datos Globales Castratales */}
          <Box
            gridColumn={"span 1"}
            gridRow={"span 3"}
            backgroundColor={colors.gray[900]}
            display={"flex"}
            alignItems={"stretch"}
            justifyContent={"space-evenly"}
            py={"5px"}
            px={"1rem"}
            flexDirection={"column"}
            borderRadius={"10px"}
          >
            <Typography
              variant={"h6"}
              color={"#fff"}
              fontWeight={600}
              sx={{
                textAlign: "center",
                background: colors.blueAccent[400],
                borderRadius: "5px",
              }}
            >
              Globales
            </Typography>
            {globalTextDash()}
            {globalTextDash()}
            {globalText("numero_viviendas")}
            {globalText("ano_constru")}
            {globalTextDash()}
            {globalTextDash()}
            {globalTextDash()}
            {globalTextDash()}
            {globalText("n_exptes")}
            {globalText("Building_Getafe_porc viv OHS")}
          </Box>
          {/* Panel Datos OHS */}
          <Box
            gridColumn={"span 3"}
            gridRow={"span 1"}
            backgroundColor={colors.gray[900]}
            display={"flex"}
            alignItems={"stretch"}
            justifyContent={"space-evenly"}
            py={"5px"}
            px={"1rem"}
            flexDirection={"column"}
            borderRadius={"10px"}
          >
            <Typography
              variant={"h6"}
              color={"#fff"}
              fontWeight={600}
              px={"0.3rem"}
              sx={{ background: colors.blueAccent[400], borderRadius: "5px" }}
            >
              Datos OHS
            </Typography>
            {infoValue && Object.keys(infoValue).length > 0
              ? infoText(infoPanel2)
              : infoTextDefault(2)}
          </Box>
          {/* Panel Datos Globales OHS */}
          <Box
            gridColumn={"span 1"}
            gridRow={"span 1"}
            backgroundColor={colors.gray[900]}
            display={"flex"}
            alignItems={"stretch"}
            justifyContent={"space-evenly"}
            py={"5px"}
            px={"1rem"}
            flexDirection={"column"}
            borderRadius={"10px"}
          >
            <Typography
              variant={"h6"}
              color={colors.gray[900]}
              fontWeight={600}
              sx={{ textAlign: "center" }}
            >
              -
            </Typography>
            {globalTextDash()}
            {globalTextDash()}
            {globalTextDash()}
          </Box>
          {/* Panel Datos Población */}
          <Box
            gridColumn={"span 3"}
            gridRow={"span 2"}
            backgroundColor={colors.gray[900]}
            display={"flex"}
            alignItems={"stretch"}
            justifyContent={"space-evenly"}
            py={"5px"}
            px={"1rem"}
            flexDirection={"column"}
            borderRadius={"10px"}
          >
            <Typography
              variant={"h6"}
              color={"#fff"}
              fontWeight={600}
              px={"0.3rem"}
              sx={{ background: colors.blueAccent[400], borderRadius: "5px" }}
            >
              Características de población
            </Typography>
            {infoValue && Object.keys(infoValue).length > 0
              ? infoText(infoPanel3)
              : infoTextDefault(3)}
          </Box>
          {/* Panel Datos Globales Población */}
          <Box
            gridColumn={"span 1"}
            gridRow={"span 2"}
            backgroundColor={colors.gray[900]}
            display={"flex"}
            alignItems={"stretch"}
            justifyContent={"space-evenly"}
            py={"5px"}
            px={"1rem"}
            flexDirection={"column"}
            borderRadius={"10px"}
          >
            <Typography
              variant={"h6"}
              color={colors.gray[900]}
              fontWeight={600}
              sx={{ textAlign: "center" }}
            >
              -
            </Typography>
            {globalText("Building_Getafe_porc retraso pago facturas")}
            {globalText("Building_Getafe_porc alquiler")}
            {globalText("Building_Getafe_porc prop sin hipoteca")}
            {globalText("Building_Getafe_porc prop con hipoteca")}
            {globalText("Building_Getafe_disconfort inv")}
            {globalText("Building_Getafe_disconfort ver")}
          </Box>
          {/* Panel Datos Características de la Vivienda */}
          <Box
            gridColumn={"span 3"}
            gridRow={"span 2"}
            backgroundColor={colors.gray[900]}
            display={"flex"}
            alignItems={"stretch"}
            justifyContent={"space-evenly"}
            py={"5px"}
            px={"1rem"}
            flexDirection={"column"}
            borderRadius={"10px"}
          >
            <Typography
              variant={"h6"}
              color={"#fff"}
              fontWeight={600}
              px={"0.3rem"}
              sx={{ background: colors.blueAccent[400], borderRadius: "5px" }}
            >
              Características de la vivienda
            </Typography>
            {infoValue && Object.keys(infoValue).length > 0
              ? infoText(infoPanel4)
              : infoTextDefault(4)}
          </Box>
          {/* Panel Datos Globales Características de la Vivienda */}
          <Box
            gridColumn={"span 1"}
            gridRow={"span 2"}
            backgroundColor={colors.gray[900]}
            display={"flex"}
            alignItems={"stretch"}
            justifyContent={"space-evenly"}
            py={"5px"}
            px={"1rem"}
            flexDirection={"column"}
            borderRadius={"10px"}
          >
            <Typography
              variant={"h6"}
              color={colors.gray[900]}
              fontWeight={600}
              sx={{ textAlign: "center" }}
            >
              -
            </Typography>
            {globalText("Building_Getafe_porc patologias exptes")}
            {globalText("Building_Getafe_porc no calefaccion")}
            {globalText("cert_emision_co2")}
            {globalText("cert_consumo_e_primaria")}
            {globalText("prod_fotovol")}
            {globalText("irradiacion_anual_kwh/m2")}
            {globalText("demanda_calefaccion")}
            {globalText("calificacion_demanda_calefaccion")}
          </Box>
        </Box>
      </Box>
    </motion.div>
  );
}

export default VisorParcelas;
