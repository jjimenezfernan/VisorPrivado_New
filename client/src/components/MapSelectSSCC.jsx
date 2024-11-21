import React, { useEffect, useRef } from "react";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { Box, Typography, useTheme } from "@mui/material";
import { alpha } from "@mui/system";
import { tokens } from "../theme";
import { useMapSSCCContext } from "./MapSSCCProvider";
import { Selections as Selections } from "../constants/MapConstantsSSCC";

import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";

// Classes used by Leaflet to position controls
const POSITION_CLASSES = {
  bottomleft: "leaflet-bottom leaflet-left",
  bottomright: "leaflet-bottom leaflet-right",
  topleft: "leaflet-top leaflet-left",
  topright: "leaflet-top leaflet-right",
};
function MapSelectSSCC({ position }) {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  //   const map = useMap();
  const divRef = useRef(null); //to ref the div element containing the control
  const { selection, updateSelection } = useMapSSCCContext();

  useEffect(() => {
    //disable clicking and scrolling of the map on the control
    L.DomEvent.disableClickPropagation(divRef.current);
    L.DomEvent.disableScrollPropagation(divRef.current);
  });

  const positionClass =
    (position && POSITION_CLASSES[position]) || POSITION_CLASSES.topright;

  const handleChange = (event) => {
    updateSelection(event.target.value);
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
          <FormControl>
            <FormLabel id="demo-controlled-radio-buttons-group">
              <Typography
                variant="h7"
                sx={{ color: colors.gray[200], wordWrap: "normal" }}
              >
                Mapa de colores según:
              </Typography>
            </FormLabel>
            <RadioGroup
              aria-labelledby="demo-controlled-radio-buttons-group"
              name="controlled-radio-buttons-group"
              value={selection}
              onChange={handleChange}
            >
              <FormControlLabel
                value={Selections.nExpendientes.path}
                control={
                  <Radio
                    sx={{
                      color: colors.gray[400],
                      "&.Mui-checked": {
                        color: colors.blueAccent[400],
                      },
                    }}
                    size="small"
                  />
                }
                label={Selections.nExpendientes.label}
              />
              <FormControlLabel
                value={Selections.anyoConstru.path}
                control={
                  <Radio
                    sx={{
                      color: colors.gray[400],
                      "&.Mui-checked": {
                        color: colors.blueAccent[400],
                      },
                    }}
                    size="small"
                  />
                }
                label={Selections.anyoConstru.label}
              />
            </RadioGroup>
          </FormControl>
        </Box>
      </Box>
    </Box>
  );
}

export default MapSelectSSCC;
