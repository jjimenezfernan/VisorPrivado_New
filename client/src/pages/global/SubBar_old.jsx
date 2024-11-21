import React, { useContext, useState } from "react";
import {
  Box,
  IconButton,
  InputBase,
  useTheme,
  Link,
  Typography,
} from "@mui/material";
import { tokens } from "../../theme";
import { Link as RouterLink, useLocation } from "react-router-dom";
import DynamicBreadcrumbs from "../../components/DynamicBreadCrumbs";

function SubBar({ crumbs }) {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const location = useLocation();

  const isActiveLink = (to) => {
    return location.pathname === to;
  };

  return (
    <Box
      display="flex"
      flexDirection={"row"}
      justifyContent="space-between"
      p={1}
      height={"40px"}
      sx={{
        // borderBottom: 1,
        // borderColor: "#000000",
        // backgroundColor: "#ededed",
        backgroundColor: colors.blueAccent[900],
      }}
    >
      <Box
        display="flex"
        flex={1}
        alignItems={"center"}
        justifyContent={"flex-start"}
        // sx={{ border: 1, borderColor: "#000000" }}
      >
        <Box
          display="flex"
          sx={
            {
              // border: 1,
              // borderColor: "red",
              // borderRadius: "10px",
              // backgroundColor: "#f5f5f5",
            }
          }
        >
          <Link
            component={RouterLink}
            to="/estadisticas/analisis"
            underline="none"
            color={colors.gray[300]}
            fontWeight={() => {
              if (
                isActiveLink("/estadisticas/analisis") ||
                location.pathname === "/estadisticas" ||
                location.pathname === "/estadisticas/"
              ) {
                return 600;
              } else {
                return "normal";
              }
            }}
            variant="h5"
            m={"0 40px"}
            sx={{ ":hover": { color: colors.blueAccent[400] } }}
          >
            {"Análisis"}
          </Link>
          <Link
            component={RouterLink}
            to="/estadisticas/servicio"
            underline="none"
            color={colors.gray[300]}
            fontWeight={isActiveLink("/estadisticas/servicio") ? 600 : "normal"}
            variant="h5"
            m={"0 40px"}
            sx={{ ":hover": { color: colors.blueAccent[400] } }}
          >
            {"Servicio"}
          </Link>
          <Link
            component={RouterLink}
            to="/estadisticas/intervenciones"
            underline="none"
            color={colors.gray[300]}
            fontWeight={
              isActiveLink("/estadisticas/intervenciones") ? 600 : "normal"
            }
            variant="h5"
            m={"0 40px"}
            sx={{ ":hover": { color: colors.blueAccent[400] } }}
          >
            {"Intervenciones"}
          </Link>
        </Box>
      </Box>
      <Box
        display="flex"
        flex={1}
        alignItems={"center"}
        justifyContent={"flex-end"}
        // sx={{ border: 1, borderColor: "#000000" }}
      >
        <DynamicBreadcrumbs crumbs={crumbs} />
      </Box>
    </Box>
  );
}

export default SubBar;
