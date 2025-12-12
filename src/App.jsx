import { ThemeProvider } from "@emotion/react";
import { useContext } from "react";
import { Navigate, Route, BrowserRouter as Router, Routes } from "react-router";
import "./App.css";
import About from "./components/About";
import Data from "./components/Data";
import Graph from "./components/Graph";
import Header from "./components/Header";
import Nav from "./components/Nav";
import Pets from "./components/Pets";
import Timer from "./components/Timer";
import { AppContext } from "./contexts/AppContext";

function App() {
  const { theme } = useContext(AppContext);

  return (
    <>
      <ThemeProvider theme={theme}>
        <Router>
          <Header />
          <Routes>
            <Route path="/" element={<Timer />} />
            <Route path="/data" element={<Data />} />
            <Route path="/graph" element={<Graph />} />
            <Route path="/pets" element={<Pets />} />
            <Route path="/about" element={<About />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
          <Nav />
        </Router>
      </ThemeProvider>
    </>
  );
}

export default App;
