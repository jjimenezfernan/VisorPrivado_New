/**
 * Pagina de descargas de ficheros utilizados en la aplicación
 */

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
      <Box 
        m="10px"
        display={"flex"}
        alignItems={"center"}
        justifyContent={"center"}
        flexDirection={"column"}
        backgroundColor={'#00000'}
        height={'88vh'}
      >
        <Box
          backgroundColor={"#00000"}
          display={"flex"}
          alignItems={"center"}
          justifyContent={"center"}
          flexDirection={"column"}
          gap={"10px"}
        >
          <Stack direction="row" spacing={2} >
            <Button
              onClick={() => handleDownload("dashboard")}
              variant="contained"
              color="success"
              endIcon={<DownloadIcon />}
            >
              Estadísticas Inicio (Excel)
            </Button>
            <Button
              onClick={() => handleDownload("derivacion")}
              variant="contained"
              color="success"
              endIcon={<DownloadIcon />}
            >
              Derivación (Excel)
            </Button>
            <Button
              onClick={() => handleDownload("awareness")}
              variant="contained"
              color="success"
              endIcon={<DownloadIcon />}
            >
              Concienciación (Excel)
            </Button>
            <Button
              onClick={() => handleDownload("dashboard_por_barrio")}
              variant="contained"
              color="success"
              endIcon={<DownloadIcon />}
            >
              Estadisticas Barrios (Excel)
            </Button>
          </Stack>
          <Stack direction="row" spacing={2} >
            <Button
              onClick={() => handleDownload("barrio_geojson")}
              variant="contained"
              color="success"
              endIcon={<DownloadIcon />}
            >
              Visor cartográfico Barrios (Geojson)
            </Button>
            <Button
              onClick={() => handleDownload("sscc_geojson")}
              variant="contained"
              color="success"
              endIcon={<DownloadIcon />}
            >
              Visor cartográfico Secciones Censales (Geojson)
            </Button>
            <Button
              onClick={() => handleDownload("building_parcelas_geojson")}
              variant="contained"
              color="success"
              endIcon={<DownloadIcon />}
            >
              Visor cartográfico Parcelas (Geojson)
            </Button>
            <Button
              onClick={() => handleDownload("limites_parcelas_geojson")}
              variant="contained"
              color="success"
              endIcon={<DownloadIcon />}
            >
              Visor cartográfico Parcelas-Limites (Geojson)
            </Button>
          </Stack>
        </Box>
      </Box>
    </motion.div>
  );
}

export default Descargas;
