/**
 * Pagina de concienciacion
 */

import { useState, useEffect } from "react";
import { Box, Typography, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import SubUpBar from "../global/SubUpBar";
import CirclePacking from "../../components/CirclePackingConcien";
import axios from "axios";
import { motion } from "framer-motion";
import {DIRECTION} from "../../data/direccion_server";
import { padding } from "@mui/system";

const baseURL = DIRECTION + "/api/concienciacion";

function Concienciacion() {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [circlesData, setCirclesData] = useState({});
  const [global1, setGlobal1] = useState(0);
  const [global2, setGlobal2] = useState(0);
  const [global3, setGlobal3] = useState(0);

  useEffect(() => {

    axios.get(baseURL).then((res) => {
      const data = res.data;
      setCirclesData(data[0]);
      setGlobal1(data[1][0][1]);
      setGlobal2(data[1][1][1]);
      setGlobal3(data[1][2][1]);
      });
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <SubUpBar
        title={"Concienciación ciudadana en pobreza energética"}
        crumbs={[
          ["Inicio", "/"],
          ["Servicio", "/"],
          ["Concienciación", "/concienciación"],
        ]}
        info={{
          title:
            "Personas que han adquirido conciencia sobre la vulnerabilidad energética",
          description: (
            <Typography
              variant="h6"
              align="justify"
              sx={{ color: colors.gray[400] }}
            >
              <p>
                <strong>Indicador 7 - </strong>
                <strong>
                  Personas que han adquirido conciencia sobre la vulnerabilidad
                  energ&eacute;tica
                </strong>
                &nbsp;
              </p>
              <p>
                El objetivo de este indicador es conocer el porcentaje de la
                poblaci&oacute;n de Getafe que ha adquirido conciencia sobre
                vulnerabilidad energ&eacute;tica, a trav&eacute;s de acciones de
                difusi&oacute;n y divulgaci&oacute;n del proyecto. La asistencia
                a talleres, la informaci&oacute;n proporcionada en la OHS y las
                acciones de asesoramiento en puntos de informaci&oacute;n tienen
                la capacidad de concienciar a la poblaci&oacute;n interesada en
                mejorar su situaci&oacute;n energ&eacute;tica.&nbsp;&nbsp;
              </p>
              <p>
                Este dato se obtiene mediante el conteo del n&uacute;mero de
                personas que han tenido contacto o han participado en
                actividades de difusi&oacute;n y divulgaci&oacute;n del
                proyecto.&nbsp;
              </p>
              <p>Target value: 31%&nbsp;</p>
              <p>Resultado: 14,5%&nbsp;</p>
            </Typography>
          ),
        }}
      />
      <Box m="10px">
        <Box
          display={"grid"}
          gridTemplateColumns={"repeat(12,1fr)"}
          //60 topbar + 40 SubUpBar + 20 gaps + 10 extra
          gridAutoRows={`calc((100vh - 60px - 40px - 20px - 10px) / 6.5)`}
          gap={"10px"}
        >
          {/* Row 1 */}
          <Box
            gridColumn={"span 10"}
            gridRow={"span 6"}
            backgroundColor={colors.gray[900]}
            display={"flex"}
            alignItems={"center"}
            justifyContent={"center"}
            flexDirection={"column"}
            pt={"10px"}
            borderRadius={"10px"}
          >
            {circlesData && Object.keys(circlesData).length > 0 ? (
              <CirclePacking data={circlesData} />
            ) : (
              <Typography variant="body1" color={colors.gray[100]}>
                Cargando...
              </Typography>
            )}
          </Box>
          <Box
            gridColumn={"span 2"}
            gridRow={"span 1"}
            backgroundColor={colors.gray[900]}
            display={"flex"}
            flexDirection={"column"}
            alignItems={"center"}
            justifyContent={"center"}
            pt={"10px"}
            borderRadius={"10px"}
          >
            <Typography variant={"h5"} color={colors.gray[100]} sx={{padding: "7px",}}>
              Número de personas con conciencia sobre PE
            </Typography>
            {global1 === 0 ? (
              <Typography
                variant={"h4"}
                fontWeight={500}
                color={colors.orangeAccent[500]}
              >
                Cargando...
              </Typography>
            ) : (
              <Typography
                variant={"h1"}
                fontWeight={500}
                color={colors.orangeAccent[500]}
              >
                {global1}
              </Typography>
            )}
          </Box>
          <Box
            gridColumn={"span 2"}
            gridRow={"span 1"}
            backgroundColor={colors.gray[900]}
            display={"flex"}
            flexDirection={"column"}
            alignItems={"center"}
            justifyContent={"center"}
            pt={"10px"}
            borderRadius={"10px"}
          >
            <Typography variant={"h5"} color={colors.gray[100]}>
              Población de Getafe sensibilizada
            </Typography>
            {global2 === 0 ? (
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
                {(global2 * 100).toFixed(2)}%
              </Typography>
            )}
          </Box>
        </Box>
      </Box>
    </motion.div>
  );
}

export default Concienciacion;
