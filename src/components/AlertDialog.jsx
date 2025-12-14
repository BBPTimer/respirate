import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import { useContext } from "react";
import { AppContext } from "../contexts/AppContext";

export default function AlertDialog() {
  const { isDialogOpen, dialogMessage, dialogCallback, cleanUpDialog } =
    useContext(AppContext);

  return (
    <>
      <Dialog open={isDialogOpen} onClose={cleanUpDialog}>
        <DialogContent>
          <DialogContentText>{dialogMessage}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={cleanUpDialog}>Cancel</Button>
          <Button onClick={dialogCallback} autoFocus>
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
