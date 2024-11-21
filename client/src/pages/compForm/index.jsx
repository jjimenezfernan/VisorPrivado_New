import React, { useState, useEffect } from "react";
import { Box, Typography, useTheme, IconButton } from "@mui/material";
import { tokens } from "../../theme";
import SubBar from "../global/SubBar";
import HeatMap from "../../components/HeatMapComp";
import BarChart from "../../components/BarChartComp";
import axios from "axios";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {DIRECTION} from "../../data/direccion_server";

const baseURL = DIRECTION + "/api/formacion3";
//  "https://observatoriodedatosepiu.khoraurbanthinkers.es/api/formacion3";
const storageKey = "compFormData"; // Key for storing/retrieving data from localStorage

function CompForm() {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [heatMapData, setHeatMapData] = useState([]);
  const [satisOhs, setSatisOhs] = useState(0);
  const [satisDeriv, setSatisDeriv] = useState(0);
  const [barData, setBarData] = useState([]);

  useEffect(() => {
    localStorage.removeItem(storageKey); //remove this line later

    const storedData = sessionStorage.getItem(storageKey);

    if (storedData) {
      const parsedData = JSON.parse(storedData);
      setHeatMapData(parsedData[0]);
      setSatisOhs(parsedData[1][0][1]);
      setSatisDeriv(parsedData[1][1][1]);
      setBarData(parsedData[2]);
    } else {
      axios.get(baseURL).then((res) => {
        const data = res.data;
        setHeatMapData(data[0]);
        setSatisOhs(data[1][0][1]);
        setSatisDeriv(data[1][1][1]);
        setBarData(data[2]);
        sessionStorage.setItem(storageKey, JSON.stringify(data));
      });
    }
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <SubBar
        title={"Satisfacción de las formaciones"}
        crumbs={[
          ["Inicio", "/"],
          ["Servicio", "/ohs"],
          ["Formación", "/ohs"],
          ["Comparativa", "/comparativa-formacion"],
        ]}
        info={{
          title:
            "Nivel de satisfacción de las formaciones a áreas y derivadores",
          description: (
            <Typography
              variant="h6"
              align="justify"
              sx={{ color: colors.gray[400] }}
            >
              <p>
                <strong>Indicador 3 - </strong>
                <strong>
                  Nivel de satisfacci&oacute;n de las formaciones a &aacute;reas
                  y derivadores
                </strong>
                &nbsp;
              </p>
              <p>
                El objetivo de este indicador es conocer el nivel de la
                satisfacci&oacute;n de las formaciones impartidas sobre
                vulnerabilidad energ&eacute;tica y su detecci&oacute;n en la
                poblaci&oacute;n, en &aacute;reas del Ayuntamiento, asociaciones
                y otros grupos formados.&nbsp;
              </p>
              <p>
                Este dato se obtiene mediante la encuesta de satisfacci&oacute;n
                sobre la formaci&oacute;n a derivadores que han recibido.&nbsp;
              </p>
              <p>Target value: 8/10&nbsp;</p>
              <p>Resultado: 8,84/10&nbsp;</p>
            </Typography>
          ),
        }}
      />
      <Box display={"flex"} flexDirection={"row"}>
        <Box
          height={"90px"}
          width={"45px"}
          display={"flex"}
          // backgroundColor={colors.gray[900]}
          marginX={"0px"}
          alignSelf={"center"}
          justifyContent={"center"}
          alignItems={"center"}
          zIndex={10}
        >
          <Link to="/derivadores">
            <ArrowForwardIosIcon
              sx={{
                fontSize: "30px",
                transform: "scale(-1, 1)",
                color: colors.primary[800],
                ":hover": {
                  color: colors.primary[700],
                  cursor: "pointer",
                },
              }}
            />
          </Link>
        </Box>
        <Box marginTop="10px" width={"100%"}>
          <Box
            display={"grid"}
            gridTemplateColumns={"repeat(12,1fr)"}
            //60 topbar + 40 subbar + 20 gaps + 10 extra
            gridAutoRows={`calc((100vh - 60px - 40px - 20px - 10px) / 6.5)`}
            gap={"10px"}
          >
            {/* Row 1 */}
            <Box
              gridColumn={"span 8"}
              gridRow={"span 6"}
              backgroundColor={colors.gray[900]}
              // border={`1px solid ${colors.gray[800]}`}
              // borderRadius={"10px"}
              display={"flex"}
              alignItems={"center"}
              justifyContent={"center"}
              pt={"10px"}
            >
              <HeatMap data={heatMapData} />
            </Box>
            <Box
              gridColumn={"span 2"}
              gridRow={"span 1"}
              backgroundColor={colors.gray[900]}
              // border={`1px solid ${colors.gray[800]}`}
              // borderRadius={"10px"}
              display={"flex"}
              alignItems={"center"}
              justifyContent={"center"}
              flexDirection={"column"}
            >
              <Typography variant={"h5"} color={colors.gray[100]}>
                Satisfacción OHS
              </Typography>
              {satisOhs === 0 ? (
                <Typography
                  variant={"h4"}
                  fontWeight={500}
                  color={colors.greenAccent[500]}
                >
                  Cargando...
                </Typography>
              ) : (
                <Typography
                  variant={"h1"}
                  fontWeight={500}
                  color={colors.greenAccent[500]}
                >
                  {satisOhs.toFixed(2)}
                </Typography>
              )}
            </Box>
            <Box
              gridColumn={"span 2"}
              gridRow={"span 1"}
              backgroundColor={colors.gray[900]}
              // border={`1px solid ${colors.gray[800]}`}
              // borderRadius={"10px"}
              display={"flex"}
              flexDirection={"column"}
              alignItems={"center"}
              justifyContent={"center"}
            >
              <Typography variant={"h5"} color={colors.gray[100]}>
                Satisfacción derivadores
              </Typography>
              {satisDeriv === 0 ? (
                <Typography
                  variant={"h4"}
                  fontWeight={500}
                  color={colors.blueAccent[500]}
                >
                  Cargando...
                </Typography>
              ) : (
                <Typography
                  variant={"h1"}
                  fontWeight={500}
                  color={colors.blueAccent[500]}
                >
                  {satisDeriv.toFixed(2)}
                </Typography>
              )}
            </Box>
            <Box
              gridColumn={"span 4"}
              gridRow={"span 5"}
              backgroundColor={colors.gray[900]}
              // border={`1px solid ${colors.gray[800]}`}
              // borderRadius={"10px"}
              display={"flex"}
              flexDirection={"column"}
              alignItems={"center"}
              justifyContent={"center"}
              pt={"10px"}
            >
              <Typography variant={"h4"} color={colors.gray[100]}>
                Ranking bloque de preguntas
              </Typography>
              <BarChart data={barData} />
            </Box>
          </Box>
        </Box>
        <Box
          height={"90px"}
          width={"45px"}
          display={"flex"}
          // backgroundColor={colors.gray[900]}
          marginX={"0px"}
          alignSelf={"center"}
          justifyContent={"center"}
          alignItems={"center"}
          zIndex={10}
        >
          <Link to="/ohs">
            <ArrowForwardIosIcon
              sx={{
                fontSize: "30px",
                color: colors.primary[800],
                ":hover": { color: colors.primary[700], cursor: "pointer" },
              }}
            />
          </Link>
        </Box>
      </Box>
    </motion.div>
  );
}

export default CompForm;
