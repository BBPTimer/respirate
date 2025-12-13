import { AddCircle, CloudUpload, Delete, Save } from "@mui/icons-material";
import {
  Button,
  ButtonGroup,
  IconButton,
  InputAdornment,
  OutlinedInput,
  Tooltip,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { MobileDateTimePicker } from "@mui/x-date-pickers/MobileDateTimePicker";
import dayjs from "dayjs";
import { useContext, useState } from "react";
import { formatDate } from "../common/utils";
import { AppContext } from "../contexts/AppContext";
import BackUpButton from "./BackUpButton";

const Data = () => {
  const { pets, storePets, selectedPet, addRate } = useContext(AppContext);

  const [displayForm, setDisplayForm] = useState(false);

  const handleAddRate = (event) => {
    // Prevent form submission
    event.preventDefault();

    // Use current time if no form value for timestamp
    let date = new Date();
    if (event.target.timestamp.value) {
      date = new Date(event.target.timestamp.value);
    }

    addRate(parseInt(event.target.rate.value), date);

    // Close form
    setDisplayForm(false);
  };

  const handleDeleteRate = (params) => {
    if (!confirm("Delete rate from " + formatDate(params.id) + "?")) {
      return;
    }

    // Loop through rate history
    for (let [index, rate] of pets[selectedPet].rateHistory.entries()) {
      // Identify index of rate to delete
      if (params.id === rate.timestamp) {
        deleteRate(index);
      }
    }
  };

  const deleteRate = (index) => {
    // Copy existing rate history
    let updatedRateHistory = [...pets[selectedPet].rateHistory];

    // Delete rate
    updatedRateHistory.splice(index, 1);

    // Sort new rates array by timestamp
    updatedRateHistory.sort((a, b) => a.timestamp - b.timestamp);

    // Copy existing pets array
    let updatedPets = [...pets];
    // Update pets array with new rate history
    updatedPets[selectedPet].rateHistory = updatedRateHistory;

    // Update rates
    storePets(updatedPets);
  };

  const columns = [
    {
      field: "rate",
      headerName: "Rate",
      align: "left",
      headerAlign: "left",
      type: "number",
      width: 75,
    },
    {
      field: "timestamp",
      valueFormatter: (value) => formatDate(value),
      headerName: "Timestamp",
      width: 180,
    },
    {
      field: "delete",
      headerName: "Delete",
      sortable: false,
      filterable: false,
      disableColumnMenu: true,
      disableExport: true,
      width: 60,
      renderCell: (params) => (
        <IconButton
          key={params.id}
          onClick={() => handleDeleteRate(params)}
          size="small"
        >
          <Delete />
        </IconButton>
      ),
    },
  ];

  return (
    <>
      <h3>Data</h3>
      <ButtonGroup>
        <BackUpButton />
        <Button variant="outlined" size="small" startIcon={<CloudUpload />}>
          Restore Data
        </Button>
      </ButtonGroup>
      <br />
      <br />
      <Button
        variant="contained"
        size="small"
        disableElevation
        onClick={() => setDisplayForm(!displayForm)}
        startIcon={<AddCircle />}
      >
        Add Rate
      </Button>
      <br />
      {displayForm && (
        <form className="white-bg" onSubmit={handleAddRate}>
          <OutlinedInput
            defaultValue={pets[selectedPet].targetRate}
            endAdornment={
              <InputAdornment position="end">breaths/minute</InputAdornment>
            }
            name="rate"
            type="number"
            required
            size="small"
            slotProps={{
              input: {
                inputMode: "numeric",
                pattern: "[0-9]*",
                min: "1",
                max: "999",
              },
            }}
            sx={{ width: "180px" }}
          />
          {" at"}
          <br />
          <br />
          <MobileDateTimePicker
            defaultValue={dayjs(new Date())}
            disableFuture
            name="timestamp"
            slotProps={{ textField: { size: "small", required: true } }}
            views={["year", "day", "hours", "minutes"]}
          />{" "}
          <Tooltip title="Add">
            <IconButton type="submit">
              <Save color="primary" />
            </IconButton>
          </Tooltip>
        </form>
      )}
      <br />
      <DataGrid
        // Data
        columns={columns}
        rows={pets[selectedPet].rateHistory}
        getRowId={(row) => row.timestamp}
        // Initial sort
        initialState={{
          sorting: {
            sortModel: [{ field: "timestamp", sort: "desc" }],
          },
        }}
        // Table styling
        sx={{ border: 1, borderColor: "lightgray", borderRadius: "5px" }}
        disableRowSelectionOnClick
        // Row conditional styling
        getRowClassName={(params) =>
          params.row.rate >= pets[selectedPet].targetRate ? "red" : "green"
        }
        // Toolbar settings
        showToolbar
        disableColumnSelector
        // CSV export
        slotProps={{
          toolbar: {
            csvOptions: {
              fileName: pets[selectedPet].name + "BreathingRates",
              delimiter: ",",
              utf8WithBom: true,
            },
          },
        }}
      />
    </>
  );
};

export default Data;
