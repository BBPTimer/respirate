import { createTheme } from "@mui/material";
import { createContext, useState } from "react";
import Pet from "../classes/Pet";
import Rate from "../classes/Rate";

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

  const dummyData = () => {
    let array = [new Pet("Dean", 40), new Pet("Ted", 30)];
    array[0].rateHistory.push(new Rate(30, new Date(2023, 5, 1)));
    array[0].rateHistory.push(new Rate(40, new Date(2024, 5, 1)));
    array[0].rateHistory.push(new Rate(50, new Date(2025, 5, 1)));
    array[1].rateHistory.push(new Rate(45, new Date(2023, 5, 1)));
    array[1].rateHistory.push(new Rate(35, new Date(2024, 5, 1)));
    array[1].rateHistory.push(new Rate(25, new Date(2025, 5, 1)));
    return array;
  };

  const [pets, setPets] = useState(dummyData);
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
