import { ThemeProvider } from "@emotion/react";
import { Box } from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { useContext } from "react";
import { Navigate, Route, BrowserRouter as Router, Routes } from "react-router";
import "./App.css";
import About from "./components/About";
import Data from "./components/Data";
import Graph from "./components/Graph";
import Nav from "./components/ui/Nav";
import Pets from "./components/Pets";
import Timer from "./components/Timer";
import { AppContext } from "./contexts/AppContext";

function App() {
  const { theme } = useContext(AppContext);

  return (
    <>
      <ThemeProvider theme={theme}>
        <Router>
          {/* Fix Nav overlap */}
          <Box paddingBottom="calc(56px + env(safe-area-inset-bottom))">
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <Routes>
                <Route path="/" element={<Timer />} />
                <Route path="/data" element={<Data />} />
                <Route path="/graph" element={<Graph />} />
                <Route path="/pets" element={<Pets />} />
                <Route path="/about" element={<About />} />
                <Route path="*" element={<Navigate to="/" />} />
              </Routes>
            </LocalizationProvider>
          </Box>
          <Nav />
        </Router>
      </ThemeProvider>
    </>
  );
}

export default App;
