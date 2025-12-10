import { LineChart } from "@mui/x-charts/LineChart";
import { useContext, useState } from "react";
import { formatDate } from "../common/utils";
import { AppContext } from "../contexts/AppContext";

const Graph = () => {
  const { pets, selectedPet, rates } = useContext(AppContext);

  const [data, setData] = useState([...rates]);

  const valueFormatter = (value) => {
    const dateObject = new Date(value);
    return formatDate(dateObject);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // Default values
    let startDate = new Date();
    let endDate = new Date();

    // Update value if user chooses dates
    if (event.target.startDate.value) {
      startDate = new Date(event.target.startDate.value);
    }

    if (event.target.endDate.value) {
      endDate = new Date(event.target.endDate.value);
    }

    setData(
      rates.filter(
        (rate) => rate.timestamp >= startDate && rate.timestamp <= endDate
      )
    );
  };

  return (
    <>
      <h3>Graph</h3>
      <LineChart
        dataset={data}
        xAxis={[
          {
            dataKey: "timestamp",
            label: "Date",
            valueFormatter: valueFormatter,
            scaleType: "band",
            tickLabelStyle: {
              angle: 90,
            },
            height: 175,
          },
        ]}
        series={[
          {
            dataKey: "rate",
            valueFormatter: (value) => value + " breaths/minute",
            color: "Red",
          },
        ]}
        yAxis={[
          {
            label: "Breathing Rate",
            colorMap: {
              type: "piecewise",
              thresholds: [pets[selectedPet].targetRate],
              colors: ["Green", "Coral"],
            },
          },
        ]}
        grid={{ horizontal: true }}
        height={400}
        sx={{
          backgroundColor: "white",
          border: 1,
          borderColor: "lightgray",
          borderRadius: "5px",
        }}
      />
      <form className="white-bg" onSubmit={handleSubmit}>
        <b>Date Range</b>
        <br />
        <br />
        <label htmlFor="startDate">Start date: </label>
        <input type="date" id="startDate" name="startDate" />
        <br />
        <label htmlFor="endDate">End date: </label>
        <input type="date" id="endDate" name="endDate" />
        <br />
        <br />
        <button>Save</button>
        <button type="button" onClick={() => setData([...rates])}>
          Show All Data
        </button>
      </form>
    </>
  );
};

export default Graph;
