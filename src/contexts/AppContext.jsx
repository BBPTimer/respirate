import { createTheme } from "@mui/material";
import { createContext, useState } from "react";

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

  const targetRate = 100;
  const [rates, setRates] = useState([]);

  return (
    <AppContext.Provider
      value={{
        theme,
        targetRate,
        rates,
        setRates,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
