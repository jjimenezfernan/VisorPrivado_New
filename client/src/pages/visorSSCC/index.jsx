/**
 * Visor de Datos Urbanos – Escala Sección Censal
 */
import { useState, useLayoutEffect, useRef } from "react";
import { Box, Typography, useTheme, Link } from "@mui/material";
import { tokens } from "../../theme";
import axios from "axios";
import { motion } from "framer-motion";
import SubUpBar from "../global/SubUpBar";
import Map from "../../components/MapSSCC";
import { useMapSSCCContext } from "../../components/MapSSCCProvider";
import { mapSSCCKeys } from "../../utils/auxUtils";
import { pathToSelect } from "../../constants/MapConstantsSSCC";

const keysPanel1 = [
  "cusec", 
  "barrio", 
  "t18_1", 
  "ano"
];

const keysPanel2 = [
  "n exptes SSCC",
  "porc motivo TRAMITACION_AYUDAS_A_REHABILITACION",
  "porc motivo INFORMACION_GENERAL",
  "porc motivo suministros",
  "porc motivo comunidad energética",
  "porc A través de una persona conocida",
  "porc Comunicaciones del Ayuntamiento",
  "porc SS.SS",
  "porc ERRP y OTC",
  "porc Eventos/Difusión",
];

const keysPanel3 = [
  "t1_1",
  "t4_1",
  "t4_3",
  "t3_1",
  "t31_1di",
  "t31_2dm",
  "t31_3dt",
  "t32_ei",
  "n_alquiler",
  "precio_alquiler",
];

const keysPanel4 = [
  "renta_hogar",
  "porc disconfort inv",
  "porc disconfort ver",
  "porc retraso pago facturas",
  "t30_th",
  "t22_1_porc",
];

const porcSSCC = [
  "porc motivo TRAMITACION_AYUDAS_A_REHABILITACION",
  "porc motivo INFORMACION_GENERAL",
  "porc motivo suministros",
  "porc motivo comunidad energética",
  "porc A través de una persona conocida",
  "porc Comunicaciones del Ayuntamiento",
  "porc SS.SS",
  "porc ERRP y OTC",
  "porc Eventos/Difusión",
  "t4_1",
  "t4_3",
  "t31_1di",
  "t31_2dm",
  "t31_3dt",
  "t32_ei",
  "porc disconfort inv",
  "porc disconfort ver",
  "porc retraso pago facturas",
  "t22_1_porc",
];

const availableSelections = [
  "t18_1", 
  "ano",
  "n exptes SSCC",
  "porc motivo TRAMITACION_AYUDAS_A_REHABILITACION",
  "porc motivo INFORMACION_GENERAL",
  "porc motivo suministros",
  "porc motivo comunidad energética",
  "porc A través de una persona conocida",
  "porc Comunicaciones del Ayuntamiento",
  "porc SS.SS",
  "porc ERRP y OTC",
  "porc Eventos/Difusión",
  "t1_1",
  "t4_1",
  "t4_3",
  "t3_1",
  "t31_1di",
  "t31_2dm",
  "t31_3dt",
  "t32_ei",
  "n_alquiler",
  "precio_alquiler",
  "renta_hogar",
  "porc disconfort inv",
  "porc disconfort ver",
  "porc retraso pago facturas",
  "t30_th",
  "t22_1_porc",
];

import {DIRECTION} from "../../data/direccion_server";

const baseURL = DIRECTION + "/api/visor-sscc";

function Visor() {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [geoSSCC, setGeoSSCC] = useState({});
  const [globales, setGlobales] = useState({});
  const mapRef = useRef();
  const { infoValue, selectionValue, updateSelection } = useMapSSCCContext();

  useLayoutEffect(() => {
    axios.get(baseURL).then((res) => {
      const data1 = res.data.geoSSCC;
      const data2 = res.data.globalesSSCC;
      setGeoSSCC(data1);
      setGlobales(data2);
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
              variant={"body1"}
              color={colors.gray[100]}
              style={{ flex: 3, textAlign: "left" }}
            >
              {mapSSCCKeys.get(key)}:
            </Typography>
          </Link>
          <Typography
            variant={"body1"}
            color={colors.gray[100]}
            fontWeight={700}
            style={{ flex: 1, textAlign: "right" }}
          >
            {"-"}
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
            variant={"body1"}
            color={colors.gray[100]}
            style={{ flex: 3, textAlign: "left" }}
          >
            {mapSSCCKeys.get(key)}:{/* {key}: */}
          </Typography>
        </Link>
        <Typography
          variant={"body1"}
          color={colors.gray[100]}
          fontWeight={700}
          style={{ flex: 1, textAlign: "right" }}
        >
          {value !== null ? value : "-"}
          {porcSSCC.includes(key) && value !== null ? "%" : ""}
          {key === "renta_hogar" && value !== null ? "€" : ""}
          {key === "t30_th" && value !== null
            ? " hab."
            : ""}
        </Typography>
      </div>
    ));
  }

  function globalTextDash() {
    return (
      <div style={{ display: "flex" }}>
        <Typography
          variant={"body1"}
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
    // console.log("key", key);
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
          variant={"body1"}
          color={colors.gray[100]}
          fontWeight={700}
          style={{ flex: 1, textAlign: "center" }}
        >
          {globales[key]}
          {porcSSCC.includes(key) ? "%" : ""}
          {key === "renta_hogar" ? "€" : ""}
          {key === "t30_th" ? " hab." : ""}
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
        title={"Visor de Datos Urbanos – Escala Sección Censal "}
        crumbs={[
          ["Inicio", "/"],
          ["Visor", "/visor-sscc"],
        ]}
        info={{
          title: "",
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
          gridAutoRows={`calc((100vh - 60px - 40px - 20px - 10px) / 14)`}
          gap={"10px"}
        >
          {/* Mapa */}
          <Box
            gridColumn={"span 8"}
            gridRow={"span 12"}
            backgroundColor={colors.gray[900]}
            display={"flex"}
            alignItems={"center"}
            justifyContent={"center"}
            flexDirection={"column"}
            borderRadius={"10px"}
          >
            {Object.keys(geoSSCC).length > 0 ? ( // Check if geojson is not empty
              <Map mapRef={mapRef} geojson={geoSSCC} />
            ) : (
              <Typography variant="h5" color={colors.gray[100]}>
                Cargando...
              </Typography>
            )}
          </Box>
          {/* Panel Datos Castrastales */}
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
              variant={"h7"}
              color={"#fff"}
              fontWeight={600}
              px={"0.3rem"}
              sx={{ background: colors.blueAccent[400], borderRadius: "5px" }}
            >
              Datos Catastrales
            </Typography>
            {infoValue && Object.keys(infoValue).length > 0
              ? infoText(infoPanel1)
              : infoTextDefault(1)}
          </Box>
          {/* Panel Datos Globales Castrastales */}
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
              variant={"h7"}
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
            {globalText("t18_1")}
            {globalText("ano")}
          </Box>
          {/* Panel Datos Socioeconómicos */}
          <Box
            id={"infoPanel2"}
            gridColumn={"span 3"}
            gridRow={"span 4"}
            backgroundColor={colors.gray[900]}
            display={"flex"}
            alignItems={"stretch"}
            justifyContent={"space-evenly"}
            py={"5px"}
            px={"1rem"}
            flexDirection={"column"}
            overflow={"auto"}
            borderRadius={"10px"}
          >
            <Typography
              variant={"h7"}
              color={"#fff"}
              fontWeight={600}
              px={"0.3rem"}
              sx={{ background: colors.blueAccent[400], borderRadius: "5px" }}
            >
              OHS: usuarios y servicios
            </Typography>
            {infoValue && Object.keys(infoValue).length > 0
              ? infoText(infoPanel2)
              : infoTextDefault(2)}
          </Box>
          {/* Panel Datos Globales Socioeconómicos */}
          <Box
            id={"infoPanel2Global"}
            gridColumn={"span 1"}
            gridRow={"span 4"}
            backgroundColor={colors.gray[900]}
            display={"flex"}
            alignItems={"stretch"}
            justifyContent={"space-evenly"}
            py={"5px"}
            px={"1rem"}
            flexDirection={"column"}
            overflow={"auto"}
            borderRadius={"10px"}
          >
            <Typography
              variant={"h7"}
              color={colors.gray[900]}
              fontWeight={600}
              sx={{ textAlign: "center" }}
            >
              -
            </Typography>
            {globalText("n exptes SSCC")}
            {globalText("porc motivo TRAMITACION_AYUDAS_A_REHABILITACION")}
            {globalText("porc motivo INFORMACION_GENERAL")}
            {globalText("porc motivo suministros")}
            {globalText("porc motivo comunidad energética")}
            {globalText("porc A través de una persona conocida")}
            {globalText("porc Comunicaciones del Ayuntamiento")}
            {globalText("porc SS.SS")}
            {globalText("porc ERRP y OTC")}
            {globalText("porc Eventos/Difusión")}
          </Box>
          {/* Panel Datos Socioeconómicos */}
          <Box
            id={"infoPanel3"}
            gridColumn={"span 3"}
            gridRow={"span 3"}
            backgroundColor={colors.gray[900]}
            display={"flex"}
            alignItems={"stretch"}
            justifyContent={"space-evenly"}
            py={"5px"}
            px={"1rem"}
            flexDirection={"column"}
            overflow={"auto"}
            borderRadius={"10px"}
          >
            <Typography
              variant={"h7"}
              color={"#fff"}
              fontWeight={600}
              px={"0.3rem"}
              sx={{ background: colors.blueAccent[400], borderRadius: "5px" }}
            >
              Características socioeconómicas
            </Typography>
            {infoValue && Object.keys(infoValue).length > 0
              ? infoText(infoPanel3)
              : infoTextDefault(3)}
          </Box>
          {/* Panel Datos Globales Socioeconómicos */}
          <Box
            id={"infoPanel3Global"}
            gridColumn={"span 1"}
            gridRow={"span 3"}
            backgroundColor={colors.gray[900]}
            display={"flex"}
            alignItems={"stretch"}
            justifyContent={"space-evenly"}
            py={"5px"}
            px={"1rem"}
            flexDirection={"column"}
            overflow={"auto"}
            borderRadius={"10px"}
          >
            <Typography
              variant={"h7"}
              color={colors.gray[900]}
              fontWeight={600}
              sx={{ textAlign: "center" }}
            >
              -
            </Typography>
            {globalText("t1_1")}
            {globalText("t4_1")}
            {globalText("t4_3")}
            {globalText("t3_1")}
            {globalText("t31_1di")}
            {globalText("t31_2dm")}
            {globalText("t31_3dt")}
            {globalText("t32_ei")}
            {globalText("n_alquiler")}
            {globalText("precio_alquiler")}
          </Box>
          {/* Panel Datos Caracteristcias de los hogares */}
          <Box
            id={"infoPanel4"}
            gridColumn={"span 3"}
            gridRow={"span 3"}
            backgroundColor={colors.gray[900]}
            display={"flex"}
            alignItems={"stretch"}
            justifyContent={"space-evenly"}
            py={"5px"}
            px={"1rem"}
            flexDirection={"column"}
            overflow={"auto"}
            borderRadius={"10px"}
          >
            <Typography
              variant={"h7"}
              color={"#fff"}
              fontWeight={600}
              px={"0.3rem"}
              sx={{ background: colors.blueAccent[400], borderRadius: "5px" }}
            >
              Características de los hogares
            </Typography>
            {infoValue && Object.keys(infoValue).length > 0
              ? infoText(infoPanel4)
              : infoTextDefault(4)}
          </Box>
          {/* Panel Datos Globales Caracteristcias de los hogares */}
          <Box
            id={"infoPanel4Global"}
            gridColumn={"span 1"}
            gridRow={"span 3"}
            backgroundColor={colors.gray[900]}
            display={"flex"}
            alignItems={"stretch"}
            justifyContent={"space-evenly"}
            py={"5px"}
            px={"1rem"}
            flexDirection={"column"}
            overflow={"auto"}
            borderRadius={"10px"}
          >
            <Typography
              variant={"h7"}
              color={colors.gray[900]}
              fontWeight={600}
              sx={{ textAlign: "center" }}
            >
              -
            </Typography>
            {globalText("renta_hogar")}
            {globalText("porc disconfort inv")}
            {globalText("porc disconfort ver")}
            {globalText("porc retraso pago facturas")}
            {globalText("t30_th")}
            {globalText("t22_1_porc")}
          </Box>
        </Box>
      </Box>
    </motion.div>
  );
}

export default Visor;
