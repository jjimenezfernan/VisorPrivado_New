import {
  Box,
  IconButton,
  InputBase,
  useTheme,
  Link,
  Typography,
} from "@mui/material";
import React, { useContext, useState } from "react";
import { ColorModeContext, tokens } from "../../theme";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import StorageRoundedIcon from "@mui/icons-material/StorageRounded";
import ContactSupportRoundedIcon from "@mui/icons-material/ContactSupportRounded";
import { Link as RouterLink } from "react-router-dom";
import logoOhs from "../../assets/logo_ohs.png";
import { useLocation } from "react-router-dom";

function Topbar() {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const colorMode = useContext(ColorModeContext);
  const location = useLocation(); // <-- use the useLocation hook to get the current location

  const [dashColor, setDashColor] = useState(
    location.pathname === "/" ? colors.blueAccent[400] : colors.gray[400]
  );
  const [estadColor, setEstadColor] = useState(
    location.pathname === "/estadisticas"
      ? colors.blueAccent[400]
      : colors.gray[400]
  );

  return (
    <Box
      position="sticky"
      top={0}
      zIndex={1}
      display="flex"
      justifyContent="space-between"
      p={1}
      sx={{
        backgroundColor: colors.primary[100],
        borderBottom: 1,
        borderColor: colors.gray[800],
      }}
    >
      {/* Logo */}
      <Box display="flex" ml={"10px"}>
        <img src={logoOhs} alt="Description of the image" height={"40px"} />
      </Box>
      {/* Links */}
      <Box display="flex" alignItems={"center"}>
        <Link
          component={RouterLink}
          to="/"
          underline="none"
          color={dashColor}
          variant="h4"
          m={"0 40px"}
          sx={{ ":hover": { color: colors.blueAccent[400] } }}
          onClick={() => {
            setDashColor(colors.blueAccent[400]);
            setEstadColor(colors.gray[400]);
          }}
        >
          {"DASHBOARD OPERATIVO"}
        </Link>
        <Link
          component={RouterLink}
          to="/estadisticas"
          underline="none"
          color={estadColor}
          variant="h4"
          m={"0 40px"}
          sx={{ ":hover": { color: colors.blueAccent[400] } }}
          onClick={() => {
            setDashColor(colors.gray[400]);
            setEstadColor(colors.blueAccent[400]);
          }}
        >
          {"ESTADÍSTICAS"}
        </Link>
      </Box>
      {/* Icons */}
      <Box display="flex">
        <IconButton>
          <StorageRoundedIcon />
        </IconButton>
        <IconButton>
          <ContactSupportRoundedIcon />
        </IconButton>
        {/* <IconButton onClick={colorMode.toggleColorMode}>
          {theme.palette.mode === "dark" ? (
            <DarkModeOutlinedIcon />
          ) : (
            <LightModeOutlinedIcon />
          )}
        </IconButton>
        <IconButton>
          <NotificationsOutlinedIcon />
        </IconButton>
        <IconButton>
          <SettingsOutlinedIcon />
        </IconButton>
        <IconButton>
          <PersonOutlinedIcon />
        </IconButton> */}
      </Box>
    </Box>
  );
}

export default Topbar;
