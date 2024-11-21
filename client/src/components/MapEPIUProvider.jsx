import React, { createContext, useContext, useState } from "react";
import { Selections as Selections } from "../constants/MapConstantsEPIU";

const MapEPIUContext = createContext();

const MapEPIUProvider = ({ children }) => {
  const [selectionValue, setSelectionValue] = useState(
    Selections["Building_Getafe_n exptes"].path
  );
  const [infoValue, setInfoValue] = useState({});

  const updateSelection = (newSelection) => {
    setSelectionValue(newSelection);
  };

  const updateInfo = (newInfo) => {
    setInfoValue(newInfo);
  };

  return (
    <MapEPIUContext.Provider
      value={{ selectionValue, updateSelection, infoValue, updateInfo }}
    >
      {children}
    </MapEPIUContext.Provider>
  );
};

export const useMapEPIUContext = () => useContext(MapEPIUContext);

export default MapEPIUProvider;
