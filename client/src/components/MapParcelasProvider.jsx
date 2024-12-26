import { createContext, useContext, useState } from "react";
import { Selections as Selections } from "../constants/MapConstantsParcelas";

const MapParcelasContext = createContext();

const MapParcelasProvider = ({ children }) => {
  const [selectionValue, setSelectionValue] = useState(
    Selections["n_exptes"].path
  );
  const [infoValue, setInfoValue] = useState({});

  const updateSelection = (newSelection) => {
    setSelectionValue(newSelection);
  };

  const updateInfo = (newInfo) => {
    setInfoValue(newInfo);
  };

  return (
    <MapParcelasContext.Provider
      value={{ selectionValue, updateSelection, infoValue, updateInfo }}
    >
      {children}
    </MapParcelasContext.Provider>
  );
};

export const useMapParcelasContext = () => useContext(MapParcelasContext);

export default MapParcelasProvider;
