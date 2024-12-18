import React, { useEffect, useRef, useState } from "react";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { Box, Typography, useTheme } from "@mui/material";
import { alpha } from "@mui/system";
import { tokens } from "../theme";
import { useMapBarrioContext } from "./MapBarrioProvider";
import {
  Selections as Selections,
  pathToSelect,
} from "../constants/MapConstantsBarrio";

// Classes used by Leaflet to position controls
const POSITION_CLASSES = {
  bottomleft: "leaflet-bottom leaflet-left",
  bottomright: "leaflet-bottom leaflet-right",
  topleft: "leaflet-top leaflet-left",
  topright: "leaflet-top leaflet-right",
};
function MapLegendBarrio({ position, selection }) {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const divRef = useRef(null); //to ref the div element containing the control
  const { selectionValue } = useMapBarrioContext();
  const [legendValues, setLegendValues] = useState([]);
  const [legendGradient, setLegendGradient] = useState([]);

  // Keys that represent percentages
  const percentages = [
    "ac_porc_expedientes",
    "ac_motivo_rehab",
    "ac_motivo_infogeneral",
    "ac_motivo_suminsitros",
    "ac_motivo_comener",
    "ac_origen_ayto",
    "ac_origen_ssss",
    "ac_origen_errp",
    "ac_origen_eventos",
    "ac_origen_conocido",
    "t4_1",
    "t4_3",
    "t31_2dm",
    "t31_3dt",
    "t22_1_porc",
  ];

  useEffect(() => {
    //disable clicking and scrolling of the map on the control
    L.DomEvent.disableClickPropagation(divRef.current);
    L.DomEvent.disableScrollPropagation(divRef.current);

    if (selection) {
      setLegendGradient(Selections[pathToSelect(selection)].legend.gradient);
      setLegendValues(Selections[pathToSelect(selection)].legend.values);
    } else {
      setLegendGradient([]);
      setLegendValues([]);
    }
  });

  const positionClass =
    (position && POSITION_CLASSES[position]) || POSITION_CLASSES.topright;

  //add value to prev
  function addOneUnit(prev, value) {
    let result = parseFloat(prev) + parseFloat(value);
    if (result % 1 !== 0) {
      // If it has decimals, round it to two decimal places
      return parseFloat(result.toFixed(2));
    } else {
      // If it's an integer, return it as is
      return result;
    }
  }

  function renderLegendGeneric(values, gradient, lastItem) {
    const legendItems = gradient.map((value, index) => (
      <Box
        key={index}
        display="flex"
        alignItems="center"
        p={1}
        sx={{ "&:not(:last-child)": { marginBottom: -2 } }}
      >
        <Box width={16} height={16} marginRight={1} backgroundColor={value} />
        {/* if it's the first, render +N */}
        {/* if it's the rest, render in values in pairs, subtracting 1 from the first value */}
        <Typography variant="body1">
          {index === 0
            ? "+ " + values[index]
            : values[index - 1] + " - " + addOneUnit(values[index], 1)}
        </Typography>
      </Box>
    ));

    // Add the last gray item with a value of 0
    legendItems.push(
      <Box key="lastItem" display="flex" alignItems="center" p={1}>
        <Box width={16} height={16} marginRight={1} backgroundColor="#bababa" />
        <Typography variant="body1">{lastItem}</Typography>
      </Box>
    );

    return legendItems;
  }

  function renderLegendAnyoConstru(values, gradient, lastItem) {
    const legendItems = gradient.map((value, index) => (
      <Box
        key={index}
        display="flex"
        alignItems="center"
        p={1}
        sx={{ "&:not(:last-child)": { marginBottom: -2 } }}
      >
        <Box width={16} height={16} marginRight={1} backgroundColor={value} />
        {/* if it's the first, render +N */}
        {/* if it's the rest, render in values in pairs, adding 1 from the second value */}
        <Typography variant="body1">
          {index === 0
            ? "+ " + values[index]
            : values[index - 1] + " - " + addOneUnit(values[index], 1)}
        </Typography>
      </Box>
    ));

    legendItems.pop(); //remove last valid item
    legendItems.push(
      <Box
        key={values.length - 1}
        display="flex"
        alignItems="center"
        p={1}
        sx={{ "&:not(:last-child)": { marginBottom: -2 } }}
      >
        <Box
          width={16}
          height={16}
          marginRight={1}
          backgroundColor={gradient[gradient.length - 1]}
        />
        <Typography variant="body1">
          Anterior a {values[values.length - 2]}
        </Typography>
      </Box>
    );

    // Add the last gray item with a value of 0
    legendItems.push(
      <Box key="lastItem" display="flex" alignItems="center" p={1}>
        <Box width={16} height={16} marginRight={1} backgroundColor="#bababa" />
        <Typography variant="body1">{lastItem}</Typography>
      </Box>
    );

    return legendItems;
  }

  function renderTamanyoMedioHogar(values, gradient, lastItem) {
    const legendItems = gradient.map((value, index) => (
      <Box
        key={index}
        display="flex"
        alignItems="center"
        p={1}
        sx={{ "&:not(:last-child)": { marginBottom: -2 } }}
      >
        <Box width={16} height={16} marginRight={1} backgroundColor={value} />
        {/* if it's the first, render +N */}
        {/* if it's the rest, render in values in pairs, subtracting 1 from the first value */}
        <Typography variant="body1">
          {index === 0
            ? "+ " + values[index]
            : values[index - 1] + " - " + addOneUnit(values[index], 0.01)}
        </Typography>
      </Box>
    ));

    // Add the last gray item with a value of 0
    legendItems.push(
      <Box key="lastItem" display="flex" alignItems="center" p={1}>
        <Box width={16} height={16} marginRight={1} backgroundColor="#bababa" />
        <Typography variant="body1">{lastItem}</Typography>
      </Box>
    );

    return legendItems;
  }

  function renderLegendPercent(values, gradient, lastItem) {
    const legendItems = gradient.map((value, index) => (
      <Box
        key={index}
        display="flex"
        alignItems="center"
        p={1}
        sx={{ "&:not(:last-child)": { marginBottom: -2 } }}
      >
        <Box width={16} height={16} marginRight={1} backgroundColor={value} />
        {/* if it's the first, render +N */}
        {/* if it's the rest, render in values in pairs, subtracting 1 from the first value */}
        <Typography variant="body1">
          {index === 0
            ? "+ " + values[index] + "%"
            : values[index - 1] +
              "%" +
              " - " +
              addOneUnit(values[index], 1) +
              "%"}
        </Typography>
      </Box>
    ));

    // Add the last gray item with a value of 0
    legendItems.push(
      <Box key="lastItem" display="flex" alignItems="center" p={1}>
        <Box width={16} height={16} marginRight={1} backgroundColor="#bababa" />
        <Typography variant="body1">{lastItem}</Typography>
      </Box>
    );

    return legendItems;
  }

  function renderLegend() {
    if (percentages.includes(pathToSelect(selectionValue))) {
      return renderLegendPercent(legendValues, legendGradient, "0% / ND");
    } else if (pathToSelect(selectionValue) === "ano") {
      return renderLegendAnyoConstru(legendValues, legendGradient, "ND");
    } else if (pathToSelect(selectionValue) === "tamaño medio hogar (INE 20)") {
      return renderTamanyoMedioHogar(legendValues, legendGradient, "ND");
    } else {
      return renderLegendGeneric(legendValues, legendGradient, "0 / ND");
    }
  }

  return (
    <Box ref={divRef} className={positionClass}>
      <Box className="leaflet-control leaflet-bar">
        <Box
          height={"auto"}
          maxHeight={"50vh"}
          maxWidth={"20vw"}
          backgroundColor={alpha(colors.primary[100], 0.95)}
          display={"flex"}
          flexDirection={"column"}
          overflow={"auto"}
          py={"5px"}
          px={"10px"}
        >
          <Typography
            variant={"h6"}
            color={colors.blueAccent[400]}
            fontWeight={600}
            ml={"0.45rem"}
          >
            Leyenda
          </Typography>
          {renderLegend(legendValues, legendGradient)}
        </Box>
      </Box>
    </Box>
  );
}

export default MapLegendBarrio;
