import React, { useState, useEffect } from "react";
import { Box, Typography, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import SubBar from "../global/SubBar";
import HeatMap from "../../components/HeatMapInter";
import HeatMap2 from "../../components/HeatMapInter2";
import BarChart from "../../components/BarChartInter";
import BarChart2 from "../../components/BarChartInter2";
import axios from "axios";
import { motion } from "framer-motion";

import {DIRECTION} from "../../data/direccion_server";

const baseURL = DIRECTION + "/api/intervenciones";

//  "https://observatoriodedatosepiu.khoraurbanthinkers.es/api/intervenciones";
const storageKey = "intervencion1Data"; // Key for storing/retrieving data from localStorage

function Intervenciones1() {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [heatMapData, setHeatMapData] = useState([]);
  const [heatMapData2, setHeatMapData2] = useState([]);
  const [barData, setBarData] = useState([]);
  // const [headers, setHeaders] = useState([]);
  const [barData2, setBarData2] = useState([]);
  const [headers2, setHeaders2] = useState([]);

  useEffect(() => {
    // const storedData = sessionStorage.getItem(storageKey);
    // if (storedData) {
    //   const parsedData = JSON.parse(storedData);
    //   setSunburstData(parsedData[0]);
    //   setHeatmapData(parsedData[1]);
    //   setChordHeaders(parsedData[2][0]);
    //   setChordData(parsedData[2][1]);
    // } else {
    axios.get(baseURL).then((res) => {
      const data = res.data;
      console.log(data);
      setHeatMapData(data.heatMapData1);
      setHeatMapData2(data.heatMapData2);
      setBarData(data.barChart);
      setBarData2(data.barChart2);
      setHeaders2(data.headers2);

      // sessionStorage.setItem(storageKey, JSON.stringify(data));
    });
    // }
  }, []);

  useEffect(() => {
    console.log(heatMapData);
  }, [heatMapData]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <SubBar
        title={"Evaluación de las Tailor Made Solutions"}
        crumbs={[
          ["Inicio", "/"],
          ["Intervenciones", "/intervenciones"],
        ]}
        info={{
          title: "Intervenciones",
          description: (
            <Typography
              variant="h6"
              align="justify"
              sx={{ color: colors.gray[400] }}
            >
              <p>
                <strong>
                  Indicador 1 - Disminuci&oacute;n del n&uacute;mero de
                  viviendas que no pueden mantenerse a una temperatura adecuada
                </strong>
                &nbsp;
              </p>
              <p>
                El objetivo del indicador es conocer el n&uacute;mero de las
                viviendas de Getafe que no pueden mantener una situaci&oacute;n
                de confort en invierno y en verano.&nbsp;
              </p>
              <p>
                Este dato se obtiene mediante las preguntas: "&iquest;Puede
                mantener su vivienda a una temperatura adecuada en invierno?" y
                "&iquest;Puede mantener su vivienda a una temperatura adecuada
                en verano?", durante la apertura de expediente de usuario de la
                OHS, y en la encuesta de satisfacci&oacute;n sobre la medida
                recibida.&nbsp;&nbsp;
              </p>
              <p>Target value: 20%&nbsp;</p>
              <p>Resultado: 38%&nbsp;</p>
              <p>
                <strong>Indicador</strong>
                <strong> 5 - </strong>
                <strong>
                  Porcentaje de beneficiarios satisfechos con las medidas
                </strong>
                <strong> recibidas</strong>&nbsp;
              </p>
              <p>
                El objetivo de este indicador es conocer el nivel de
                satisfacci&oacute;n de los beneficiarios respecto a la Tailor
                Made Solutions, y el porcentaje de personas
                satisfechas.&nbsp;&nbsp;
              </p>
              <p>
                Este dato se obtiene en la encuesta de satisfacci&oacute;n sobre
                la medida recibida.&nbsp;&nbsp;
              </p>
              <p>Target value: 80%&nbsp;</p>
              <p>Resultado: 77,3%&nbsp;</p>
              <p>
                <strong>Indicador</strong>
                <strong>
                  {" "}
                  6 - Porcentaje de medidas priorizadas, cuantificadas y
                  evaluadas en t&eacute;rminos de eficacia y eficiencia
                </strong>
                &nbsp;
              </p>
              <p>
                El objetivo de este indicador es evaluar las medidas
                implementadas seg&uacute;n los objetivos de confort y de
                necesidades energ&eacute;ticas alcanzadas (eficacia), y
                seg&uacute;n la rentabilidad de la puesta en marcha de estas
                medidas (eficiencia).&nbsp;
              </p>
              <p>
                Este dato se obtiene en el registro de n&uacute;mero de
                beneficiarios por medida y la previsi&oacute;n inicial, y en el
                coste de cada medida.&nbsp;
              </p>
              <p>Target value: 100 %&nbsp;</p>
              <p>Resultado: 100%&nbsp;</p>
              <p>
                <strong>Indicador</strong>
                <strong> 8 - </strong>
                <strong>
                  Porcentaje de reducci&oacute;n de GEI en las viviendas y
                  edificios beneficiarios
                </strong>
                &nbsp;
              </p>
              <p>
                El objetivo de este indicador es medir el impacto de las medidas
                implementadas respecto a la emisi&oacute;n de GEI's, a
                trav&eacute;s de la diferencia de gasto de consumo
                energ&eacute;tico (kWh).&nbsp;&nbsp;
              </p>
              <p>
                Este dato se obtiene de la base de datos DATADIS, previo
                consentimiento en la apertura de expediente de usuario de la
                OHS&nbsp;
              </p>
              <p>Target value: 30%&nbsp;</p>
              <p>Resultado: 4,6%&nbsp;</p>
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
          <Box
            gridColumn={"span 3"}
            gridRow={"span 3"}
            backgroundColor={colors.gray[900]}
            display={"flex"}
            alignItems={"center"}
            justifyContent={"center"}
            pt={"10px"}
            mr={"-5px"}
            flexDirection={"column"}
          >
            <HeatMap data={heatMapData} />
          </Box>
          <Box
            gridColumn={"span 9"}
            gridRow={"span 3"}
            backgroundColor={colors.gray[900]}
            display={"flex"}
            alignItems={"center"}
            justifyContent={"center"}
            pt={"10px"}
            ml={"-5px"}
            flexDirection={"column"}
          >
            <HeatMap2 data={heatMapData2} />
          </Box>
          <Box
            gridColumn={"span 6"}
            gridRow={"span 3"}
            backgroundColor={colors.gray[900]}
            display={"flex"}
            alignItems={"center"}
            justifyContent={"center"}
            pt={"20px"}
            flexDirection={"column"}
          >
            <Typography variant={"h5"} color={colors.gray[100]}>
              Consumo energético medio
            </Typography>
            <BarChart data={barData} />
          </Box>
          <Box
            gridColumn={"span 6"}
            gridRow={"span 3"}
            backgroundColor={colors.gray[900]}
            display={"flex"}
            alignItems={"center"}
            justifyContent={"center"}
            pt={"20px"}
            flexDirection={"column"}
          >
            <Typography variant={"h5"} color={colors.gray[100]}>
              Reparto de medidas por intinerario
            </Typography>
            <BarChart2 data={barData2} headers={headers2} />
          </Box>
        </Box>
      </Box>
    </motion.div>
  );
}

export default Intervenciones1;
