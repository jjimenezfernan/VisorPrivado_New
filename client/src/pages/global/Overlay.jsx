// Componente que se muestra al cargar la página, con información sobre la aplicación y la empresa

import React from "react";
import { Button, Typography, Box, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import ZoomOutIcon from "@mui/icons-material/ZoomOut";
import emsv_color_imagen_institucional from "../../assets/emsv_color_imagen_institucional.png";

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
            color={colors.gray[200]}
            fontWeight={400}
            paddingBottom={"1rem"}
            borderBottom={`1px solid ${colors.gray[800]}`}
          >
            EMSV Visor Interno
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
            <br />
            Bienvenido al visor interno de la Empresa Municipal del Suelo y la Vivienda de Getafe.
          </Typography>
          <Box
            display={"flex"}
            alignItems={"center"}
            justifyContent={"space-between"}
            paddingTop={"1.5rem"}
          >
            <img
              src={emsv_color_imagen_institucional}
              alt="Empresa municipal del suelo y la vivienda de Getafe"
              height={"40px"}
            />
          </Box>
        </Box>
      </Box>
      <Box
        position={"absolute"}
        bottom={0}
        left={0}
        height={"7rem"}
        width={"100%"}
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
