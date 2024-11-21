import React, { useState } from "react";
import { ColorModeContext, useMode } from "./theme";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { tokens } from "./theme";
import { Routes, Route, useLocation } from "react-router-dom";
import Dashboard from "./pages/dashboard";
import Analisis from "./pages/analisis";
import Ohs from "./pages/ohs";
import Derivadores from "./pages/derivadores";
import CompForm from "./pages/compForm";
import Derivacion from "./pages/derivacion";
import Concienciacion from "./pages/concienciacion";
import Intervenciones from "./pages/intervenciones";
import Visor from "./pages/visorSSCC";
import VisorEPIU from "./pages/visorEPIU";
import VisorBarrio from "./pages/visorBarrio";
import Descargas from "./pages/descargas";
import BottomBar from "./pages/global/BottomBar";
import SideBar from "./pages/global/SideBar";
import MapEPIUProvider from "./components/MapEPIUProvider";
import MapSSCCProvider from "./components/MapSSCCProvider";
import MapBarrioProvider from "./components/MapBarrioProvider";
import Overlay from "./pages/global/Overlay";
// import { AnimatePresence } from "framer-motion/dist/framer-motion";
import { AnimatePresence } from "framer-motion";

function App() {
  const [theme, colorMode] = useMode();
  const location = useLocation();
  const [showOverlay, setShowOverlay] = useState(true); // Initially show overlay

  const closeOverlay = () => {
    setShowOverlay(false);
  };

  // Check if the user is on the home page ("/") and showOverlay is true
  const shouldShowOverlay = showOverlay && location.pathname === "/";

  return (
    <AnimatePresence>
      <ColorModeContext.Provider value={colorMode}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <div className="app">
            {shouldShowOverlay && <Overlay closeOverlay={closeOverlay} />}
            <SideBar />
            <main className="content">
              <BottomBar /> {/* <Bottom bar acts as topbar now /> */}
              <Routes location={location} key={location.pathname}>
                <Route path="/" element={<Dashboard />} />
                <Route path="/analisis" element={<Analisis />} />
                <Route path="/ohs" element={<Ohs />} />
                <Route path="/derivadores" element={<Derivadores />} />
                <Route path="/comparativa-formacion" element={<CompForm />} />
                <Route path="/derivacion" element={<Derivacion />} />
                <Route path="/concienciacion" element={<Concienciacion />} />
                <Route path="/intervenciones" element={<Intervenciones />} />
                <Route
                  path="/visor-barrio"
                  element={
                    <MapBarrioProvider>
                      <VisorBarrio />
                    </MapBarrioProvider>
                  }
                />
                <Route
                  path="/visor-sscc"
                  element={
                    <MapSSCCProvider>
                      <Visor />
                    </MapSSCCProvider>
                  }
                />
                <Route
                  path="/visor-epiu"
                  element={
                    <MapEPIUProvider>
                      <VisorEPIU />
                    </MapEPIUProvider>
                  }
                />
                <Route path="/descargas" element={<Descargas />} />
              </Routes>
            </main>
          </div>
        </ThemeProvider>
      </ColorModeContext.Provider>
    </AnimatePresence>
  );
}

export default App;
