import {
  ChartContainer,
  ChartsReferenceLine,
  ChartsXAxis,
  ChartsYAxis,
} from "@mui/x-charts";
import { BarPlot } from "@mui/x-charts/BarChart";
import { useContext } from "react";
import { AppContext } from "../contexts/AppContext";

const Histogram = ({ data }) => {
  const { pets, selectedPet } = useContext(AppContext);

  // Set up series
  const min = Math.min(...data);
  const max = Math.max(...data);
  const series = [];
  for (let i = min; i <= max; i++) {
    series.push({ rate: i, frequency: 0 });
  }

  // Populate series
  for (let element of data) {
    series[element - min].frequency++;
  }

  function calculateStatistics(values) {
    const n = values.length;
    const mean = values.reduce((sum, val) => sum + val, 0) / n;
    const variance =
      values.reduce((sum, val) => sum + Math.pow(val - mean, 2), 0) / n;
    const stdDev = Math.sqrt(variance);
    return { mean, stdDev };
  }

  const calculateMedian = (values) => {
    values.sort((a, b) => a - b);

    const half = Math.floor(values.length / 2);

    return values.length % 2
      ? values[half]
      : (values[half - 1] + values[half]) / 2;
  };

  const { mean, stdDev } = calculateStatistics(data);
  const median = calculateMedian(data);

  const defineColor = (data) => {
    const rate = data.dataIndex + min;
    let color = "#00000";

    rate <= parseInt(pets[selectedPet].targetRate) + 1 / 1000
      ? (color = "#4caf50")
      : (color = "#f44336");

    if (rate < mean - stdDev) {
      color += "80";
    } else if (rate > mean + stdDev) {
      color += "80";
    }

    return color;
  };

  return (
    <div className="white-bg">
      <ChartContainer
        dataset={series}
        series={[
          {
            dataKey: "frequency",
            type: "bar",
            colorGetter: (data) => defineColor(data),
          },
        ]}
        xAxis={[
          {
            dataKey: "rate",
            scaleType: "band",
            label: "Breathing Rate (breaths/minute)",
          },
        ]}
        yAxis={[
          {
            label: "Frequency",
            tickMinStep: 1,
          },
        ]}
        height={200}
      >
        <BarPlot />
        <ChartsReferenceLine
          x={Math.round(mean)}
          label="Mean"
          lineStyle={{ strokeWidth: 1 }}
          labelStyle={{ fontSize: 14 }}
          labelAlign="start"
        />
        <ChartsReferenceLine
          id="median"
          x={median}
          label="Median"
          lineStyle={{
            strokeWidth: 1,
            strokeDasharray: "10 5",
            stroke: "gray",
          }}
          labelStyle={{ fontSize: 14 }}
          labelAlign="start"
          spacing={{ y: 20 }}
        />
        <ChartsReferenceLine
          x={Math.round(mean - stdDev)}
          label="-1σ"
          lineStyle={{ strokeWidth: 1, strokeDasharray: "5 5" }}
          labelStyle={{ fontSize: 14 }}
          labelAlign="start"
          spacing={{ y: 40 }}
        />
        <ChartsReferenceLine
          x={Math.round(mean + stdDev)}
          label="+1σ"
          lineStyle={{ strokeWidth: 1, strokeDasharray: "5 5" }}
          labelStyle={{ fontSize: 14 }}
          labelAlign="start"
          spacing={{ y: 60 }}
        />
        <ChartsXAxis />
        <ChartsYAxis />
      </ChartContainer>
    </div>
  );
};

export default Histogram;
