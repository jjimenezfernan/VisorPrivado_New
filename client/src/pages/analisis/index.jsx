import React, { useState, useLayoutEffect } from "react";
import { Box, Typography, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import SubBar from "../global/SubBar";
import Sunburst from "../../components/SunburstAnalisis";
import ChordChart from "../../components/ChordChartAnalisis";
// import StackedBarLine from "../../components/StackedBarLine";
import LineBarChart from "../../components/LineBarComposedAnalisis";
import LineBarChart2 from "../../components/LineBarComposedAnalisis2";
import axios from "axios";
import { motion } from "framer-motion";
import {DIRECTION} from "../../data/direccion_server";

const baseURL = DIRECTION + "/api/analisis";
//  "https://observatoriodedatosepiu.khoraurbanthinkers.es/api/analisis";
const storageKey = "analisisData"; // Key for storing/retrieving data from localStorage

function Analisis() {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [sunburstData, setSunburstData] = useState({});
  const [barData, setBarData] = useState([]);
  const [lineData, setLineData] = useState([]);
  const [chordHeaders, setChordHeaders] = useState([]);
  const [chordData, setChordData] = useState([]);

  useLayoutEffect(() => {
    // const storedData = sessionStorage.getItem(storageKey);
    // if (storedData) {
    //   const parsedData = JSON.parse(storedData);
    //   setSunburstData(parsedData[0]);
    //   setBarData(parsedData[1]);
    //   setLineData(parsedData[2]);
    //   setChordHeaders(parsedData[3][0]);
    //   setChordData(parsedData[3][1]);
    // } else {
    axios.get(baseURL).then((res) => {
      const data = res.data;
      setSunburstData(data[0]);
      setBarData(data[1]);
      setLineData(data[2]);
      setChordHeaders(data[3][0]);
      setChordData(data[3][1]);
      // sessionStorage.setItem(storageKey, JSON.stringify(data));
    });
    // }
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <SubBar
        title={"Caracterización de la población vulnerable energéticamente"}
        crumbs={[
          ["Inicio", "/"],
          ["Análisis", "/analisis"],
        ]}
        info={{
          title: "Caracterización de la población vulnerable energéticamente",
          description: (
            <Typography
              variant="h6"
              align="justify"
              sx={{ color: colors.gray[400] }}
            >
              <p aria-level="4">
                <strong>
                  Indicador 2 - Caracterizaci&oacute;n de la poblaci&oacute;n
                  vulnerable energ&eacute;ticamente
                </strong>
                &nbsp;
              </p>
              <p>
                El objetivo de este indicador es caracterizar la
                poblaci&oacute;n de Getafe en t&eacute;rminos de gasto
                energ&eacute;tico y econ&oacute;mico, teniendo en cuenta el
                estado de la vivienda y los h&aacute;bitos energ&eacute;ticos de
                las familias.&nbsp;
              </p>
              <p>
                Estos datos se obtienen mediante las preguntas:
                "&iquest;Cu&aacute;les son sus ingresos mensuales familiares?",
                "&iquest;Qu&eacute; patolog&iacute;as presenta su vivienda?", y
                "&iquest;Qu&eacute; h&aacute;bitos tiene respecto al control de
                la temperatura de su vivienda?", durante la apertura de
                expediente de usuario de la OHS. El gasto energ&eacute;tico se
                obtiene de la base de datos DATADIS, previo consentimiento en la
                apertura de expediente de usuario de la OHS&nbsp;
              </p>
              <p>Target value: 80%&nbsp;</p>
              <p>Resultado: 28%&nbsp;</p>
            </Typography>
          ),
        }}
      />
      <Box m="10px">
        <Box
          display={"grid"}
          gridTemplateColumns={"repeat(12,1fr)"}
          //60 topbar + 40 subbar + 20 gaps + 10 extra
          gridAutoRows={`calc((100vh - 60px - 40px - 20px - 10px) / 6.5)`}
          gap={"10px"}
        >
          {/* Row 1 */}
          <Box
            gridColumn={"span 6"}
            gridRow={"span 6"}
            backgroundColor={colors.gray[900]}
            display={"flex"}
            alignItems={"center"}
            justifyContent={"center"}
            pt={"10px"}
            flexDirection={"column"}
          >
            {sunburstData && Object.keys(sunburstData).length > 0 ? (
              <Sunburst data={sunburstData} />
            ) : (
              <Typography variant="body1" color={colors.gray[100]}>
                Cargando...
              </Typography>
            )}
          </Box>
          <Box
            gridColumn={"span 6"}
            gridRow={"span 2"}
            backgroundColor={colors.gray[900]}
            display={"flex"}
            flexDirection={"column"}
            alignItems={"center"}
            justifyContent={"center"}
            pt={"10px"}
            // pb={"20px"}
          >
            <Typography variant={"h4"} color={colors.gray[100]}>
              Evolución del confort térmico por mes
            </Typography>
            {lineData && lineData.length > 0 ? (
              <LineBarChart2 data={lineData} />
            ) : (
              <Typography variant={"h5"} color={colors.gray[100]}>
                Cargando...
              </Typography>
            )}
          </Box>
          <Box
            gridColumn={"span 6"}
            gridRow={"span 2"}
            backgroundColor={colors.gray[900]}
            display={"flex"}
            flexDirection={"column"}
            alignItems={"center"}
            justifyContent={"center"}
            pt={"10px"}
            // pb={"20px"}
          >
            <Typography variant={"h4"} color={colors.gray[100]}>
              Presencia cada tipo de patología por mes
            </Typography>
            {barData && barData.length > 0 ? (
              <LineBarChart data={barData} />
            ) : (
              <Typography variant={"h5"} color={colors.gray[100]}>
                Cargando...
              </Typography>
            )}
          </Box>
          <Box
            gridColumn={"span 6"}
            gridRow={"span 2"}
            backgroundColor={colors.gray[900]}
            display={"flex"}
            alignItems={"center"}
            justifyContent={"center"}
            flexDirection={"column"}
            pt={"10px"}
          >
            <Typography variant={"h4"} color={colors.gray[100]}>
              Relación entre las patologías
            </Typography>
            <ChordChart headers={chordHeaders} data={chordData} />
          </Box>
        </Box>
      </Box>
    </motion.div>
  );
}

export default Analisis;
