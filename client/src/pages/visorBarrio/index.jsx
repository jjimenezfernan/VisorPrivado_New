import React, { useState, useLayoutEffect, useEffect, useRef } from "react";
import { Box, Typography, useTheme, Link } from "@mui/material";
import { tokens } from "../../theme";
import axios from "axios";
import { motion } from "framer-motion";
import SubBar from "../global/SubBar";
import Map from "../../components/MapBarrio";
import { useMapBarrioContext } from "../../components/MapBarrioProvider";
import { mapBarrioKeys } from "../../utils/auxUtils";
import {
  Selections as Selections,
  pathToSelect,
} from "../../constants/MapConstantsBarrio";
import BarChart from "../../components/BarChartVisorBarrio";

const keysPanel1 = ["BARRIO", "n viviendas", "ano constru barrio"];

const keysPanel2 = [
  "porc exptes",
  "porc motivo TRAMITACION_AYUDAS_A_REHABILITACION",
  // "porc motivo INFORMACION_GENERAL",
  "porc motivo TRAMITACION_BONO_SOCIAL",
  "porc motivo OPTIMIZACION_FACTURA barrio",
  // "porc A través de una persona conocida",
  "porc Comunicaciones del Ayuntamiento",
  "porc Otros departamentos (SAV y otros)",
  "porc SS.SS",
  // "porc Asociaciones y ONG's",
  "Intervalo de confianza (%)",
];

const keysPanel3 = [
  "pob total (INE 22)",
  "porc pob menor de 14 años (INE 22)",
  "porc pob de 65 y más años (INE 22)",
  "edad media pob (INE 20)",
  // "Educación primaria e inferior",
  // "Primera etapa de Educación Secundaria y similar",
  // "Segunda etapa de Educación Secundaria y Educación Postsecundaria no Superior",
  // "Educación Superior",
  // "Índice de dependencia infantil (%)",
  "Índice de dependencia de mayores (%)",
  "Índice de dependencia total (%)",
];

const keysPanel4 = [
  "renta media hogar",
  // "tamaño medio hogar (INE 20)",
  "porc hogares unipersonales (INE 20)",
];

const porcBarrio = [
  "porc exptes",
  "tamaño medio hogar (INE 20)",
  "porc pob menor de 14 años (INE 22)",
  "porc pob de 65 y más años (INE 22)",
  "porc hogares unipersonales (INE 20)",
  "Educación primaria e inferior",
  "Primera etapa de Educación Secundaria y similar",
  "Segunda etapa de Educación Secundaria y Educación Postsecundaria no Superior",
  "Educación Superior",
  "porc motivo TRAMITACION_AYUDAS_A_REHABILITACION",
  "porc motivo INFORMACION_GENERAL",
  "porc motivo TRAMITACION_BONO_SOCIAL",
  "porc motivo OPTIMIZACION_FACTURA barrio",
  "porc A través de una persona conocida",
  "porc Comunicaciones del Ayuntamiento",
  "porc Otros departamentos (SAV y otros)",
  "porc SS.SS",
  "porc Asociaciones y ONG's",
  "Índice de dependencia infantil (%)",
  "Índice de dependencia de mayores (%)",
  "Índice de dependencia total (%)",
  "Intervalo de confianza (%)",
];

const availableSelections = [
  "n viviendas",
  "ano constru barrio",
  "porc exptes",
  "porc motivo TRAMITACION_AYUDAS_A_REHABILITACION",
  "porc motivo INFORMACION_GENERAL",
  "porc motivo TRAMITACION_BONO_SOCIAL",
  "porc motivo OPTIMIZACION_FACTURA barrio",
  "porc A través de una persona conocida",
  "porc Comunicaciones del Ayuntamiento",
  "porc Otros departamentos (SAV y otros)",
  "porc SS.SS",
  "porc Asociaciones y ONG's",
  "Intervalo de confianza (%)",
  "pob total (INE 22)",
  "porc pob menor de 14 años (INE 22)",
  "porc pob de 65 y más años (INE 22)",
  "edad media pob (INE 20)",
  "Educación primaria e inferior",
  "Primera etapa de Educación Secundaria y similar",
  "Segunda etapa de Educación Secundaria y Educación Postsecundaria no Superior",
  "Educación Superior",
  "Índice de dependencia infantil (%)",
  "Índice de dependencia de mayores (%)",
  "Índice de dependencia total (%)",
  "renta media hogar",
  "tamaño medio hogar (INE 20)",
  "porc hogares unipersonales (INE 20)",
];

import {DIRECTION} from "../../data/direccion_server";

const baseURL = DIRECTION + "/api/visor-barrio";

//  "https://observatoriodedatosepiu.khoraurbanthinkers.es/api/visor-barrio";
// const storageKey = "visorData"; // Key for storing/retrieving data from localStorage
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

  // useEffect(() => {
  // console.log("infoValue", infoValue);
  // }, [infoValue]);

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
      obj["id"] = geoBarrio["features"][i]["properties"]["BARRIO"];
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
          {key === "renta media hogar" && value !== null ? "€" : ""}
          {key === "tamaño medio hogar (INE 20)" && value !== null
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
          {porcBarrio.includes(key) ? "%" : ""}
          {key === "renta media hogar" ? "€" : ""}
          {key === "tamaño medio hogar (INE 20)" ? " hab." : ""}
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
      <SubBar
        title={"Visor de Datos Urbanos - Escala Barrio"}
        crumbs={[
          ["Inicio", "/"],
          ["Visor Barrio", "/visor-barrio"],
        ]}
        info={{
          title: "Visor de Datos Urbanos - Escala Barrio",
          description: (
            <Typography
              variant="h6"
              align="justify"
              sx={{ color: colors.gray[400] }}
            >
              <p>
                <strong>El visor de datos urbanos del proyecto EPIU</strong>{" "}
                nace con el objetivo de contextualizar espacialmente los datos
                sobre vulnerabilidad energ&eacute;tica del municipio de Getafe.
              </p>
              <p>
                Los resultados de los indicadores se han obtenido con los datos
                propios generados a trav&eacute;s del proyecto EPIU &ndash;
                Oficina de Hogares Saludables-, y mediante las fuentes oficiales
                m&aacute;s actualizadas -Catastro e INE 2020 y 2022-.&nbsp;
              </p>
              <p>
                La escala barrio tiene la funci&oacute;n de aportar un{" "}
                <strong>enfoque estrat&eacute;gico</strong>, para beneficiar la
                toma de decisiones en las pol&iacute;ticas sociales del
                municipio en general, y en materia de vulnerabilidad
                energ&eacute;tica a escala barrio.&nbsp;
              </p>
              <p>
                Actualmente cuenta con un{" "}
                <strong>Intervalo de Confianza</strong> de 5,9 % con 921
                expedientes registrados.&nbsp;
              </p>
            </Typography>
          ),
        }}
      />
      <Box m="10px">
        <Box
          display={"grid"}
          gridTemplateColumns={"repeat(12,1fr)"}
          //60 topbar + 40 subbar + 20 gaps + 10 extra
          gridAutoRows={`calc((100vh - 60px - 40px - 20px - 10px) / 23)`}
          gap={"7px"}
        >
          <Box
            gridColumn={"span 8"}
            gridRow={"span 19"}
            backgroundColor={colors.gray[900]}
            display={"flex"}
            alignItems={"center"}
            justifyContent={"center"}
            flexDirection={"column"}
          >
            {Object.keys(geoBarrio).length > 0 ? ( // Check if geojson is not empty
              <Map mapRef={mapRef} geojson={geoBarrio} />
            ) : (
              <Typography variant="h5" color={colors.gray[100]}>
                Cargando...
              </Typography>
            )}
          </Box>
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
            {globalText("n viviendas")}
            {globalText("ano constru barrio")}
          </Box>
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
          >
            <Typography
              variant={"body1"}
              color={"#fff"}
              fontWeight={700}
              px={"0.3rem"}
              sx={{ background: colors.blueAccent[400], borderRadius: "5px" }}
            >
              Datos EPIU: usuarios y servicios OHS
            </Typography>
            {infoValue && Object.keys(infoValue).length > 0
              ? infoText(infoPanel2)
              : infoTextDefault(2)}
          </Box>
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
          >
            <Typography
              variant={"body1"}
              color={colors.gray[900]}
              fontWeight={700}
              sx={{ textAlign: "center" }}
            >
              -
            </Typography>
            {globalText("porc exptes")}
            {globalText("porc motivo TRAMITACION_AYUDAS_A_REHABILITACION")}
            {globalText("porc motivo TRAMITACION_BONO_SOCIAL")}
            {globalText("porc motivo OPTIMIZACION_FACTURA barrio")}
            {globalText("porc Comunicaciones del Ayuntamiento")}
            {globalText("porc Otros departamentos (SAV y otros)")}
            {globalText("porc SS.SS")}
            {globalText("Intervalo de confianza (%)")}
          </Box>
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
          >
            <Typography
              variant={"body1"}
              color={colors.gray[900]}
              fontWeight={700}
              sx={{ textAlign: "center" }}
            >
              -
            </Typography>
            {globalText("pob total (INE 22)")}
            {globalText("porc pob menor de 14 años (INE 22)")}
            {globalText("porc pob de 65 y más años (INE 22)")}
            {globalText("edad media pob (INE 20)")}
            {globalText("Índice de dependencia de mayores (%)")}
            {globalText("Índice de dependencia total (%)")}
          </Box>
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
          >
            <Typography
              variant={"body1"}
              color={colors.gray[900]}
              fontWeight={700}
              sx={{ textAlign: "center" }}
            >
              -
            </Typography>
            {globalText("renta media hogar")}
            {globalText("porc hogares unipersonales (INE 20)")}
          </Box>
          <Box
            gridColumn={"span 4"}
            gridRow={"span 6"}
            backgroundColor={colors.gray[900]}
            display={"flex"}
            alignItems={"center"}
            justifyContent={"center"}
            padding={"7px 5px 7px 5px"}
            flexDirection={"column"}
          >
            {barrioChart.length === 0 ? (
              <Typography variant="body1" color={colors.gray[100]}>
                Cargando...
              </Typography>
            ) : (
              <BarChart
                data={barrioChart}
                isAnoConstru={
                  pathToSelect(selectionValue) === "ano constru barrio"
                    ? true
                    : false
                }
                isEuro={
                  pathToSelect(selectionValue) === "renta media hogar"
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
