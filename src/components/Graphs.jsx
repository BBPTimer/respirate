import {
  AreaChart,
  BarChart,
  CalendarMonth,
  EditCalendar,
} from "@mui/icons-material";
import { Button, ButtonGroup, Typography } from "@mui/material";
import { MobileDatePicker } from "@mui/x-date-pickers/MobileDatePicker";
import dayjs from "dayjs";
import { useContext, useEffect, useState } from "react";
import { formatDateMMDDYYYY, rateAverage } from "../common/utils";
import { AppContext } from "../contexts/AppContext";
import Histogram from "./graphs/Histogram";
import Line from "./graphs/Line";
import PetSelector from "./ui/PetSelector";
import SaveButton from "./ui/SaveButton";

const Graphs = () => {
  const { pets, selectedPet, chartType, setChartType } = useContext(AppContext);

  const [data, setData] = useState([...pets[selectedPet].rateHistory]);
  // Update data when selected pet changes
  useEffect(() => setData([...pets[selectedPet].rateHistory]), [selectedPet]);

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
          variant={chartType === "histogram" ? "contained" : "outlined"}
          onClick={() => setChartType("histogram")}
          startIcon={<BarChart />}
        >
          Histogram
        </Button>
      </ButtonGroup>
      <br />
      <br />
      {chartType === "line" && <Line data={data} />}
      {chartType === "histogram" && (
        <div className="white-bg">
          <Typography fontSize={14} fontWeight={"bold"}>
            {formatDateMMDDYYYY(data[0].timestamp)}
            {" - "}
            {formatDateMMDDYYYY(data[data.length - 1].timestamp)}
          </Typography>
          <Histogram data={data.map((rateObj) => rateObj.rate)} />
          <Typography fontSize={12} fontStyle={"italic"}>
            Bars greater or less than 1 standard deviation from the mean appear
            faded
          </Typography>
        </div>
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
            defaultValue={dayjs()}
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
