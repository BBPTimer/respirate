import Snackbar from "@mui/material/Snackbar";
import { useContext } from "react";
import { AppContext } from "../../contexts/AppContext";

const AutohideSnackbar = () => {
  const { isSnackbarOpen, setIsSnackbarOpen, snackbarMessage, setSnackbarMessage } =
    useContext(AppContext);

  const handleClose = () => {
    setIsSnackbarOpen(false);
    setSnackbarMessage("");
  };

  return (
    <Snackbar
      open={isSnackbarOpen}
      autoHideDuration={5000}
      onClose={handleClose}
      message={snackbarMessage}
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
    />
  );
};

export default AutohideSnackbar;
