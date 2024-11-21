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

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Box
      display="flex"
      flexDirection={"row"}
      justifyContent="space-between"
      p={1}
      height={"40px"}
      sx={{
        borderBottom: 1,
        borderColor: colors.blueAccent[800],
        backgroundColor: colors.blueAccent[900],
      }}
    >
      <Box
        display="flex"
        flex={1}
        alignItems={"center"}
        justifyContent={"flex-start"}
      >
        <Box display="flex" flexDirection={"row"} alignItems={"center"}>
          <Typography
            variant="h4"
            fontWeight={600}
            pl={"10px"}
            sx={{ color: colors.gray[200], marginRight: "10px" }}
          >
            {title}
          </Typography>
          {info.title !== "Inicio" && (
            <InfoOutlinedIcon
              onClick={handleClickOpen}
              style={{ cursor: "pointer" }}
            />
          )}
        </Box>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            {/* <Typography
              variant="h3"
              fontWeight={600}
              sx={{ color: colors.gray[200] }}
            >
              {info.title}
            </Typography> */}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              {info.description}
            </DialogContentText>
          </DialogContent>
        </Dialog>
      </Box>
      <Box
        display="flex"
        flex={1}
        alignItems={"center"}
        justifyContent={"flex-end"}
      >
        <DynamicBreadcrumbs crumbs={crumbs} />
      </Box>
    </Box>
  );
}

export default SubBar;
