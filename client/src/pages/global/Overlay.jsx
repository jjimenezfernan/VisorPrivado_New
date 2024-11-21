import React from "react";
import { Button, Typography, Box, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import logoOhsText from "../../assets/logo_ohs_text.png";
import logoAyunt from "../../assets/logo_ayunt.png";
import logoEuro from "../../assets/logo_euro.png";
import logoUrban from "../../assets/logo_urban.png";
import ZoomOutIcon from "@mui/icons-material/ZoomOut";

function Overlay({ closeOverlay }) {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <Box
      onClick={closeOverlay}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        backgroundColor: colors.primary[200],
        zIndex: 999,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <Button
        onClick={closeOverlay}
        style={{
          position: "absolute",
          top: 20,
          right: 20,
          height: "5rem",
          width: "5rem",
        }}
      >
        <Typography align="center" fontSize={"7rem"} color={colors.gray[200]}>
          ×
        </Typography>
      </Button>
      <Box display={"flex"} alignItems={"center"} justifyContent={"center"}>
        <Box width={"42rem"}>
          <Typography
            variant="h1"
            align="center"
            // letterSpacing={"0.05rem"}
            color={colors.gray[200]}
            fontWeight={400}
            paddingBottom={"1rem"}
            borderBottom={`1px solid ${colors.gray[800]}`}
          >
            OBSERVATORIO DE DATOS EPIU GETAFE
          </Typography>
          <Typography
            variant="h5"
            align="justify"
            paddingTop={"1rem"}
            width={"auto"}
            margin={"auto"}
            color={colors.gray[200]}
            paddingBottom={"1rem"}
          >
            Este observatorio forma parte de la actividad de Seguimiento y
            Evaluación del proyecto EPIU (Energy Poverty Intelligence Unit) para
            el municipio de Getafe. Se trata de un proyecto cofinanciado por el
            programa europeo UIA que tiene como objetivo el desarrollo de
            soluciones urbanas innovadoras en las ciudades.
            <br />
            <br />
            El reto ha consistido en el diseño de un visor analítico y
            cartográfico capaz de facilitar el seguimiento de los objetivos del
            proyecto y de generar nuevas cartografías mediante el análisis de
            grandes volúmenes de datos procedentes de diferentes fuentes de
            información.
            <br />
            <br />
            La herramienta espacial desarrollada para el observatorio, en línea
            con el objetivo innovador del programa, explora nuevas formas de
            representación en diferentes escalas que facilitan el análisis
            estratégico (a escala de sección censal y de barrio) y el
            seguimiento operativo (a escala de catastro) en un mismo visor.
          </Typography>
          <Box
            // backgroundColor={colors.gray[800]}
            display={"flex"}
            alignItems={"center"}
            justifyContent={"space-between"}
            paddingTop={"1.5rem"}
          >
            <img
              src={logoOhsText}
              alt="Oficina de Hogares Saludables (OHS)"
              height={"60px"}
            />
            <img src={logoAyunt} alt="Ayuntamiento de Getafe" height={"60px"} />
            <img src={logoEuro} alt="UIA" height={"60px"} />
            <img src={logoUrban} alt="Urban Poverty" height={"60px"} />
          </Box>
        </Box>
      </Box>
      <Box
        position={"absolute"}
        bottom={0}
        left={0}
        height={"7rem"}
        width={"100%"}
        // backgroundColor={colors.gray[800]}
        display={"flex"}
        flexDirection={"column"}
        alignItems={"flex-start"}
        justifyContent={"flex-end"}
        padding={"1rem"}
      >
        <Typography fontSize={"0.78rem"} align="left" color={colors.gray[500]}>
          Para su visualización óptima le recomendamos:
          <br />
          <strong>En portátiles:</strong> Reducir el zoom del navegador al{" "}
          <strong>80%</strong> <ZoomOutIcon />
          <br />
          <strong>En monitores:</strong> No es necesario realizar ningún ajuste
          de zoom.
        </Typography>
      </Box>
    </Box>
  );
}

export default Overlay;
