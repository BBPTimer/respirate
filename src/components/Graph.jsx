import { CalendarMonth, EditCalendar } from "@mui/icons-material";
import { Button, ButtonGroup, Typography } from "@mui/material";
import { LineChart } from "@mui/x-charts/LineChart";
import { MobileDatePicker } from "@mui/x-date-pickers/MobileDatePicker";
import { useContext, useEffect, useState } from "react";
import { formatDate, formatDateMMDDYYYY, rateAverage } from "../common/utils";
import { AppContext } from "../contexts/AppContext";
import PetSelector from "./PetSelector";
import SaveButton from "./SaveButton";

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
      <h1>Graph</h1>
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

export default Graph;
