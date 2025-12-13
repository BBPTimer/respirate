import Snackbar from "@mui/material/Snackbar";
import { useContext } from "react";
import { AppContext } from "../contexts/AppContext";

const AutohideSnackbar = () => {
  const { isSnackbarOpen, setIsSnackbarOpen, snackbarMessage } =
    useContext(AppContext);

  const handleClose = () => {
    setIsSnackbarOpen(false);
  };

  return (
    <Snackbar
      open={isSnackbarOpen}
      autoHideDuration={5000}
      onClose={handleClose}
      message={snackbarMessage.current}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
    />
  );
};

export default AutohideSnackbar;
