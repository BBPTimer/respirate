import {
  AreaChart,
  CalendarMonth,
  EditCalendar,
  PieChart as PieChartIcon,
} from "@mui/icons-material";
import {
  Button,
  ButtonGroup,
  Typography
} from "@mui/material";
import { LineChart } from "@mui/x-charts/LineChart";
import { PieChart } from "@mui/x-charts/PieChart";
import { MobileDatePicker } from "@mui/x-date-pickers/MobileDatePicker";
import { useContext, useEffect, useState } from "react";
import { formatDate, formatDateMMDDYYYY, rateAverage } from "../common/utils";
import { AppContext } from "../contexts/AppContext";
import PetSelector from "./ui/PetSelector";
import SaveButton from "./ui/SaveButton";

const Graphs = () => {
  const { pets, selectedPet, chartType, setChartType } = useContext(AppContext);

  const [data, setData] = useState([]);
  // Update data when selected pet changes
  useEffect(() => setData([...pets[selectedPet].rateHistory]), [selectedPet]);

  const handleChartType = (event, newChartType) => {
    if (newChartType !== null) {
      setChartType(newChartType);
    }
  };

  const valueFormatterPie = (item) => item.value + "%";

  // Formats chart x-axis
  const valueFormatter = (value) => {
    const dateObject = new Date(value);
    return formatDate(dateObject);
  };

  const dataAverage = () => {
    if (data.length > 0) {
      return (
        <>
          <Typography fontSize={12}>
            Average breathing rate between{" "}
            {formatDateMMDDYYYY(data[0].timestamp)} and{" "}
            {formatDateMMDDYYYY(data[data.length - 1].timestamp)}:{" "}
            <b>{rateAverage(data)}</b> breaths/minute
          </Typography>
          <br />
        </>
      );
    }
  };

  const [displayForm, setDisplayForm] = useState(false);
  const dateTimePickerStyle = { textField: { size: "small", required: true } };

  const handleDateRange = (event) => {
    event.preventDefault();

    let startDate = new Date(event.target.startDate.value);
    let endDate = new Date(event.target.endDate.value);

    setData(
      pets[selectedPet].rateHistory.filter(
        (rate) =>
          rate.timestamp >= startDate &&
          // Include end date by adding 1 day
          rate.timestamp <= new Date(endDate.valueOf() + 24 * 60 * 60 * 1000)
      )
    );
  };

  return (
    <>
      <PetSelector />
      <h1>Graphs</h1>
      <ButtonGroup size="small" disableElevation>
        <Button
          variant={chartType === "line" ? "contained" : "outlined"}
          onClick={() => setChartType("line")}
          startIcon={<AreaChart />}
        >
          Line
        </Button>
        <Button
          variant={chartType === "pie" ? "contained" : "outlined"}
          onClick={() => setChartType("pie")}
          startIcon={<PieChartIcon />}
        >
          Pie
        </Button>
      </ButtonGroup>
      {/* <ToggleButtonGroup
        value={chartType}
        exclusive
        onChange={handleChartType}
        color="primary"
        size="small"
      >
        <ToggleButton value="line">
          <AreaChart />Line
        </ToggleButton>
        <ToggleButton value="pie">
          <PieChartIcon />Pie
        </ToggleButton>
      </ToggleButtonGroup> */}
      <br />
      <br />
      {chartType === "line" && (
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
              height: data.length > 0 ? 175 : undefined,
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
      )}
      {chartType === "pie" && data.length === 0 && <p>No data to display</p>}
      {chartType === "pie" && data.length > 0 && (
        <PieChart
          series={[
            {
              innerRadius: 75,
              valueFormatter: valueFormatterPie,
              arcLabel: valueFormatterPie,
              arcLabelMinAngle: 35,
              highlightScope: { fade: "global", highlight: "item" },
              faded: { color: "Gray" },
              data: [
                {
                  value: Math.round(
                    (data.filter(
                      (datapoint) =>
                        datapoint.rate <= pets[selectedPet].targetRate
                    ).length /
                      data.length) *
                      100
                  ),
                  label: "At or below target rate",
                  color: "#4caf50",
                },
                {
                  value: Math.round(
                    (data.filter(
                      (datapoint) =>
                        datapoint.rate > pets[selectedPet].targetRate
                    ).length /
                      data.length) *
                      100
                  ),
                  label: "Above target rate",
                  color: "#f44336",
                },
              ],
            },
          ]}
          height={300}
          width={300}
          slotProps={{
            legend: {
              direction: "horizontal",
              position: {
                vertical: "top",
                horizontal: "center",
              },
            },
          }}
        />
      )}
      <br />
      {dataAverage()}
      <Button
        variant="contained"
        size="small"
        disableElevation
        onClick={() => setDisplayForm(!displayForm)}
        startIcon={<EditCalendar />}
      >
        Date Range
      </Button>
      {displayForm && (
        <form className="white-bg" onSubmit={handleDateRange}>
          <MobileDatePicker
            label="Start Date"
            disableFuture
            name="startDate"
            slotProps={dateTimePickerStyle}
          />
          <br />
          <br />
          <MobileDatePicker
            label="End Date"
            disableFuture
            name="endDate"
            slotProps={dateTimePickerStyle}
          />
          <br />
          <br />
          <ButtonGroup size="small">
            <SaveButton />
            <Button
              onClick={() => setData([...pets[selectedPet].rateHistory])}
              variant="outlined"
              startIcon={<CalendarMonth />}
            >
              Show All Data
            </Button>
          </ButtonGroup>
        </form>
      )}
      <br />
    </>
  );
};

export default Graphs;
