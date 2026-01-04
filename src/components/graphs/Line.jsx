import { LineChart } from "@mui/x-charts";
import { useContext } from "react";
import { formatDate } from "../../common/utils";
import { AppContext } from "../../contexts/AppContext";

const Line = ({ data }) => {
  const { pets, selectedPet } = useContext(AppContext);

  // Formats line chart x-axis
  const xAsixValueFormatter = (value) => {
    const dateObject = new Date(value);
    return formatDate(dateObject);
  };

  return (
    <LineChart
      dataset={data}
      series={[
        {
          dataKey: "rate",
          valueFormatter: (value) => value + " breaths/minute",
        },
      ]}
      xAxis={[
        {
          dataKey: "timestamp",
          label: "Date",
          valueFormatter: xAsixValueFormatter,
          scaleType: "band",
          tickLabelStyle: {
            angle: 90,
          },
          height: data.length > 0 ? 175 : undefined,
        },
      ]}
      yAxis={[
        {
          label: "Breathing Rate (breaths/minute)",
          tickMinStep: 1,
          colorMap: {
            type: "piecewise",
            thresholds: [parseInt(pets[selectedPet].targetRate) + 1 / 1000],
            colors: ["#4caf50", "#f44336"],
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
  );
};

export default Line;
