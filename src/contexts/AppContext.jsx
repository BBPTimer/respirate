import { createTheme } from "@mui/material";
import { grey, red } from "@mui/material/colors";
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
    palette: {
      primary: red,
      secondary: grey,
    },
  });

  const parseDataString = (dataString) => {
    // Return generic pet if no data found in local storage
    if (!dataString) {
      return [new Pet("My First Pet", 30)];
    }

    // Convert string to JSON
    dataString = JSON.parse(dataString);

    let dataObjects = [];
    // Loop through pets
    for (let [index, pet] of dataString.entries()) {
      // Add Pet object to array
      dataObjects.push(new Pet(pet.name, pet.targetRate));

      let rateObjects = [];
      // Loop through rates
      for (let rate of pet.rateHistory) {
        rateObjects.push(
          new Rate(rate.rate, new Date(rate.timestamp), rate.comment)
        );
      }
      // Add rates to Pet
      dataObjects[index].rateHistory = rateObjects;
    }

    return dataObjects;
  };

  const [pets, setPets] = useState(
    parseDataString(localStorage.getItem("pets"))
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

  const [isBackUpDialogOpen, setIsBackUpDialogOpen] = useState(false);

  const [isSnackbarOpen, setIsSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  const addRate = (rate, date, comment) => {
    // Copy existing rate history
    let updatedRateHistory = [...pets[selectedPet].rateHistory];

    // Add new rate
    updatedRateHistory.push(new Rate(rate, date, comment));

    // Sort new rates array by timestamp
    updatedRateHistory.sort((a, b) => a.timestamp - b.timestamp);

    // Copy existing pets array
    let updatedPets = [...pets];
    // Update pets array with new rate history
    updatedPets[selectedPet].rateHistory = updatedRateHistory;

    // Update rates
    storePets(updatedPets);

    // Alert user of rate
    setSnackbarMessage(
      rate +
        " breaths/minute added to " +
        pets[selectedPet].name +
        "'s rate history on " +
        formatDate(date) +
        "."
    );
    setIsSnackbarOpen(true);
  };

  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [confirmMessage, setConfirmMessage] = useState("");
  const [confirmCallback, setConfirmCallback] = useState(null);

  const cleanUpConfirm = () => {
    setIsConfirmOpen(false);
    setConfirmMessage("");
    setConfirmCallback(null);
  };

  const [chartType, setChartType] = useState("line");

  const inputLabelStyle = { fontSize: 12 };

  return (
    <AppContext.Provider
      value={{
        theme,
        parseDataString,
        pets,
        setPets,
        storePets,
        selectedPet,
        setSelectedPet,
        storeselectedPet,
        isBackUpDialogOpen,
        setIsBackUpDialogOpen,
        isSnackbarOpen,
        setIsSnackbarOpen,
        snackbarMessage,
        setSnackbarMessage,
        addRate,
        isConfirmOpen,
        setIsConfirmOpen,
        confirmMessage,
        setConfirmMessage,
        confirmCallback,
        setConfirmCallback,
        cleanUpConfirm,
        inputLabelStyle,
        chartType,
        setChartType,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
