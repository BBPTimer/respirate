import { ThemeProvider } from "@mui/material";
import { LineChart } from "@mui/x-charts/LineChart";
import { useContext } from "react";
import { formatDate } from "../common/utils";
import { AppContext } from "../contexts/AppContext";

const Graph = () => {
  const { targetRate, rates } = useContext(AppContext);

  const valueFormatter = (value) => {
    const dateObject = new Date(value);
    return formatDate(dateObject);
  };

  return (
    <>
      <h1>Graph</h1>
      <i>Target Rate: {targetRate} breaths/minute</i>
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
