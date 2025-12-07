import { createContext, useState } from "react";

export const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
  const [rates, setRates] = useState([]);

  return (
    <AppContext.Provider
      value={{
        rates,
        setRates,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
