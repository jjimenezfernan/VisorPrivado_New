/**
 * Pagina de derivacion
 */

import { useState, useEffect } from "react";
import { Box, Typography, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import SubBar from "../global/SubBar";
import SankeyChart from "../../components/SankeyDerivacion";
import BarChart from "../../components/BarChartDerivacion";
import PieChart from "../../components/PieChartDerivacion";
import axios from "axios";
import { motion } from "framer-motion";
import loading from "../../assets/loading.gif";

import {DIRECTION} from "../../data/direccion_server";

const baseURL = DIRECTION + "/api/derivacion"

function Derivacion() {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [sankeyData, setSankeyData] = useState({});
  const [totalDeriv, setTotalDeriv] = useState(0);
  const [pieData, setPieData] = useState([]);
  const [barData, setBarData] = useState([]);

  useEffect(() => {
    axios.get(baseURL).then((res) => {
      const data = res.data;
      setSankeyData(data[0]);
      setTotalDeriv(data[1][0][1]);
      setPieData(data[2]);
      setBarData(data[3]);
    });
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <SubBar
        title={"Calidad de las derivaciones"}
        crumbs={[
          ["Inicio", "/"],
          ["Servicio", "/"],
          ["Derivación", "/derivacion"],
        ]}
        info={{
          title:
            "",
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
          //60 topbar + 40 subbar + 20 gaps + 10 extra
          gridAutoRows={`calc((100vh - 60px - 40px - 20px - 10px) / 6.5)`}
          gap={"10px"}
        >
          {/* Row 1 */}
          <Box
            gridColumn={"span 8"}
            gridRow={"span 6"}
            backgroundColor={colors.gray[900]}
            display={"flex"}
            alignItems={"center"}
            justifyContent={"center"}
            pt={"10px"}
          >
            {sankeyData && Object.keys(sankeyData).length > 0 ? (
              <SankeyChart data={sankeyData} />
            ) : (
              <img src={loading} alt="Cargando..." width={"70px"} />
            )}
          </Box>
          <Box
            gridColumn={"span 4"}
            gridRow={"span 1"}
            backgroundColor={colors.gray[900]}
            display={"flex"}
            flexDirection={"column"}
            alignItems={"center"}
            justifyContent={"center"}
            pt={"10px"}
          >
            <Typography variant={"h4"} color={colors.gray[100]}>
              Número total de derivaciones
            </Typography>
            {totalDeriv === 0 ? (
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
                {totalDeriv}
              </Typography>
            )}
          </Box>
          <Box
            gridColumn={"span 4"}
            gridRow={"span 3"}
            backgroundColor={colors.gray[900]}
            display={"flex"}
            flexDirection={"column"}
            alignItems={"center"}
            justifyContent={"center"}
            pt={"10px"}
          >
            <Typography variant={"h4"} color={colors.gray[100]}>
              Origen de la Derivación
            </Typography>
            {pieData.length === 0 ? (
              <img src={loading} alt="Cargando..." width={"70px"} />
            ) : (
              <PieChart data={pieData} />
            )}
          </Box>
          <Box
            gridColumn={"span 4"}
            gridRow={"span 2"}
            backgroundColor={colors.gray[900]}
            display={"flex"}
            alignItems={"center"}
            justifyContent={"center"}
            flexDirection={"column"}
            pt={"10px"}
          >
            <Typography variant={"h4"} color={colors.gray[100]}>
              Motivo de la Consulta
            </Typography>
            {barData.length === 0 ? (
              <img src={loading} alt="Cargando..." width={"70px"} />
            ) : (
              <BarChart data={barData} />
            )}
          </Box>
        </Box>
      </Box>
    </motion.div>
  );
}

export default Derivacion;
