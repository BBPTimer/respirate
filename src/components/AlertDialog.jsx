import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import { useContext } from "react";
import { AppContext } from "../contexts/AppContext";

export default function AlertDialog() {
  const { isConfirmOpen, confirmMessage, confirmCallback, cleanUpConfirm } =
    useContext(AppContext);

  return (
    <Dialog open={isConfirmOpen} onClose={cleanUpConfirm}>
      <DialogContent>
        <DialogContentText>{confirmMessage}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={cleanUpConfirm}>Cancel</Button>
        <Button onClick={confirmCallback} autoFocus>
          OK
        </Button>
      </DialogActions>
    </Dialog>
  );
}
