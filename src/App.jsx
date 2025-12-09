import { ThemeProvider } from "@emotion/react";
import { useContext } from "react";
import "./App.css";
import Graph from "./components/Graph";
import Table from "./components/Table";
import Timer from "./components/Timer";
import { AppContext } from "./contexts/AppContext";

function App() {
  const { theme } = useContext(AppContext);

  return (
    <>
      <ThemeProvider theme={theme}>
        <Timer />
        <Graph />
        <Table />
      </ThemeProvider>
    </>
  );
}

export default App;
