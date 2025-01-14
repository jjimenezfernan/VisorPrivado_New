import { useState, useEffect } from "react";
import { Box, Typography, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import SubUpBar from "../global/SubUpBar";
import BarChartDash2 from "../../components/BarChartDash2";
import BarChartDash3 from "../../components/BarChartDash3";
import BarChartDash4 from "../../components/BarChartDash4";
import LineChart from "../../components/LineChartDash";
import axios from "axios";
import { motion } from "framer-motion";
import FamilyRestroomIcon from "@mui/icons-material/FamilyRestroom";
import AdfScannerIcon from "@mui/icons-material/AdfScanner";
import CallIcon from "@mui/icons-material/Call";
import AlternateEmailIcon from "@mui/icons-material/AlternateEmail";
import WcIcon from '@mui/icons-material/Wc';
import Diversity3Icon from '@mui/icons-material/Diversity3';
import HouseIcon from '@mui/icons-material/House';
import HailIcon from '@mui/icons-material/Hail';
import Diversity1Icon from '@mui/icons-material/Diversity1';
import ElevatorIcon from '@mui/icons-material/Elevator';
import ApartmentIcon from '@mui/icons-material/Apartment';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import {DIRECTION} from "../../data/direccion_server";

const baseURL = DIRECTION + "/api/dashboard";

function Dashboard() {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [globalData, setGlobalData] = useState([]);
  const [infoSocialEco, setInfoSocialEco] = useState([]);
  const [infoEvol, setInfoEvol] = useState([]);
  const [barData2, setBarData2] = useState([]);
  const [barData3, setBarData3] = useState([]);
  const [barData4, setBarData4] = useState([]);
  const [lineData1, setLineData1] = useState([]);
  const [lineMarkers1, setLineMarkers1] = useState([]);

  useEffect(() => {

    // Peticion para obtener los datos 
    axios.get(baseURL).then((res) => {
      const data = res.data;
      setGlobalData(data.globalData);
      setInfoSocialEco(data.infoSocialEco);
      setInfoEvol(data.infoEvol);
      setBarData2(data.barChart2);
      setBarData3(data.barChart3);
      setBarData4(data.barChart4);
      setLineData1(data.lineChart1[0]);
      setLineMarkers1(data.lineChart1[1]);
      console.log("Created by Khora Urban Thinkers");
      console.log("Contact with us in https://khoraurbanthinkers.es/en/home-en/")
      console.log("Our X account https://x.com/khoraurban")
      console.log("Our Linkedin account https://www.linkedin.com/company/khora-urban-thinkers/posts/?feedView=all")
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
        title={"Principales estadísticas del servicio de la OHS"}
        crumbs={[["Inicio", "/"]]}
        info={{
          title: "Inicio",
          description: "",
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
          <Box
            gridColumn={"span 5"}
            gridRow={"span 1"}
            backgroundColor={colors.gray[900]}
            display={"grid"}
            gridTemplateColumns={"repeat(2,1fr)"}
            gridTemplateRows={"repeat(3, 1fr)"}
            // justifyContent={"space-evenly"}
            padding={"10px 5px 10px 20px"}
            // flexDirection={"column"}
          >
            {globalData.length > 0 ? (
              <>
                <Typography
                  variant={"h3"}
                  color={colors.gray[100]}
                  gridColumn={"span 2"}
                  gridRow={"span 1"}
                >
                  <strong>INFORAMACIÓN OPERATIVA</strong>
                </Typography>
                <Typography
                  variant={"h5"}
                  color={colors.gray[100]}
                  gridColumn={"span 1"}
                  gridRow={"span 1"}
                  // textAlign={"center"}
                >
                  <FamilyRestroomIcon fontSize={"large"} sx={{ mr: "15px" }} />
                  Usuarios de la OHS: <strong>{globalData[0][1]}</strong>
                </Typography>
                <Typography
                  variant={"h5"}
                  color={colors.gray[100]}
                  gridColumn={"span 1"}
                  gridRow={"span 1"}
                  // textAlign={"start"}
                >
                  <AdfScannerIcon fontSize={"large"} sx={{ mr: "15px" }} />
                  {globalData[1][0]}: <strong>{globalData[1][1]}</strong>
                </Typography>
                <Typography
                  variant={"h5"}
                  color={colors.gray[100]}
                  gridColumn={"span 1"}
                  gridRow={"span 1"}
                  // textAlign={"start"}
                >
                  <CallIcon fontSize={"large"} sx={{ mr: "15px" }} />
                  {globalData[2][0]}: <strong>{globalData[2][1]}</strong>
                </Typography>
                <Typography
                  variant={"h5"}
                  color={colors.gray[100]}
                  gridColumn={"span 1"}
                  gridRow={"span 1"}
  
                >
                  <AlternateEmailIcon fontSize={"large"} sx={{ mr: "15px" }} />
                  {globalData[3][0]}: <strong>{globalData[3][1]}</strong>
                </Typography>
              </>
            ) : (
              <Typography variant={"h5"} color={colors.gray[100]}>
                Loading...
              </Typography>
            )}
          </Box>
          <Box
            gridColumn={"span 3"}
            gridRow={"span 3"}
            backgroundColor={colors.gray[900]}
            display={"flex"}
            alignItems={"center"}
            justifyContent={"center"}
            padding={"10px 5px 10px 5px"}
            flexDirection={"column"}
          >
            <Typography variant={"h5"} color={colors.gray[100]}>
              Origen de usuarios
            </Typography>
            <BarChartDash3 data={barData3} />
          </Box>
          <Box
            gridColumn={"span 4"}
            gridRow={"span 3"}
            backgroundColor={colors.gray[900]}
            display={"flex"}
            alignItems={"center"}
            justifyContent={"center"}
            padding={"10px 5px 10px 5px"}
            flexDirection={"column"}
          >
            <Typography variant={"h5"} color={colors.gray[100]}>
              Reparto por barrios
            </Typography>
            <BarChartDash4 data={barData4} />
          </Box>
          <Box
            gridColumn={"span 5"}
            gridRow={"span 2"}
            backgroundColor={colors.gray[900]}
            display={"grid"}
            gridTemplateColumns={"repeat(2,1fr)"}
            gridTemplateRows={"repeat(4, 1fr)"}
            padding={"10px 5px 10px 20px"}
          >
            {infoSocialEco.length > 0 ? (
              <>
                <Typography
                  variant={"h3"}
                  color={colors.gray[100]}
                  gridColumn={"span 2"}
                  gridRow={"span 1"}
                >
                  <strong>INFORAMACIÓN SOCIOECONÓMICA</strong>
                </Typography>
                {/* Mujeres y Hombres*/}
                <Typography
                  variant={"h5"}
                  color={colors.gray[100]}
                  gridColumn={"span 1"}
                  gridRow={"span 1"}
                  display={"grid"}
                  gridTemplateColumns={"repeat(2,50px)"}
                  gridTemplateRows={"repeat(2, 1fr)"}
                >
                  <Box
                    gridColumn={"span 1"} 
                    gridRow={"span 2"}  
                    display="flex"
                    alignItems="center"
                    justifyContent="center"             
                  >
                    <WcIcon 
                      fontSize={"large"}
                      sx={{ mr: "15px" }}
                    />
                  </Box>
                  <Typography
                    gridColumn={"4/2"} 
                    gridRow={"0.5"}
                    variant={"h5"}
                  > 
                    {infoSocialEco[0][0]}: <strong>{infoSocialEco[0][1].toFixed(2)}</strong> 
                  </Typography>
                  <Typography
                    gridColumn={"4/2"} 
                    gridRow={"0.5"}  
                    variant={"h5"}
                  > 
                    {infoSocialEco[1][0]}: <strong>{infoSocialEco[1][1].toFixed(2)}</strong> 
                  </Typography>
                </Typography>
                {/* Usuarios Propietarios */}
                <Typography
                  variant={"h5"}
                  color={colors.gray[100]}
                  gridColumn={"span 1"}
                  gridRow={"span 1"}
                >
                  <HouseIcon fontSize={"large"} sx={{ mr: "15px" }} />
                  {infoSocialEco[6][0]}: <strong>{infoSocialEco[6][1].toFixed(2)}</strong>
                </Typography>
                {/* Edad Media de los usuarios */}
                <Typography
                  variant={"h5"}
                  color={colors.gray[100]}
                  gridColumn={"span 1"}
                  gridRow={"span 1"}
                  display={"grid"}
                  gridTemplateColumns={"repeat(2,150px)"}
                  gridTemplateRows={"repeat(2, 1fr)"}
                >
                  <Box
                    gridColumn={"span 2"} 
                    gridRow={"span 2"}  

                  >
                    <Diversity3Icon 
                      fontSize={"large"} 
                      sx={{ mr: "15px" }} 
                    />
                    {infoSocialEco[2][0]}: <strong>{infoSocialEco[2][1]}</strong>
                  </Box>
                  <Box 
                    component="ul" 
                    sx={{ marginLeft: 5, }}
                  >
                    <li >
                      <Box sx={{ whiteSpace: "nowrap" }}>
                        {infoSocialEco[3][0]}: <strong>{infoSocialEco[3][1]}</strong>
                      </Box>
                    </li>
                    <li >
                      <Box sx={{ whiteSpace: "nowrap" }}>
                        {infoSocialEco[4][0]}: <strong>{infoSocialEco[4][1]}</strong>
                      </Box>
                    </li>
                  </Box>
                </Typography>
                {/* Usuarios Empleados */}
                <Typography
                  variant={"h5"}
                  color={colors.gray[100]}
                  gridColumn={"span 1"}
                  gridRow={"span 1"}
                >
                  <HailIcon fontSize={"large"} sx={{ mr: "15px" }} />
                  {infoSocialEco[7][0]}: <strong>{infoSocialEco[7][1]}</strong>
                </Typography>
                {/* Bono Social */}
                <Typography
                  variant={"h5"}
                  color={colors.gray[100]}
                  gridColumn={"span 1"}
                  gridRow={"span 1"}
                >
                  <Diversity1Icon fontSize={"large"} sx={{ mr: "15px" }} />
                  {infoSocialEco[5][0]}: <strong>{infoSocialEco[5][1].toFixed(2)}</strong>
                </Typography>
                {/* Disponibilidad de Ascensor */}
                <Typography
                  variant={"h5"}
                  color={colors.gray[100]}
                  gridColumn={"span 1"}
                  gridRow={"span 1"}
                >
                  <ElevatorIcon fontSize={"large"} sx={{ mr: "15px" }} />
                  {infoSocialEco[8][0]}: <strong>{infoSocialEco[8][1]}</strong>
                </Typography>
              </>
            ) : (
              <Typography variant={"h5"} color={colors.gray[100]}>
                Loading...
              </Typography>
            )}
          </Box>          
          <Box
            gridColumn={"span 5"}
            gridRow={"span 1"}
            backgroundColor={colors.gray[900]}
            display={"grid"}
            gridTemplateColumns={"repeat(2,1fr)"}
            gridTemplateRows={"repeat(2, 1fr)"}
            padding={"10px 5px 10px 20px"}
          >
            {infoEvol.length > 0 ? (
              <>
                <Typography
                  variant={"h3"}
                  color={colors.gray[100]}
                  gridColumn={"span 2"}
                  gridRow={"span 1"}
                >
                  <strong>INFORAMACIÓN DE EVOLUCIÓN</strong>
                </Typography>
                <Typography
                  variant={"h5"}
                  color={colors.gray[100]}
                  gridColumn={"span 1"}
                  gridRow={"span 1"}
                >
                  <GroupAddIcon fontSize={"large"} sx={{ mr: "15px" }} />
                  {infoEvol[0][0]}: <strong>{infoEvol[0][1].toFixed(2)}</strong>
                </Typography>
                <Typography
                  variant={"h5"}
                  color={colors.gray[100]}
                  gridColumn={"span 1"}
                  gridRow={"span 1"}
                >
                  <ApartmentIcon fontSize={"large"} sx={{ mr: "15px" }} />
                  {infoEvol[1][0]}: <strong>{infoEvol[1][1]}</strong>
                </Typography>
              </>
            ) : (
              <Typography variant={"h5"} color={colors.gray[100]}>
                Loading...
              </Typography>
            )}
          </Box>
          <Box
            gridColumn={"span 7"}
            gridRow={"span 3"}
            backgroundColor={colors.gray[900]}
            display={"flex"}
            alignItems={"center"}
            justifyContent={"center"}
            padding={"10px 5px 10px 5px"}
            flexDirection={"column"}
          >
            <Typography variant={"h6"} color={colors.gray[100]}>
              Evolución del Número de Usuarios por mes y las Derivaciones de
              Servicios Sociales
            </Typography>
            <LineChart data={lineData1} markers={lineMarkers1} />
          </Box>
          <Box
            gridColumn={"span 5"}
            gridRow={"span 2"}
            backgroundColor={colors.gray[900]}
            display={"flex"}
            alignItems={"center"}
            justifyContent={"center"}
            padding={"10px 5px 10px 5px"}
            flexDirection={"column"}
          >
            <Typography variant={"h5"} color={colors.gray[100]}>
              Motivo de la visita
            </Typography>
            <BarChartDash2 data={barData2} />
          </Box>
        </Box>
      </Box>
    </motion.div>
  );
}

export default Dashboard;
