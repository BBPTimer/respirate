import { LineChart } from "@mui/x-charts/LineChart";
import { useContext } from "react";
import { formatDate } from "../common/utils";
import { AppContext } from "../contexts/AppContext";

const Graph = () => {
  const { targetRate, setTargetRate, rates } = useContext(AppContext);

  const valueFormatter = (value) => {
    const dateObject = new Date(value);
    return formatDate(dateObject);
  };

  return (
    <>
      <h3>Graph</h3>
      <i>
        Target Rate:{" "}
        <input
          type="number"
          inputMode="numeric"
          pattern="[0-9]*"
          min="1"
          max="999"
          value={targetRate}
          onChange={(event) => setTargetRate(event.target.value)}
        />{" "}
        breaths/minute
      </i>
      <LineChart
        dataset={rates}
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
              thresholds: [targetRate],
              colors: ["Green", "Coral"],
            },
          },
        ]}
        grid={{ horizontal: true }}
        height={400}
      />
    </>
  );
};

export default Graph;
