import {
  Sidebar,
  Menu,
  MenuItem,
  SubMenu,
  useProSidebar,
  sidebarClasses,
} from "react-pro-sidebar";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import { Link } from "react-router-dom";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import HomeRepairServiceRoundedIcon from "@mui/icons-material/HomeRepairServiceRounded";
import CloudDownloadIcon from "@mui/icons-material/CloudDownload";
import MapIcon from "@mui/icons-material/Map";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

function SideBar() {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const { collapseSidebar, collapsed } =
    useProSidebar();
  return (
    //zIndex so the leaflet map isnt on top of the sidebar
    <Box display={"flex"} height={"100%"} zIndex={900}>
      <Sidebar
        defaultCollapsed={true}
        rootStyles={{
          [`.${sidebarClasses.container}`]: {
            backgroundColor: colors.primary[100],
          },
        }}
        width="210px"
      >
        <Menu>
          <MenuItem
            // sidebar close
            onClick={() => {
              collapseSidebar();
              console.log("collapsed", collapsed);
            }}
            icon={collapsed ? <MenuOutlinedIcon color="red" /> : undefined}
            style={{
              margin: "5px 0 10px 0",
            }}
          >
            {!collapsed && (
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
              >
                <Typography variant="h3" color={colors.gray[200]}>
                  EMSV Getafe
                </Typography>
                <IconButton>
                  <MenuOutlinedIcon />
                </IconButton>
              </Box>
            )}
          </MenuItem>
          <Box
            display={"flex"}
            flexDirection={"column"}
            justifyContent={"space-between"}
            alignItems={"space-between"}
          >
            <Box>
              <MenuItem
                style={{
                  color: colors.gray[100],
                }}
                icon={<HomeOutlinedIcon />}
                component={<Link to="/" />}
              >
                Inicio
              </MenuItem>
              <SubMenu icon={<HomeRepairServiceRoundedIcon />} label="Servicio">
                <MenuItem
                    style={{
                      color: colors.gray[100],
                    }}
                    component={<Link to="/estadisticas_barrios" />}
                  >
                    Estadisticas Barrios
                  </MenuItem>
                <MenuItem
                  style={{
                    color: colors.gray[100],
                  }}
                  component={<Link to="/derivacion" />}
                >
                  Derivación
                </MenuItem>
                <MenuItem
                  style={{
                    color: colors.gray[100],
                  }}
                  component={<Link to="/concienciacion" />}
                >
                  Concienciación
                </MenuItem>
              </SubMenu>
              <SubMenu icon={<MapIcon />} label="Visores Cartográficos">
                <MenuItem
                  style={{
                    color: colors.gray[100],
                  }}
                  component={<Link to="/visor-barrio" />}
                >
                  Visor Barrio
                </MenuItem>
                <MenuItem
                  style={{
                    color: colors.gray[100],
                  }}
                  component={<Link to="/visor-sscc" />}
                >
                  Visor Sección Censal
                </MenuItem>
                <MenuItem
                  style={{
                    color: colors.gray[100],
                  }}
                  component={<Link to="/visor-parcelas" />}
                >
                  Visor Parcelas
                </MenuItem>
              </SubMenu>
              <MenuItem
                style={{
                  color: colors.gray[100],
                }}
                icon={<CloudUploadIcon />}
                component={<Link to="/actualizar-archivos" />}
              >
                Actualizar Archivos
              </MenuItem>
              <MenuItem
                style={{
                  color: colors.gray[100],
                }}
                icon={<CloudDownloadIcon />}
                component={<Link to="/descargas" />}
              >
                Descargas
              </MenuItem>
            </Box>

            {!collapsed && (
              <Box
                display={"flex"}
                flexDirection={"column"}
                justifyContent={"end"}
                flexGrow={1}
                height={"15vh"}
              >
                <MenuItem
                  href="https://khoraurbanthinkers.es/"
                  target="_blank"
                >
                  <Typography color={colors.primary[600]} align="center">
                    Desarrollado por
                    <br />
                    Khora Urban Thinkers
                  </Typography>
                </MenuItem>
              </Box>
            )}
          </Box>
        </Menu>
      </Sidebar>
    </Box>
  );
}

export default SideBar;
