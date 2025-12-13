import { LineChart } from "@mui/x-charts/LineChart";
import { useContext, useEffect, useState } from "react";
import { formatDate } from "../common/utils";
import { AppContext } from "../contexts/AppContext";

const Graph = () => {
  const { pets, selectedPet } = useContext(AppContext);

  const [data, setData] = useState([]);
  // Update data when selected pet changes
  useEffect(() => setData([...pets[selectedPet].rateHistory]), [selectedPet]);

  // Formats chart x-axis
  const valueFormatter = (value) => {
    const dateObject = new Date(value);
    return formatDate(dateObject);
  };

  const [displayForm, setDisplayForm] = useState(false);

  const handleDateRange = (event) => {
    event.preventDefault();

    // Default values
    let startDate = new Date(0);
    let endDate = new Date();

    // Update value if user chooses dates
    if (event.target.startDate.value) {
      startDate = new Date(event.target.startDate.value);
    }

    if (event.target.endDate.value) {
      endDate = new Date(event.target.endDate.value);
    }

    setData(
      pets[selectedPet].rateHistory.filter(
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
              thresholds: [parseInt(pets[selectedPet].targetRate) + 1],
              colors: ["Green", "#f44336"],
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
      <br />
      <button onClick={() => setDisplayForm(!displayForm)}>Date Range</button>
      {displayForm && (
        <form className="white-bg" onSubmit={handleDateRange}>
          <label htmlFor="startDate">Start date: </label>
          <input type="date" id="startDate" name="startDate" />
          <br />
          <label htmlFor="endDate">End date: </label>
          <input type="date" id="endDate" name="endDate" />
          <br />
          <br />
          <button>Save</button>
          <button
            type="button"
            onClick={() => setData([...pets[selectedPet].rateHistory])}
          >
            Show All Data
          </button>
        </form>
      )}
      <br />
    </>
  );
};

export default Graph;
