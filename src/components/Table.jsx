import { DataGrid } from "@mui/x-data-grid";
import { useContext } from "react";
import { formatDate } from "../common/utils";
import { AppContext } from "../contexts/AppContext";

const Table = () => {
  const { targetRate, rates } = useContext(AppContext);

  const columns = [
    { field: "rate", headerName: "Breathing Rate", align: "left", headerAlign: "left", type: "number", width: 130 },
    {
      field: "timestamp",
      valueFormatter: (value) => formatDate(value),
      headerName: "Timestamp",
      width: 175,
    },
  ];

  return (
    <>
      <h3>Table</h3>
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
          params.row.rate >= targetRate ? "coral" : "green"
        }
        // Toolbar settings
        showToolbar
        disableColumnSelector
        // CSV export
        slotProps={{
          toolbar: {
            csvOptions: {
              fileName: "breathingRates",
              delimiter: ",",
              utf8WithBom: true,
            },
          },
        }}
      />
    </>
  );
};

export default Table;
