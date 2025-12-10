import { DataGrid } from "@mui/x-data-grid";
import { useContext } from "react";
import Rate from "../classes/Rate";
import { formatDate } from "../common/utils";
import { AppContext } from "../contexts/AppContext";

const Data = () => {
  const { pets, selectedPet, rates, setRates } = useContext(AppContext);

  const handleSubmit = (event) => {
    // Prevent form submission
    event.preventDefault();

    // Copy existing rates array
    let newRates = [...rates];

    // Add new rate
    newRates.push(
      new Rate(
        // Convert rate from string to integer
        parseInt(event.target.rate.value),
        // Use current time if no form value for timestamp
        event.target.timestamp.value
          ? new Date(event.target.timestamp.value)
          : new Date()
      )
    );

    // Sort new rates array by timestamp
    newRates.sort((a, b) => a.timestamp - b.timestamp);

    // Update rates
    setRates(newRates);
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
  ];

  return (
    <>
      <h3>Data</h3>
      <h5>Add Rate</h5>
      <form onSubmit={handleSubmit}>
        <input
          type="number"
          inputMode="numeric"
          pattern="[0-9]*"
          id="rate"
          name="rate"
          min="1"
          max="999"
          defaultValue={pets[selectedPet].targetRate}
          required
        ></input>
        <i>
          <label htmlFor="rate"> breaths/minute</label>{" "}
          <label htmlFor="timestamp">at </label>
          <input type="datetime-local" id="timestamp" name="timestamp" />{" "}
        </i>
        <button>Add</button>
      </form>

      <DataGrid
        // Data
        columns={columns}
        rows={rates}
        getRowId={(row) => row.timestamp}
        // Initial sort
        initialState={{
          sorting: {
            sortModel: [{ field: "timestamp", sort: "desc" }],
          },
        }}
        // Table styling
        sx={{ border: 0 }}
        // Row conditional styling
        getRowClassName={(params) =>
          params.row.rate >= pets[selectedPet].targetRate ? "coral" : "green"
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
