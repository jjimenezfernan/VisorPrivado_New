/**
 * Visor de Datos Urbanos - Escala Barrio
 */
import { useState, useEffect, useRef } from "react";
import { Box, Typography, useTheme, Link } from "@mui/material";
import { tokens } from "../../theme";
import axios from "axios";
import { motion } from "framer-motion";
import SubUpBar from "../global/SubUpBar";
import Map from "../../components/MapBarrio";
import { useMapBarrioContext } from "../../components/MapBarrioProvider";
import { mapBarrioKeys } from "../../utils/auxUtils";
import {
  Selections as Selections,
  pathToSelect,
} from "../../constants/MapConstantsBarrio";
import BarChart from "../../components/BarChartVisorBarrio";

const keysPanel1 = [
  "barrio", 
  "t18_1", 
  "ano",
];

const keysPanel2 = [
  "ac_porc_expedientes",
  "ac_motivo_rehab",
  "ac_motivo_infogeneral",
  "ac_motivo_suminsitros",
  "ac_motivo_comener",
  "ac_origen_ayto",
  "ac_origen_ssss",
  "ac_origen_errp",
  "ac_origen_eventos",
  "ac_origen_conocido",
];

const keysPanel3 = [
  "t1_1",
  "t4_1",
  "t4_3",
  "t3_1",
  "t31_2dm",
  "t31_3dt",
  "n_alquiler",
  "precio_alquiler",
];

const keysPanel4 = [
  "renta_hogar",
  "t22_1_porc",
];

// Keys que son porcentajes
const porcBarrio = [
  "ac_porc_expedientes",
  "ac_motivo_rehab",
  "ac_motivo_infogeneral",
  "ac_motivo_suminsitros",
  "ac_motivo_comener",
  "ac_origen_ayto",
  "ac_origen_ssss",
  "ac_origen_errp",
  "ac_origen_eventos",
  "ac_origen_conocido",
  "t4_1",
  "t4_3",
  "t31_2dm",
  "t31_3dt",
  "t22_1_porc",
];

const availableSelections = [
  "t18_1", 
  "ano",
  "ac_porc_expedientes",
  "ac_motivo_rehab",
  "ac_motivo_infogeneral",
  "ac_motivo_suminsitros",
  "ac_motivo_comener",
  "ac_origen_ayto",
  "ac_origen_ssss",
  "ac_origen_errp",
  "ac_origen_eventos",
  "ac_origen_conocido",
  "t1_1",
  "t4_1",
  "t4_3",
  "t3_1",
  "t31_2dm",
  "t31_3dt",
  "n_alquiler",
  "precio_alquiler",
  "renta_hogar",
  "t22_1_porc",
];

import {DIRECTION} from "../../data/direccion_server";

const baseURL = DIRECTION + "/api/visor-barrio";


function VisorBarrio() {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [geoBarrio, setGeoBarrio] = useState({});
  const [globales, setGlobales] = useState({});
  const [barrioChart, setBarrioChart] = useState([]);
  const mapRef = useRef();
  const { infoValue, selectionValue, updateSelection } = useMapBarrioContext();

  useEffect(() => {
    axios.get(baseURL).then((res) => {
      const data1 = res.data.geoBarrio;
      const data2 = res.data.globalesBarrio;
      setGeoBarrio(data1);
      setGlobales(data2);
      console.log("Created by Khora Urban Thinkers");
      console.log("Contact with us in https://khoraurbanthinkers.es/en/home-en/")
      console.log("Our X account https://x.com/khoraurban")
      console.log("Our Linkedin account https://www.linkedin.com/company/khora-urban-thinkers/posts/?feedView=all")
    });
  }, []);

  useEffect(() => {
    // Check if geoBarrio has been defined and is not empty
    if (geoBarrio && geoBarrio.features) {
      // Delay the execution of handleBarrioChart by 1 second
      handleBarrioChart(pathToSelect(selectionValue));
    }
  }, [geoBarrio, selectionValue]);

  const chartHeatColor = (select, value) => {
    value = parseFloat(value);
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
      //range 2 is added by 0.01 to avoid overlapping ranges
      let range1 = Selections[select].legend.values[i - 1];
      let range2 = Selections[select].legend.values[i] + 0.01;
      if (value <= range1 && value >= range2) {
        return Selections[select].legend.gradient[i];
      }
    }
  };

  const handleBarrioChart = (select) => {
    let barChart = [];
    for (let i = 0; i < geoBarrio["features"].length; i++) {
      let obj = {};
      obj["id"] = geoBarrio["features"][i]["properties"]["barrio"];
      obj["valor"] = geoBarrio["features"][i]["properties"][select];
      barChart.push(obj);
    }
    //coloring the bars depending on the value
    for (let i = 0; i < barChart.length; i++) {
      barChart[i]["valorColor"] = chartHeatColor(select, barChart[i]["valor"]);
    }
    setBarrioChart(barChart);
  };

  const handleSelectionClick = (indicator) => {
    // Check if the indicator is valid
    if (availableSelections.includes(indicator)) {
      // Update the selectionValue immediately
      updateSelection(`feature.properties["${indicator}"]`);
      handleBarrioChart(indicator);
    }
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
              {mapBarrioKeys.get(key)}:
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
            {mapBarrioKeys.get(key)}:{/* {key}: */}
          </Typography>
        </Link>
        <Typography
          variant={"body1"}
          color={colors.gray[100]}
          fontWeight={700}
          style={{ flex: 1, textAlign: "right" }}
        >
          {value !== null ? value : "-"}
          {porcBarrio.includes(key) && value !== null ? "%" : ""}
          {key === "renta_hogar" && value !== null ? "€" : ""}
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
          {porcBarrio.includes(key) ? "%" : ""}
          {key === "renta_hogar" ? "€" : ""}
          {key === "precio_alquiler" ? "€" : ""}
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
        title={"Visor de Datos Urbanos - Escala Barrio"}
        crumbs={[
          ["Inicio", "/"],
          ["Visor Barrio", "/visor-barrio"],
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
          gridAutoRows={`calc((100vh - 60px - 40px - 20px - 10px) / 23)`}
          gap={"7px"}
        >
          {/* Mapa */}
          <Box
            gridColumn={"span 8"}
            gridRow={"span 19"}
            backgroundColor={colors.gray[900]}
            display={"flex"}
            alignItems={"center"}
            justifyContent={"center"}
            flexDirection={"column"}
            borderRadius={"10px"}
          >
            {Object.keys(geoBarrio).length > 0 ? ( // Check if geojson is not empty
              <Map mapRef={mapRef} geojson={geoBarrio} />
            ) : (
              <Typography variant="h5" color={colors.gray[100]}>
                Cargando...
              </Typography>
            )}
          </Box>
          {/* Panel Datos Catastrales */}
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
              variant={"body1"}
              color={"#fff"}
              fontWeight={700}
              px={"0.3rem"}
              sx={{ background: colors.blueAccent[400], borderRadius: "5px" }}
            >
              Datos Catastrales
            </Typography>
            {infoValue && Object.keys(infoValue).length > 0
              ? infoText(infoPanel1)
              : infoTextDefault(1)}
          </Box>
          {/* Panel Datos Globales Castastrales*/}
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
              variant={"body1"}
              color={"#fff"}
              fontWeight={700}
              sx={{
                textAlign: "center",
                background: colors.blueAccent[400],
                borderRadius: "5px",
              }}
            >
              Globales
            </Typography>
            {globalTextDash()}
            {globalText("t18_1")}
            {globalText("ano")}
          </Box>
          {/* Panel Datos Socioeconómicos */}
          <Box
            id={"infoPanel2"}
            gridColumn={"span 3"}
            gridRow={"span 5"}
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
              variant={"body1"}
              color={"#fff"}
              fontWeight={700}
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
            gridRow={"span 5"}
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
              variant={"body1"}
              color={colors.gray[900]}
              fontWeight={700}
              sx={{ textAlign: "center" }}
            >
              -
            </Typography>
            {globalText("ac_porc_expedientes")}
            {globalText("ac_motivo_rehab")}
            {globalText("ac_motivo_infogeneral")}
            {globalText("ac_motivo_suminsitros")}
            {globalText("ac_motivo_comener")}
            {globalText("ac_origen_ayto")}
            {globalText("ac_origen_ssss")}
            {globalText("ac_origen_errp")}
            {globalText("ac_origen_eventos")}
            {globalText("ac_origen_conocido")}
          </Box>
          {/* Panel Características Socioeconómicas */}
          <Box
            id={"infoPanel3"}
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
            sx={{ 
              scrollbarWidth: 'none', // Firefox
              '&::-webkit-scrollbar': {
                display: 'none', // Chrome, Safari y Edge
              },
            }}
          >
            <Typography
              variant={"body1"}
              color={"#fff"}
              fontWeight={700}
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
            sx={{ 
              scrollbarWidth: 'none', // Firefox
              '&::-webkit-scrollbar': {
                display: 'none', // Chrome, Safari y Edge
              },
            }}
          >
            <Typography
              variant={"body1"}
              color={colors.gray[900]}
              fontWeight={700}
              sx={{ textAlign: "center" }}
            >
              -
            </Typography>
            {globalText("t1_1")}
            {globalText("t4_1")}
            {globalText("t4_3")}
            {globalText("t3_1")}
            {globalText("t31_2dm")}
            {globalText("t31_3dt")}
            {globalText("n_alquiler")}
            {globalText("precio_alquiler")}
          </Box>
          {/* Panel Características de los hogares */}
          <Box
            id={"infoPanel4"}
            gridColumn={"span 3"}
            gridRow={"span 2"}
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
              variant={"body1"}
              color={"#fff"}
              fontWeight={700}
              px={"0.3rem"}
              sx={{ background: colors.blueAccent[400], borderRadius: "5px" }}
            >
              Características de los hogares
            </Typography>
            {infoValue && Object.keys(infoValue).length > 0
              ? infoText(infoPanel4)
              : infoTextDefault(4)}
          </Box>
          {/* Panel Datos Globales de los hogares */}
          <Box
            id={"infoPanel4Global"}
            gridColumn={"span 1"}
            gridRow={"span 2"}
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
              variant={"body1"}
              color={colors.gray[900]}
              fontWeight={700}
              sx={{ textAlign: "center" }}
            >
              -
            </Typography>
            {globalText("renta_hogar")}
            {globalText("t22_1_porc")}
          </Box>
          {/* Panel Gráfico */}
          <Box
            gridColumn={"span 4"}
            gridRow={"span 6"}
            backgroundColor={colors.gray[900]}
            display={"flex"}
            alignItems={"center"}
            justifyContent={"center"}
            padding={"7px 5px 7px 5px"}
            flexDirection={"column"}
            borderRadius={"10px"}
          >
            {barrioChart.length === 0 ? (
              <Typography variant="body1" color={colors.gray[100]}>
                Cargando...
              </Typography>
            ) : (
              <BarChart
                data={barrioChart}
                isAnoConstru={
                  pathToSelect(selectionValue) === "ano"
                    ? true
                    : false
                }
                isEuro={
                  pathToSelect(selectionValue) === "renta_hogar"
                    ? true
                    : false
                }
                isPorcent={porcBarrio.includes(pathToSelect(selectionValue))}
              />
            )}
          </Box>
        </Box>
      </Box>
    </motion.div>
  );
}

export default VisorBarrio;
