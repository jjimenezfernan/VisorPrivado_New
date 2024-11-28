import React, { useState } from "react";
import {
  Box,
  useTheme,
  Typography,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { tokens } from "../../theme";
import DynamicBreadcrumbs from "../../components/DynamicBreadCrumbs";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";

function SubBar({ title, crumbs, info }) {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  // const [open, setOpen] = useState(false);

  // Para saber mas info sobre la pestaña
  // const handleClickOpen = () => {
  //   setOpen(true);
  // };

  // const handleClose = () => {
  //   setOpen(false);
  // };

  return (
    <Box
      display="flex"
      p={1}
      height={"auto"} // Ajustado para que la altura sea automática según el contenido
      sx={{
        borderBottom: 1,
        borderColor: '#f43c51',//colors.redAccent[800],
        backgroundColor: '#f43c51', //colors.redAccent[800],
      }}
    >
      {/* Sección de título e información */}
      <Box display="flex" flex={1} alignItems={"center"} justifyContent={"flex-start"}>
        <Box display="flex" flexDirection={"row"} alignItems={"center"}>
          <Typography
            variant="h4"
            fontStyle={"bold"}
            fontFamily={"rubik"}
            fontWeight={800}
            pl={"10px"}
            sx={{ color: colors.gray[900], marginRight: "10px" }}
          >
            {title}
          </Typography>
          {/* Para el icono al lado del titulo de la pestaña */}
          {/* {info.title !== "Inicio" && ( 
            <InfoOutlinedIcon
              onClick={handleClickOpen}
              style={{ cursor: "pointer" , color: colors.gray[900]}}
            />
          )} */}
        </Box>

        {/* Dialog con información adicional */}
        {/* <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            {info.title}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              {info.description}
            </DialogContentText>
          </DialogContent>
        </Dialog> */}
      </Box>
      <Box display="flex" flex={1} alignItems={"center"} justifyContent={"flex-end"} >
        <Typography
            variant="h4"
            fontStyle={"bold"}
            fontFamily={"rubik"}
            fontWeight={300}
            pl={"10px"}
            sx={{ color: colors.gray[900], marginRight: "10px" }}
          >
            {/* {"Actualizado: XX/XX/XXXX - XX:XXh"} */}
            <DynamicBreadcrumbs crumbs={crumbs} />
          </Typography>
      </Box>
    </Box>
  );
}

export default SubBar;
