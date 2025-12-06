import { useState } from "react";
import "./App.css";
import Table from "./components/Table";
import Timer from "./components/Timer";

function App() {
  const [rates, setRates] = useState([]);

  return (
    <>
      <Timer rates={rates} setRates={setRates} />
      <br />
      <br />
      <Table rates={rates} />
    </>
  );
}

export default App;
