import { useState, useEffect } from "react";
import { Box, Typography, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import SubBar from "../global/SubBar";
import BarChartBarrios1 from "../../components/BarChartBarrios1";
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
import ButtonBarriosDashboard from "../../components/ButtonBarriosDashboard";

const baseURL = DIRECTION + "/api/barrios_dashboard";

function BarriosDashboard() {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [globalData, setGlobalData] = useState([]);
  const [barrios, setbarrios] = useState([]);
  const [dataBarrioSelected, setDataBarrioSelected] = useState([]);

  useEffect(() => {

    // Peticion para obtener los datos 
    axios.get(baseURL).then((res) => {
      const data = res.data;
      setGlobalData(data.globalDataParsed);
      setbarrios(data.barrios);
      console.log("Created by Khora Urban Thinkers");
      console.log("Contact with us in https://khoraurbanthinkers.es/en/home-en/")
      console.log("Our X account https://x.com/khoraurban")
      console.log("Our Linkedin account https://www.linkedin.com/company/khora-urban-thinkers/posts/?feedView=all")

    });
  }, []);

  // useEffect se ejecuta cuando dataBarrioSelected cambia
  useEffect(() => {
    console.log("Barrio seleccionado (después del cambio):", dataBarrioSelected);
    // Aquí puedes ejecutar cualquier lógica adicional
  }, [dataBarrioSelected]);

  // useEffect se ejecuta solo 1 vez al principio del programa y sirve para inicializar el valor de dataBarrioSelected
  useEffect(() => {
    setDataBarrioSelected(globalData.filter( (item) => item.barrio === "Todos los Barrios"));
  }, [globalData]);

  function updateDataBarriosSelected(barrioSelected){
    console.log("Barrio seleccionado: ", barrioSelected);
    // Filtramos los datos para mostrar solo los del barrio seleccionado
    setDataBarrioSelected(globalData.filter( (item) => item.barrio === barrioSelected));
  }
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <SubBar
        title={"Principales estadísticas del servicio por barrios"}
        crumbs={[
          ["Inicio", "/"],
          ["Servicio", "/"],
          ["Barrios", "/barrios_dashboard"],
        ]}
        info={{
          title: "Inicio",
          description: "",
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
            gridColumn={"span 1"}
            gridRow={"span 6"}
            backgroundColor={colors.gray[900]}
            display={"flex"}
            alignItems={"center"}
            justifyContent={"center"}
            flexDirection={"column"}
          >
            {barrios.length > 0 ? (
              <>
                {barrios.map((elemento, index) => (
                  <ButtonBarriosDashboard key={index} onClickFunction={updateDataBarriosSelected}>
                    {elemento}
                  </ButtonBarriosDashboard>
                ))}
              </>
            ):(
              <>
                <Typography variant={"h3"} color={colors.gray[100]}>
                  Loading...
                </Typography>
              </>
            )}
          </Box>
          <Box
            gridColumn={"span 3"}
            gridRow={"span 3"}
            backgroundColor={colors.gray[900]}
            display={"grid"}
            gridTemplateColumns={"repeat(1,1fr)"}
            gridTemplateRows={"repeat(4, 1fr)"}
            padding={"10px 5px 10px 20px"}
          >
            {/* Datos relevantes (barrio selecionada, total de sumatorío de interacciones, genero de las personas) */}
            <Typography
              variant={"h3"} 
              color={colors.gray[100]}
              gridRow={"span 1"}
              display={"flex"}
              alignItems={"center"}
              justifyContent={"center"}
            >
              <strong>DATOS RELEVANTES</strong>
            </Typography>
            <Typography
              variant={"h5"}
              color={colors.gray[100]}
              gridRow={"span 1"}
            >
              <FamilyRestroomIcon fontSize={"large"} sx={{ mr: "15px" }} />
              Barrio Seleccionado:<strong>{dataBarrioSelected.length > 0 ? (
                dataBarrioSelected[0].barrio
              ) :(
                "Loading..."
              )
              }</strong>
            </Typography>
            <Typography
              variant={"h5"}
              color={colors.gray[100]}
              gridRow={"span 1"}
            >
              <CallIcon fontSize={"large"} sx={{ mr: "15px" }} />
              Total de Interacciones: <strong>{dataBarrioSelected.length > 0 ? (
                dataBarrioSelected[0].sumatorio_interaciones
              ) :(
                "Loading..."
              )
              }</strong>
            </Typography>
            <Typography
                  variant={"h5"}
                  color={colors.gray[100]}
                  gridRow={"span 1"}
                  display={"grid"}
                  gridTemplateColumns={"repeat(2,1fr)"}
                  gridTemplateRows={"repeat(4, 1fr)"}
                >
                  <Box
                    gridColumn={"span 2"} 
                    gridRow={"span 1"}  
                    display="flex"
                  >
                    <WcIcon 
                      fontSize={"large"}
                      sx={{ mr: "15px" }}
                    />
                    <Typography
                      variant={"h5"}
                    > 
                      Número de usuarios totales: <strong>{dataBarrioSelected.length > 0 ? (
                        dataBarrioSelected[0].num_total_usuarios
                      ) :(
                        "Loading..."
                      )
                      }</strong>
                    </Typography>
                  </Box>
                  <Typography
                    gridColumn={"1"} 
                    gridRow={"2"}
                    variant={"h5"}
                    sx={{ ml: "75px" }}
                  > 
                    Mujeres: <strong>{dataBarrioSelected.length > 0 ? (
                        dataBarrioSelected[0].num_total_usuarios_femeninos
                      ) :(
                        "Loading..."
                      )
                      }</strong>
                  </Typography>
                  <Typography
                    gridColumn={"1"} 
                    gridRow={"3"} 
                    variant={"h5"}
                    sx={{ ml: "75px" }}
                  > 
                    Hombres: <strong>{dataBarrioSelected.length > 0 ? (
                        dataBarrioSelected[0].num_total_usuarios_masculinos
                      ) :(
                        "Loading..."
                      )
                      }</strong>
                  </Typography>
                </Typography>
          </Box>
          {/* Gráfico de tipo de atención */}
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
            {dataBarrioSelected.length > 0 ? (
              <>
                <Typography variant={"h3"} color={colors.gray[100]}>
                  <strong>Tipo de Atención</strong>
                </Typography>
                <BarChartBarrios1 data={dataBarrioSelected[0].grafico_tipo_atencion}/>
              </>

            ) : (
              <Typography variant={"h5"} color={colors.gray[100]}>
                Loading...
              </Typography>
            )}
          </Box>
          <Box
            gridColumn={"span 5"}
            gridRow={"span 3"}
            backgroundColor={colors.gray[900]}
            display={"flex"}
            alignItems={"center"}
            justifyContent={"center"}
            flexDirection={"column"}
          >
            <Typography variant={"h3"} color={colors.gray[100]}>
              Cuandos se pulse todos gráfico de motivo de a consulta por barrios
            </Typography>
          </Box>
          <Box
            gridColumn={"span 3"}
            gridRow={"span 3"}
            backgroundColor={colors.gray[900]}
            display={"flex"}
            alignItems={"center"}
            justifyContent={"center"}
            flexDirection={"column"}
          >
            <Typography variant={"h3"} color={colors.gray[100]}>
              Gráfico de como nos han conocido
            </Typography>
          </Box>
          <Box
            gridColumn={"span 3"}
            gridRow={"span 3"}
            backgroundColor={colors.gray[900]}
            display={"flex"}
            alignItems={"center"}
            justifyContent={"center"}
            flexDirection={"column"}
          >
            <Typography variant={"h3"} color={colors.gray[100]}>
            Gráfico motivo de la consulta
            </Typography>
          </Box>
          <Box
            gridColumn={"span 5"}
            gridRow={"span 3"}
            backgroundColor={colors.gray[900]}
            display={"flex"}
            alignItems={"center"}
            justifyContent={"center"}
            flexDirection={"column"}
          >
            <Typography variant={"h3"} color={colors.gray[100]}>
              Cuando se pulse todos gráfico de usuarios por barrios
            </Typography>
          </Box>
        </Box>
      </Box>
    </motion.div>
  );
}

export default BarriosDashboard;
