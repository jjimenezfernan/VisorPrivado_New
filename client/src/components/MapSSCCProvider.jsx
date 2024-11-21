import React, { createContext, useContext, useState } from "react";
import { Selections as Selections } from "../constants/MapConstantsSSCC";

const MapSSCCContext = createContext();

const MapSSCCProvider = ({ children }) => {
  const [selectionValue, setSelectionValue] = useState(
    Selections["n exptes SSCC"].path
  );
  const [infoValue, setInfoValue] = useState({});

  const updateSelection = (newSelection) => {
    setSelectionValue(newSelection);
  };

  const updateInfo = (newInfo) => {
    setInfoValue(newInfo);
  };

  return (
    <MapSSCCContext.Provider
      value={{ selectionValue, updateSelection, infoValue, updateInfo }}
    >
      {children}
    </MapSSCCContext.Provider>
  );
};

export const useMapSSCCContext = () => useContext(MapSSCCContext);

export default MapSSCCProvider;
