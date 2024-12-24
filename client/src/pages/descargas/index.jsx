import React, { useState, useEffect, useRef } from "react";
import { Box, Typography, useTheme, Button, Stack } from "@mui/material";
import axios from "axios";
import { tokens } from "../../theme";
import DownloadIcon from "@mui/icons-material/Download";
import { motion } from "framer-motion";
import SubBar from "../global/SubBar";

import {DIRECTION} from "../../data/direccion_server";

const baseURL = DIRECTION + "/api/descargas";

function Descargas() {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const handleDownload = (filename) => {
    axios
      .get(`${baseURL}/${filename}`, { responseType: "blob" })
      .then((response) => {
        const url = URL.createObjectURL(response.data);
        const a = document.createElement("a");
        a.href = url;
        a.download = filename; // Use the passed filename
        a.click();
      })
      .catch((error) => {
        console.error(error);
        // Handle error
      });
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <SubBar
        title={"Descargas"}
        crumbs={[
          ["Inicio", "/"],
          ["Descargas", "/descargas"],
        ]}
        info={{
          title: "Descargas",
          description: (
            <Typography variant="h5" sx={{ color: colors.gray[400] }}>
              <p>Description</p>
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
          <Box
            gridColumn={"span 12"}
            gridRow={"span 6"}
            backgroundColor={colors.gray[900]}
            display={"flex"}
            alignItems={"center"}
            justifyContent={"center"}
            flexDirection={"column"}
          >
            <Stack direction="row" spacing={2}>
              <Button
                onClick={() => handleDownload("derivacion")}
                variant="contained"
                color="success"
                endIcon={<DownloadIcon />}
              >
                Derivación
              </Button>
              <Button
                onClick={() => handleDownload("awareness")}
                variant="contained"
                color="success"
                endIcon={<DownloadIcon />}
              >
                Concienciación
              </Button>
              <Button
                onClick={() => handleDownload("dashboard_por_barrio")}
                variant="contained"
                color="success"
                endIcon={<DownloadIcon />}
              >
                Estadisticas Barrios
              </Button>
              <Button
                onClick={() => handleDownload("geojson")}
                variant="contained"
                color="success"
                endIcon={<DownloadIcon />}
                disabled={true}
              >
                Visor cartográfico
              </Button>
            </Stack>
          </Box>
        </Box>
      </Box>
    </motion.div>
  );
}

export default Descargas;
