import { createTheme } from "@mui/material";
import { createContext, useState } from "react";
import Pet from "../classes/Pet";

export const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
  // MUI theme
  const theme = createTheme({
    typography: {
      fontFamily: [
        "Gill Sans",
        "Gill Sans MT",
        "Calibri",
        "Trebuchet MS",
        "sans-serif",
      ].join(","),
    },
  });

  const [pets, setPets] = useState([new Pet("Dean", 40), new Pet("Ted", 30)]);
  const [selectedPet, setSelectedPet] = useState(0);
  const [rates, setRates] = useState([]);

  return (
    <AppContext.Provider
      value={{
        theme,
        pets,
        selectedPet,
        setSelectedPet,
        setPets,
        rates,
        setRates,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
