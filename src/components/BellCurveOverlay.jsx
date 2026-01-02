// https://mui.com/x/react-charts/composition/

import { Typography } from "@mui/material";
import { ChartContainer } from "@mui/x-charts/ChartContainer";
import { ChartsReferenceLine } from "@mui/x-charts/ChartsReferenceLine";
import { ChartsXAxis } from "@mui/x-charts/ChartsXAxis";
import { ChartsYAxis } from "@mui/x-charts/ChartsYAxis";
import { LinePlot } from "@mui/x-charts/LineChart";
import { ScatterPlot } from "@mui/x-charts/ScatterChart";
import { useContext } from "react";
import { AppContext } from "../contexts/AppContext";

function calculateStatistics(values) {
  const n = values.length;
  const mean = values.reduce((sum, val) => sum + val, 0) / n;
  const variance =
    values.reduce((sum, val) => sum + Math.pow(val - mean, 2), 0) / n;
  const stdDev = Math.sqrt(variance);
  return { mean, stdDev };
}

function normalDistribution(x, mean, stdDev) {
  const exponent = -Math.pow(x - mean, 2) / (2 * Math.pow(stdDev, 2));
  return (1 / (stdDev * Math.sqrt(2 * Math.PI))) * Math.exp(exponent);
}

const calculateMedian = (values) => {
  values.sort((a, b) => a - b);

  const half = Math.floor(values.length / 2);

  return values.length % 2
    ? values[half]
    : (values[half - 1] + values[half]) / 2;
};

const BellCurveOverlay = ({ data }) => {
  const { pets, selectedPet } = useContext(AppContext);

  const { mean, stdDev } = calculateStatistics(data);
  const median = calculateMedian(data);

  // Generate bell curve data
  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min;
  const bellCurveData = [];
  const xValues = [];
  const numPoints = data.length;

  for (let i = 0; i <= numPoints; i += 1) {
    const x = min - range * 0.1 + ((max - min + range * 0.2) * i) / numPoints;
    xValues.push(x);
    bellCurveData.push(normalDistribution(x, mean, stdDev));
  }

  // Stack points that are close together
  const binWidth = 1; // Adjust this to control stacking sensitivity
  const sortedData = [...data].sort((a, b) => a - b);
  const bins = new Map();

  // Group values into bins
  sortedData.forEach((value) => {
    const binIndex = Math.round(value / binWidth);
    if (!bins.has(binIndex)) {
      bins.set(binIndex, []);
    }
    bins.get(binIndex).push(value);
  });

  // Create scatter data with stacked y-positions
  const scatterData = [];
  let globalIndex = 0;
  const baseY = 0.0005;
  const stackHeight = 0.001;

  bins.forEach((values) => {
    values.forEach((value, stackIndex) => {
      scatterData.push({
        x: value,
        y: baseY + stackIndex * stackHeight,
        id: globalIndex,
      });
      globalIndex += 1;
    });
  });

  return (
    <div className="white-bg">
      <ChartContainer
        series={[
          {
            type: "scatter",
            data: scatterData,
            label: "Data points",
            id: "scatter",
            markerSize: 4,
          },
          {
            type: "line",
            data: bellCurveData,
            label: "Normal distribution",
            id: "bell-curve",
            curve: "natural",
            showMark: false,
          },
        ]}
        xAxis={[
          {
            data: xValues,
            // Absolute minimum of 0
            min: min - range * 0.1 > 0 ? min - range * 0.1 : 0,
            max: max + range * 0.1,
            label: "Breathing Rate",
            tickMinStep: 1,
            colorMap: {
              type: "piecewise",
              thresholds: [parseInt(pets[selectedPet].targetRate) + 1 / 1000],
              colors: ["#4caf50", "#f44336"],
            },
          },
        ]}
        yAxis={[
          {
            position: "none",
          },
        ]}
        height={400}
      >
        <ScatterPlot />
        <LinePlot />
        <ChartsReferenceLine
          x={mean}
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
          labelStyle={{ fontSize: 14, fill: "gray" }}
          labelAlign="start"
          spacing={{ y: 20 }}
        />
        {/* Hide reference line if it renders outside the x-axis minimum */}
        {mean - stdDev >= min - range * 0.1 && (
          <ChartsReferenceLine
            x={mean - stdDev}
            label="-1σ"
            lineStyle={{ strokeWidth: 1, strokeDasharray: "5 5" }}
            labelStyle={{ fontSize: 14 }}
            labelAlign="start"
            spacing={{ y: 40 }}
          />
        )}
        <ChartsReferenceLine
          x={mean + stdDev}
          label="+1σ"
          lineStyle={{ strokeWidth: 1, strokeDasharray: "5 5" }}
          labelStyle={{ fontSize: 14 }}
          labelAlign="start"
          spacing={{ y: 60 }}
        />
        <ChartsXAxis />
        <ChartsYAxis />
      </ChartContainer>
      <Typography fontSize={10}>
        <b>Caveat!</b>
        <p className="justified">
          Your pet's breathing rate data won't fit a normal distribution as
          shown here; it will fit a more positive skew (+
          <b>{((3 * (mean - median)) / stdDev).toFixed(1)}</b>). That means that
          you will see more outliers on the right side of the scatter plot, and
          a lower median than mean. While not a perfect fit, this bell curve
          still helps visualize outlier measurements. If you want to perform
          more sophisticated statistical modeling, I recommend that you export
          your pet's data as a CSV file from the Data table, and then utilize a
          stats package such as R, SPSS, SAS, etc.
        </p>
      </Typography>
    </div>
  );
};

export default BellCurveOverlay;
