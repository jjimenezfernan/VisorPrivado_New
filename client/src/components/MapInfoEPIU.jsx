import React, { useEffect, useRef, useState } from "react";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { Box, Typography, useTheme } from "@mui/material";
import { alpha } from "@mui/system";
import { tokens } from "../theme";
import { useMapEPIUContext } from "./MapEPIUProvider";
import { styled } from "@mui/material/styles";
import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosSharp";
import MuiAccordion from "@mui/material/Accordion";
import MuiAccordionSummary from "@mui/material/AccordionSummary";
import MuiAccordionDetails from "@mui/material/AccordionDetails";

// Classes used by Leaflet to position controls
const POSITION_CLASSES = {
  bottomleft: "leaflet-bottom leaflet-left",
  bottomright: "leaflet-bottom leaflet-right",
  topleft: "leaflet-top leaflet-left",
  topright: "leaflet-top leaflet-right",
};
function MapInfo2({ position, info }) {
  // check if info is empty
  // if (!info || Object.keys(info).length === 0) {
  //   return <div></div>; // Return an empty div
  // }

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  //   const map = useMap();
  const divRef = useRef(null); //to ref the div element containing the control
  const { selection, updateSelection } = useMapEPIUContext();

  useEffect(() => {
    //disable clicking and scrolling of the map on the control
    L.DomEvent.disableClickPropagation(divRef.current);
    L.DomEvent.disableScrollPropagation(divRef.current);
  });

  const positionClass =
    (position && POSITION_CLASSES[position]) || POSITION_CLASSES.topright;

  const keysPanel1 = [
    "reference",
    "currentUse",
    "numberOfDw",
    "ano_constr",
    "tipo_viv",
    "Building_Getafe_Barrio",
  ];

  const keysPanel2 = [
    "Building_Getafe_n exptes",
    "Building_Getafe_porc viv OHS",
  ];

  const keysPanel3 = [
    "Building_Getafe_porc retraso pago facturas",
    "Building_Getafe_disconfort inv",
    "Building_Getafe_disconfort ver",
    "Building_Getafe_porc alquiler",
    "Building_Getafe_porc prop sin hipoteca",
    "Building_Getafe_porc prop con hipoteca",
    // "Building_Getafe_porc renta antigua",
    // "Building_Getafe_porc cesion",
  ];

  const keysPanel4 = [
    "Building_Getafe_porc no calefaccion",
    "Building_Getafe_porc no refrigeracion",
    "Building_Getafe_porc patologias exptes",
    "Building_Getafe_cert emision CO2",
    "Building_Getafe_cert consumo e primaria",
    "Building_Getafe_prod fotovol",
    "Building_Getafe_irradiacion anual kwh/m2",
  ];

  const infoFiltered = Object.fromEntries(
    Object.entries(info).filter(
      ([key]) => key !== "CUSEC" && key !== "value" && key !== "value_uom"
    )
  );

  // console.log(info);

  const infoPanel1 = Object.entries(infoFiltered).filter(([key]) =>
    keysPanel1.includes(key)
  );

  const infoPanel2 = Object.entries(infoFiltered).filter(([key]) =>
    keysPanel2.includes(key)
  );

  const infoPanel3 = Object.entries(infoFiltered).filter(([key]) =>
    keysPanel3.includes(key)
  );

  const infoPanel4 = Object.entries(infoFiltered).filter(([key]) =>
    keysPanel4.includes(key)
  );

  // console.log(infoPanel1);

  const Accordion = styled((props) => (
    <MuiAccordion disableGutters elevation={0} square {...props} />
  ))(({ theme }) => ({
    width: "15vw",
    border: `1px solid ${theme.palette.divider}`,
    "&:not(:last-child)": {
      borderBottom: 0,
    },
    "&:before": {
      display: "none",
    },
  }));

  const AccordionSummary = styled((props) => (
    <MuiAccordionSummary
      expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: "0.9rem" }} />}
      {...props}
    />
  ))(({ theme }) => ({
    backgroundColor: colors.primary[200],
    flexDirection: "row-reverse",
    "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
      transform: "rotate(90deg)",
    },
    "& .MuiAccordionSummary-content": {
      marginLeft: theme.spacing(1),
    },
  }));

  const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
    padding: theme.spacing(2),
    borderTop: "1px solid rgba(0, 0, 0, .125)",
  }));

  const [expanded, setExpanded] = useState("panel1");

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

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
          p={"10px"}
        >
          {/* <Typography
            variant="h5"
            fontWeight={600}
            sx={{
              color: colors.gray[200],
              wordWrap: "normal",
              marginBottom: "3px",
            }}
          >
            Indicadores
          </Typography> */}
          {/* {infoFiltered.map(([key, value]) => (
            <Typography key={key} variant="h7" sx={{ color: colors.gray[200] }}>
              {value === "#DIV/0!" ||
              value === null ||
              value === undefined ? null : (
                <span>
                  {key}: <strong>{value}</strong>
                </span>
              )}
            </Typography>
          ))} */}

          <Accordion
            expanded={expanded === "panel1"}
            onChange={handleChange("panel1")}
          >
            <AccordionSummary
              aria-controls="panel1d-content"
              id="panel1d-header"
            >
              <Typography>Datos catastrales</Typography>
            </AccordionSummary>
            <AccordionDetails>
              {infoPanel1.map(([key, value]) => (
                <Typography key={key} sx={{ color: colors.gray[200] }}>
                  {value === "#DIV/0!" ||
                  value === null ||
                  value === undefined ? null : (
                    <span>
                      {key}: <strong>{value}</strong>
                    </span>
                  )}
                </Typography>
              ))}
            </AccordionDetails>
          </Accordion>
          <Accordion
            expanded={expanded === "panel2"}
            onChange={handleChange("panel2")}
          >
            <AccordionSummary
              aria-controls="panel2d-content"
              id="panel2d-header"
            >
              <Typography>Datos EPIU</Typography>
            </AccordionSummary>
            <AccordionDetails>
              {infoPanel2.map(([key, value]) => (
                <Typography key={key} sx={{ color: colors.gray[200] }}>
                  {value === "#DIV/0!" ||
                  value === null ||
                  value === undefined ? null : (
                    <span>
                      {key}: <strong>{value}</strong>
                    </span>
                  )}
                </Typography>
              ))}
            </AccordionDetails>
          </Accordion>
          <Accordion
            expanded={expanded === "panel3"}
            onChange={handleChange("panel3")}
          >
            <AccordionSummary
              aria-controls="panel3d-content"
              id="panel3d-header"
            >
              <Typography>Características población</Typography>
            </AccordionSummary>
            <AccordionDetails>
              {infoPanel3.map(([key, value]) => (
                <Typography key={key} sx={{ color: colors.gray[200] }}>
                  {value === "#DIV/0!" ||
                  value === null ||
                  value === undefined ? null : (
                    <span>
                      {key}: <strong>{value}</strong>
                    </span>
                  )}
                </Typography>
              ))}
            </AccordionDetails>
          </Accordion>
          <Accordion
            expanded={expanded === "panel4"}
            onChange={handleChange("panel4")}
          >
            <AccordionSummary
              aria-controls="panel4d-content"
              id="panel4d-header"
            >
              <Typography>Características de la vivienda</Typography>
            </AccordionSummary>
            <AccordionDetails>
              {infoPanel4.map(([key, value]) => (
                <Typography key={key} sx={{ color: colors.gray[200] }}>
                  {value === "#DIV/0!" ||
                  value === null ||
                  value === undefined ? null : (
                    <span>
                      {key}: <strong>{value}</strong>
                    </span>
                  )}
                </Typography>
              ))}
            </AccordionDetails>
          </Accordion>
        </Box>
      </Box>
    </Box>
  );
}

export default MapInfo2;
