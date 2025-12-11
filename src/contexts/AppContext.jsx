import { createTheme } from "@mui/material";
import { createContext, useState } from "react";
import Pet from "../classes/Pet";
import Rate from "../classes/Rate";
import { formatDate } from "../common/utils";

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

  const addRate = (rate, date) => {
    // Copy existing rate history
    let updatedRateHistory = [...pets[selectedPet].rateHistory];

    // Add new rate
    updatedRateHistory.push(new Rate(rate, date));

    // Sort new rates array by timestamp
    updatedRateHistory.sort((a, b) => a.timestamp - b.timestamp);

    // Copy existing pets array
    let updatedPets = [...pets];
    // Update pets array with new rate history
    updatedPets[selectedPet].rateHistory = updatedRateHistory;

    // Update rates
    setPets(updatedPets);

    // Alert user of rate
    alert(
      rate +
        " breaths/minute added to " +
        pets[selectedPet].name +
        "'s rate history on " +
        formatDate(date) +
        "."
    );
  };

  return (
    <AppContext.Provider
      value={{
        theme,
        pets,
        selectedPet,
        setSelectedPet,
        setPets,
        addRate,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
