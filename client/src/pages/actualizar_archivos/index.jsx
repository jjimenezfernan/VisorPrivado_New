/**
 * Pagina para la subida y actualización de archivos
 */

import { useState } from "react";
import { Box, Typography, useTheme, Button, Stack, TextField } from "@mui/material";
import axios from "axios";
import { tokens } from "../../theme";
import FileUploadIcon from '@mui/icons-material/FileUpload';
import { motion } from "framer-motion";
import SubBar from "../global/SubBar";

import {DIRECTION} from "../../data/direccion_server";

const baseURL = DIRECTION + "/api/upload";

function ActualizarArchivos() {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [selectedFile, setSelectedFile] = useState(null);

  // Para manejar la subida del archivo
  const handleUpload = async () => {
    if (!selectedFile) {
      alert('Por favor, selecciona un archivo primero.');
      return;
    }

    // Crear un objeto FormData para enviar el archivo
    const formData = new FormData();
    formData.append('file', selectedFile);

    try {
      const response = await axios.post(baseURL, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      alert('Archivo subido con éxito: ' + response.data.fileName);

    } catch (error) {
      if (error.response) {
        const { type, message } = error.response.data;
        if (type === 1001) {
          alert('Error: ' + message + ' Tipo: ' + type); // Error relacionado con el nombre
        } 
        else if (type === 1002) {
          alert('Error: ' + message + ' Tipo: ' + type); // Error relacionado con la extensión
        } 
        else {
          alert('Error desconocido: ' + message);
        }
      } 
      else {
        console.error('Error en la solicitud:', error);
        alert('Error en el servidor.');
      }
    }
  }

  // Para manejar el cambio de archivo seleccionado
  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <SubBar
        title={"Actualizar Archivos"}
        crumbs={[
          ["Inicio", "/"],
          ["Actualizar Archivos", "/actualizar-archivos"],
        ]}
        info={{
          title: "Actualizar Archivos",
          description: (
            <Typography variant="h5" sx={{ color: colors.gray[400] }}>
              <p>Description</p>
            </Typography>
          ),
        }}
      />

      <Box 
        backgroundColor={colors.gray[900]}
        margin={'20px'}
        padding={'20px'}
        borderRadius={4}
      >
          <Typography variant="h4" sx={{ color: colors.gray[400], textAlign: 'justify', }} >
            <p>Para cargar los archivos correctamente, primero es necesario descargarlos desde la pestaña "Descargas" y 
              revisar cuidadosamente su estructura. Esto se debe a que, para garantizar un procesamiento adecuado de los datos, 
              los archivos deben conservar el formato original. Únicamente se permite realizar cambios o adiciones en los datos 
              según lo indicado para cada tipo de archivo. A continuación, se detallan los nombres, características y 
              las posibles modificaciones de los archivos que se pueden cargar:</p>

            <p><strong>Archivos Excel:</strong></p>
            <ul>
              <li><strong>data_dashboard.xlsx:</strong> Archivo utilizado por la pantalla de inicio. 
              En este archivo, se pueden modificar datos en todas las pestañas del Excel y
              únicamente se pueden añadir datos en la pestaña de "gráfico de evolución".</li>
              <li><strong>data_dashboard_por_barrio.xlsx:</strong> Archivo utilizado por la pantalla "Servicios Estadísticas Barrios". 
              En este archivo, se pueden modificar y añadir datos libremente.</li>
              <li><strong>data_derivacion.xlsx:</strong> Archivo utilizado para la pantalla "Servicios Derivación". 
              Se pueden modificar datos, pero solo es posible añadir datos en la pestaña "sankey" del Excel.</li>
              <li><strong>data_awareness.xlsx:</strong> Archivo utilizado para la pantalla "Servicios Concienciación". 
              En este archivo, se pueden modificar datos y añadir nuevos datos únicamente en la pestaña "principal".</li>
            </ul>

            <p><strong>Archivos GeoJSON:</strong> Archivos utilizados para los mapas. 
            En estos, únicamente se pueden modificar los atributos de cada polígono:</p>
            <ul>
              <li><strong>barrio.geojson:</strong> Archivo utilizado para la pantalla "Visor Barrio".</li>
              <li><strong>sscc.geojson:</strong> Archivo utilizado para la pantalla "Visor Sección Censal".</li>
              <li><strong>building_parcelas.geojson:</strong> Archivo utilizado para la pantalla "Visor Parcelas". 
              Contiene la información de todos los edificios.</li>
              <li><strong>limites_parcelas.geojson:</strong> Archivo utilizado para la pantalla "Visor Parcelas". 
              Contiene los límites de Getafe.</li>
            </ul>
          </Typography>
      </Box>
      <Box 
        m="10px"
        display={"flex"}
        alignItems={"center"}
        justifyContent={"center"}
        flexDirection={"column"}
        backgroundColor={'#00000'}
        height={'30vh'}
      >
        <Box
          backgroundColor={colors.gray[900]}
          display={"flex"}
          alignItems={"center"}
          justifyContent={"center"}
          flexDirection={"column"}
          gap={"10px"}
          height={'20vh'}
          width={'20vw'}
          borderRadius={4}
        >
          <Stack spacing={2} >
            <TextField 
              type="file"
              variant="outlined"
              fullWidth
              onChange={handleFileChange}
              InputLabelProps={{ shrink: true }}
            />
            <Button 
              variant="contained"
              color="success"
              endIcon={<FileUploadIcon />}
              onClick={handleUpload}
            >
              Upload
            </Button>
          </Stack>
        </Box>
      </Box>
    </motion.div>
  );
}

export default ActualizarArchivos;
