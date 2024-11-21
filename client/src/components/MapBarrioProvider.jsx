import React, { createContext, useContext, useState } from "react";
import { Selections as Selections } from "../constants/MapConstantsBarrio";

const MapBarrioContext = createContext();

const MapBarrioProvider = ({ children }) => {
  const [selectionValue, setSelectionValue] = useState(
    Selections["porc exptes"].path
  );
  const [infoValue, setInfoValue] = useState({});

  const updateSelection = (newSelection) => {
    setSelectionValue(newSelection);
  };

  const updateInfo = (newInfo) => {
    setInfoValue(newInfo);
  };

  return (
    <MapBarrioContext.Provider
      value={{
        selectionValue,
        updateSelection,
        infoValue,
        updateInfo,
      }}
    >
      {children}
    </MapBarrioContext.Provider>
  );
};

export const useMapBarrioContext = () => useContext(MapBarrioContext);

export default MapBarrioProvider;
