import { DataGrid } from "@mui/x-data-grid";
import { useContext, useState } from "react";
import Rate from "../classes/Rate";
import { formatDate } from "../common/utils";
import { AppContext } from "../contexts/AppContext";

const Data = () => {
  const { pets, setPets, selectedPet } = useContext(AppContext);

  const [displayForm, setDisplayForm] = useState(false);

  const handleSubmit = (event) => {
    // Prevent form submission
    event.preventDefault();

    // Use current time if no form value for timestamp
    let date = new Date();
    if (event.target.timestamp.value) {
      date = new Date(event.target.timestamp.value);
    }

    // Copy existing rate history
    let updatedRateHistory = [...pets[selectedPet].rateHistory];

    // Add new rate
    updatedRateHistory.push(
      new Rate(
        // Convert rate from string to integer
        parseInt(event.target.rate.value),
        date
      )
    );

    // Sort new rates array by timestamp
    updatedRateHistory.sort((a, b) => a.timestamp - b.timestamp);

    // Copy existing pets array
    let updatedPets = [...pets];
    // Update pets array with new rate history
    updatedPets[selectedPet].rateHistory = updatedRateHistory;

    // Update rates
    setPets(updatedPets);

    // Alert user of rate
    alert(
      event.target.rate.value +
        " breaths/minute added to " + pets[selectedPet].name + "'s rate history on " +
        formatDate(date) +
        "."
    );
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
      <button onClick={() => setDisplayForm(!displayForm)}>Add Rate</button>
      <br />
      {displayForm && (
        <form className="white-bg" onSubmit={handleSubmit}>
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
          <label htmlFor="rate"> breaths/minute</label>
          <br />
          <label htmlFor="timestamp">at </label>
          <input type="datetime-local" id="timestamp" name="timestamp" />
          <br />
          <br />
          <button>Add</button>
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
