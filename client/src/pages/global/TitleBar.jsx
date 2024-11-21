import React from "react";
import { Box, useTheme, Typography } from "@mui/material";
import { tokens } from "../../theme";

function TitleBar({ title }) {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <Box
      display="flex"
      flexDirection={"row"}
      justifyContent="center"
      alignItems={"center"}
      pb={1}
      height={"40px"}
      sx={{
        // backgroundColor: "#ededed",
        backgroundColor: colors.blueAccent[900],
      }}
    >
      <Typography
        variant="h4"
        fontWeight={600}
        sx={{ color: colors.gray[200] }}
      >
        {title}
      </Typography>
    </Box>
  );
}

export default TitleBar;
