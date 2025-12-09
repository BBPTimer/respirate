import { DataGrid } from "@mui/x-data-grid";
import { useContext } from "react";
import { formatDate } from "../common/utils";
import { AppContext } from "../contexts/AppContext";

const Table = () => {
  const { targetRate, rates } = useContext(AppContext);

  const columns = [
    { field: "rate", headerName: "Breathing Rate", type: "number", width: 101 },
    {
      field: "timestamp",
      valueFormatter: (value) => formatDate(value),
      headerName: "Timestamp",
      width: 175,
    },
  ];

  return (
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
      // Styling
      sx={{ width: 400, margin: "auto" }}
      // Conditional styling
      getRowClassName={(params) =>
        params.row.rate > targetRate ? "coral" : "green"
      }
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
  );
};

export default Table;
