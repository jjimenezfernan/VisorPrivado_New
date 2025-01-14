import { useState, useEffect } from "react";
import { Box, Typography, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import SubUpBar from "../global/SubUpBar";
import BarChartBarrios1 from "../../components/BarChartBarrios1";
import BarChartBarrios2 from "../../components/BarChartBarrios2";
import BarChartBarrios3 from "../../components/BarChartBarrios3";
import BarChartBarriosGlobal from "../../components/BarChartBarriosGlobal";
import axios from "axios";
import { motion } from "framer-motion";
import FamilyRestroomIcon from "@mui/icons-material/FamilyRestroom";
import CallIcon from "@mui/icons-material/Call";
import WcIcon from '@mui/icons-material/Wc';
import {DIRECTION} from "../../data/direccion_server";
import ButtonBarriosDashboard from "../../components/ButtonBarriosDashboard";
import PieChartBarrios from "../../components/PieChartBarrios";

const baseURL = DIRECTION + "/api/barrios_dashboard";

function BarriosDashboard() {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [globalData, setGlobalData] = useState([]);
  const [barrios, setbarrios] = useState([]);
  const [barrioSelected, setBarrioSelected] = useState("");
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

  // useEffect se ejecuta solo 1 vez al principio del programa, sirve para inicializar el valor de dataBarrioSelected y barrioSelected
  useEffect(() => {
    setDataBarrioSelected(globalData.filter( (item) => item.barrio === "Todos los Barrios"));
    setBarrioSelected("Todos los Barrios");
  }, [globalData]);

  function updateDataBarriosSelected(barrioSelected){
    console.log("Barrio seleccionado: ", barrioSelected);
    // Filtramos los datos para mostrar solo los del barrio seleccionado
    setDataBarrioSelected(globalData.filter( (item) => item.barrio === barrioSelected));
    setBarrioSelected(barrioSelected);
  }
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <SubUpBar
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
            gridTemplateRows={`repeat(${barrioSelected === "Todos los Barrios" ? 4 : 6}, 1fr)`}
            padding={"10px 5px 10px 20px"}
          >
            {/* Datos relevantes */}
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
                Barrio Seleccionado:
                <strong>
                  {dataBarrioSelected.length > 0 ? (
                      barrioSelected
                    ) :(
                      "Loading..."
                    )
                  }
                </strong>
            </Typography>
            <Typography
              variant={"h5"}
              color={colors.gray[100]}
              gridRow={"span 1"}
            >
              <CallIcon fontSize={"large"} sx={{ mr: "15px" }} />
              Total de Interacciones: 
              <strong>
                {dataBarrioSelected.length > 0 ? (
                    dataBarrioSelected[0].sumatorio_interaciones
                  ) :(
                    "Loading..."
                  )
                }
              </strong>
            </Typography>
            
            <Typography
              variant={"h5"}
              color={colors.gray[100]}
              gridRow={"span 1"}
            >
              <WcIcon fontSize={"large"} sx={{ mr: "15px" }} />
                Número de usuarios totales: 
                <strong>
                  {dataBarrioSelected.length > 0 ? (
                      dataBarrioSelected[0].num_total_usuarios
                    ) :(
                      "Loading..."
                    )
                  }
                </strong>
              {
                  barrioSelected === "Todos los Barrios" ? (
                    <>
                      <Typography
                        gridColumn={"1"} 
                        gridRow={"2"}
                        variant={"h5"}
                        sx={{ 
                          ml: "70px",
                        }}
                      > 
                        Mujeres: 
                        <strong>
                          {dataBarrioSelected.length > 0 ? (
                              dataBarrioSelected[0].procentaje_total_usuarios_femeninos + "%"
                            ) :(
                              "Loading..."
                            )
                          }
                        </strong>
                      </Typography>
                      <Typography
                        gridColumn={"1"} 
                        gridRow={"3"} 
                        variant={"h5"}
                        sx={{ 
                          ml: "70px",
                        }}
                      > 
                        Hombres: 
                        <strong>
                          {dataBarrioSelected.length > 0 ? (
                              dataBarrioSelected[0].procentaje_total_usuarios_masculinos + "%"
                            ) :(
                              "Loading..."
                            )
                          }
                        </strong>
                      </Typography>
                    </>
                  ) : (
                    ""
                  )
                }
              </Typography>

              {
                barrioSelected != "Todos los Barrios" ? (
                  <>
                    <Typography
                      variant={"h5"}
                      color={colors.gray[100]}
                      gridRow={"span 1"}
                    >
                      <CallIcon fontSize={"large"} sx={{ mr: "15px" }} />
                      Expedientes sobre Total: 
                      <strong>
                        {dataBarrioSelected.length > 0 ? (
                            dataBarrioSelected[0].procentaje_expedientes_sobre_total + "%"
                          ) :(
                            "Loading..."
                          )
                        }
                      </strong>
                    </Typography>
                    <Typography
                      variant={"h5"}
                      color={colors.gray[100]}
                      gridRow={"span 1"}
                    >
                      <CallIcon fontSize={"large"} sx={{ mr: "15px" }} />
                      Personas Sensibilizadas en el Barrio: 
                      <strong>
                        {dataBarrioSelected.length > 0 ? (
                            dataBarrioSelected[0].procentaje_personas_sensibilizadas_barrio + "%"
                          ) :(
                            "Loading..."
                          )
                        }
                      </strong>
                    </Typography>
                  </>

                ) : (
                  ""
                )
              }  
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
          {/* Gráfico de usuarios por barrios o genero de usuarios*/}
          <Box
            gridColumn={"span 5"}
            gridRow={"span 3"}
            backgroundColor={colors.gray[900]}
            display={"flex"}
            alignItems={"center"}
            justifyContent={"center"}
            padding={"10px 5px 10px 5px"}
            flexDirection={"column"}
          >
            {dataBarrioSelected.length > 0 ? (
              barrioSelected === "Todos los Barrios" ? (
                <>
                  <Typography variant={"h3"} color={colors.gray[100]}>
                    <strong>Usuarios Por Barrios</strong>
                  </Typography>
                  <BarChartBarriosGlobal data={dataBarrioSelected[0].gráfico_usuarios_por_barrio}/>
                </>
              ) : (
                <>
                  <Typography variant={"h3"} color={colors.gray[100]}>
                    <strong>Género Usuarios</strong>
                  </Typography>
                  <PieChartBarrios data={dataBarrioSelected[0].grafico_genero_usuarios}/>
                </>
              )
            ) : (
              <Typography variant={"h5"} color={colors.gray[100]}>
                Loading...
              </Typography>
            )}
          </Box>
          {/* Gráfico de como nos han conocido */}
          <Box
            gridColumn={"span 6"}
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
                  <strong>Como nos han conocido</strong>
                </Typography>
                <BarChartBarrios2 data={dataBarrioSelected[0].grafico_como_nos_has_conocido}/>
              </>

            ) : (
              <Typography variant={"h5"} color={colors.gray[100]}>
                Loading...
              </Typography>
            )}
          </Box>
          {/* Gráfico de motivo de la consulta */}
          <Box
            gridColumn={"span 5"}
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
                  <strong>Motivo de la consulta</strong>
                </Typography>
                <BarChartBarrios3 data={dataBarrioSelected[0].grafico_motivo_de_la_consulta}/>
              </>

            ) : (
              <Typography variant={"h5"} color={colors.gray[100]}>
                Loading...
              </Typography>
            )}
          </Box>
        </Box>
      </Box>
    </motion.div>
  );
}

export default BarriosDashboard;
