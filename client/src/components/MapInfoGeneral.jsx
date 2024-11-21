import React, { useEffect, useRef } from "react";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { Box, Typography, useTheme } from "@mui/material";
import { alpha } from "@mui/system";
import { tokens } from "../theme";

// Classes used by Leaflet to position controls
const POSITION_CLASSES = {
  bottomleft: "leaflet-bottom leaflet-left",
  bottomright: "leaflet-bottom leaflet-right",
  topleft: "leaflet-top leaflet-left",
  topright: "leaflet-top leaflet-right",
};
function MapInfo({ position, info }) {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  //   const map = useMap();
  const divRef = useRef(null); //to ref the div element containing the control

  useEffect(() => {
    //disable clicking and scrolling of the map on the control
    L.DomEvent.disableClickPropagation(divRef.current);
    L.DomEvent.disableScrollPropagation(divRef.current);
  });

  const positionClass =
    (position && POSITION_CLASSES[position]) || POSITION_CLASSES.topright;

  return (
    <Box ref={divRef} className={positionClass}>
      <Box className="leaflet-control leaflet-bar">
        <Box
          height={"auto"}
          maxHeight={"50vh"}
          maxWidth={"20vw"}
          //   backgroundColor={colors.primary[100]}
          backgroundColor={alpha(colors.primary[100], 0.95)}
          display={"flex"}
          flexDirection={"column"}
          overflow={"auto"}
          p={"10px"}

          //   borderRadius={"30px"}
        >
          <Typography variant="h5" sx={{ color: colors.gray[200] }}>
            Ref: <strong>{info.CUSEC}</strong>
          </Typography>
          <Typography variant="h7" sx={{ color: colors.gray[200] }}>
            Nº de expedientes: <strong>{info?.contadorExpe}</strong>
            <br />
            {/* Barrio: <strong>{info.barrio}</strong>
            <br />
            Año de construcción: <strong>{info.anoconstru}</strong>
            <br />
            Calefacción: <strong>{info.calefaccio}</strong>
            <br />
            Confort invierno: <strong>{info.confortinv}</strong>
            <br />
            Confort verano: <strong>{info.confortver}</strong>
            <br />
            Uso actual: <strong>{info.currentUse}</strong>
            <br />
            EPIU: <strong>{info.epiu}</strong>
            <br />
            Número de Bu: <strong>{info.numberOfBu}</strong>
            <br />
            Número de Dw: <strong>{info.numberOfDw}</strong>
            <br />
            Patlogías: <strong>{info.patologias}</strong>
            <br />
            Refrigeración: <strong>{info.refrigerac}</strong>
            <br />
            Valor: <strong>{info.value}</strong> */}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}

export default MapInfo;
