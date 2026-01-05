import { FormControlLabel, FormGroup, Switch } from "@mui/material";
import { BarChart } from "@mui/x-charts";
import { useContext, useState } from "react";
import { AppContext } from "../../contexts/AppContext";

const Histogram = ({ data }) => {
  const { pets, selectedPet } = useContext(AppContext);
  const [fadeOutliers, setFadeOutliers] = useState(true);

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

  const { mean, stdDev } = calculateStatistics(data);

  const defineColor = (data) => {
    const rate = data.dataIndex + min;
    let color = "#00000";

    rate <= parseInt(pets[selectedPet].targetRate) + 1 / 1000
      ? (color = "#4caf50")
      : (color = "#f44336");

    if (!fadeOutliers) {
      return color;
    }

    // Opacity
    if (rate < mean - stdDev) {
      color += "4D";
    } else if (rate > mean + stdDev) {
      color += "4D";
    }

    return color;
  };

  return (
    <>
      <BarChart
        dataset={series}
        series={[
          {
            dataKey: "frequency",
            colorGetter: (data) => defineColor(data),
            valueFormatter: (value) =>
              "Frequency: " +
              value +
              (value === 1 ? " measurement" : " measurements"),
          },
        ]}
        xAxis={[
          {
            dataKey: "rate",
            categoryGapRatio: 0,
            label: "Breathing Rate (breaths/minute)",
            valueFormatter: (value, context) => {
              if (context.location === "tooltip") {
                return value + " breaths/minute";
              }
            },
          },
        ]}
        yAxis={[
          {
            position: "none",
          },
        ]}
        grid={{ horizontal: true }}
        height={400}
      ></BarChart>
      <FormGroup
        sx={{
          alignItems: "center",
        }}
      >
        <FormControlLabel
          control={
            <Switch
              checked={fadeOutliers}
              onChange={() => setFadeOutliers(!fadeOutliers)}
              color="primary"
              size="small"
            />
          }
          label="Fade bars greater or less than 1 standard deviation from the mean"
          slotProps={{ typography: { fontSize: 12, fontStyle: "italic" } }}
        />
      </FormGroup>
    </>
  );
};

export default Histogram;
