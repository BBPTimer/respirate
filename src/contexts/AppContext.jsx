import { createTheme } from "@mui/material";
import { grey, red } from "@mui/material/colors";
import { createContext, useState } from "react";
import { formatDate } from "../common/utils";
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
    palette: {
      primary: red,
      secondary: grey,
    },
  });

  const [pets, setPets] = useState(
    JSON.parse(localStorage.getItem("pets")) || [
      { name: "My First Pet", targetRate: 30, rateHistory: [] },
    ]
  );

  const storePets = (pets) => {
    setPets(pets);
    localStorage.setItem("pets", JSON.stringify(pets));
  };

  const [selectedPet, setSelectedPet] = useState(
    localStorage.getItem("selectedPet") || 0
  );

  const storeselectedPet = (index) => {
    setSelectedPet(index);
    localStorage.setItem("selectedPet", index);
  };

  const addRate = (rate, date) => {
    // Copy existing rate history
    let updatedRateHistory = [...pets[selectedPet].rateHistory];

    // Add new rate
    updatedRateHistory.push(new Rate(rate, date.toString()));

    // Sort new rates array by timestamp
    updatedRateHistory.sort((a, b) => a.timestamp - b.timestamp);

    // Copy existing pets array
    let updatedPets = [...pets];
    // Update pets array with new rate history
    updatedPets[selectedPet].rateHistory = updatedRateHistory;

    // Update rates
    storePets(updatedPets);

    // Alert user of rate
    alert(
      rate +
        " breaths/minute added to " +
        pets[selectedPet].name +
        "'s rate history on " +
        formatDate(date) +
        "."
    );

    console.log(updatedPets);
  };

  return (
    <AppContext.Provider
      value={{
        theme,
        pets,
        setPets,
        storePets,
        selectedPet,
        setSelectedPet,
        storeselectedPet,
        addRate,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
