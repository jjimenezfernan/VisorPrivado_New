import { Box, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import logoOhsText from "../../assets/logo_ohs_text.png";
import logoAyunt from "../../assets/logo_ayunt.png";
import logoEuro from "../../assets/logo_euro.png";
import logoUrban from "../../assets/logo_urban.png";

function BottomBar() {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <Box
      // position="sticky"
      // bottom={0}
      position="sticky"
      top={0}
      zIndex={1}
      width="100%"
      display="flex"
      justifyContent="space-between"
      alignItems={"center"}
      paddingX={2}
      height={"60px"}
      sx={{
        backgroundColor: colors.primary[100],
        borderBottom: 1,
        borderColor: colors.gray[800],
      }}
    >
      <Box
        display="flex"
        flex={1}
        alignItems={"center"}
        justifyContent={"flex-start"}
        // sx={{ border: 1, borderColor: "#000000" }}
      >
        <Box display="flex" mr={"25px"}>
          <a
            href="https://hogaressaludables.getafe.es/en/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src={logoOhsText}
              alt="Oficina de Hogares Saludables (OHS)"
              height={"40px"}
            />
          </a>
        </Box>

        <Box display="flex" marginX={"25px"}>
          <a
            href="https://getafe.es/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src={logoAyunt} alt="Ayuntamiento de Getafe" height={"40px"} />
          </a>
        </Box>
      </Box>
      <Box
        display="flex"
        flex={1}
        alignItems={"center"}
        justifyContent={"flex-end"}
        // sx={{ border: 1, borderColor: "#000000" }}
      >
        <Box display="flex" marginX={"13px"}>
          <a
            href="https://www.uia-initiative.eu/en"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src={logoEuro}
              alt="Urban Innovative Actions"
              height={"40px"}
            />
          </a>
        </Box>
        <Box display="flex" ml={"0px"}>
          <a
            href="https://uia-initiative.eu/en/uia-cities/getafe"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src={logoUrban}
              alt="Urban Innovative Actions"
              height={"40px"}
            />
          </a>
        </Box>
      </Box>
    </Box>
  );
}

export default BottomBar;
