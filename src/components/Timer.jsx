import { Replay, Speed } from "@mui/icons-material";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  IconButton,
  InputAdornment,
  OutlinedInput,
  Tooltip,
  Typography,
} from "@mui/material";
import { useContext, useRef, useState } from "react";
import { AppContext } from "../contexts/AppContext";
import AutohideSnackbar from "./AutohideSnackBar";
import BackUpButton from "./BackUpButton";
import CommentTextField from "./CommentTextField";
import PetSelector from "./PetSelector";
import SaveButton from "./SaveButton";

const Timer = () => {
  const {
    addRate,
    isBackUpDialogOpen,
    setIsBackUpDialogOpen,
    inputLabelStyle,
  } = useContext(AppContext);

  // Prompt user to back up data
  const reminderDays = 30;
  // If user has no lastBackup in local storage, set to today
  if (!localStorage.getItem("lastBackup")) {
    localStorage.setItem("lastBackup", new Date());
  }
  // Get lastBackup from local storage
  const lastBackup = new Date(localStorage.getItem("lastBackup"));
  // Compare last backup date to today
  if (new Date() - lastBackup > reminderDays * 24 * 60 * 60 * 1000) {
    // Open Confirm
    setIsBackUpDialogOpen(true);
    // Update lastBackup in local storage to today
    localStorage.setItem("lastBackup", new Date());
  }

  const [stateTaps, setStateTaps] = useState(0);
  const refTaps = useRef(0);

  const updateTaps = (newTaps) => {
    refTaps.current = newTaps;
    setStateTaps(newTaps);
  };

  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const interval = useRef();
  let initialDate;

  const initializeTimer = () => {
    setIsTimerRunning(true);
    // Record first tap
    updateTaps(1);
    initialDate = new Date();
    interval.current = setInterval(timer, 100);
  };

  const [timerDuration, setTimerDuration] = useState(
    localStorage.getItem("timerDuration") || 30
  );

  const [displayForm, setDisplayForm] = useState(false);

  const updateTimerDuration = (event) => {
    event.preventDefault();

    setTimerDuration(event.target.timerDuration.value);
    localStorage.setItem("timerDuration", event.target.timerDuration.value);

    // Reset timer
    reset(event.target.timerDuration.value);

    // Close form
    setDisplayForm(false);
  };

  const [seconds, setSeconds] = useState(timerDuration);

  const reset = (timerDuration) => {
    // Stop timer
    clearInterval(interval.current);
    setIsTimerRunning(false);
    // Reset timer
    setSeconds(timerDuration);
    // Reset taps
    updateTaps(0);
  };

  const timer = () => {
    const currentDate = new Date();
    const deltaDate = (currentDate - initialDate) / 1000;
    setSeconds(timerDuration - deltaDate);
    if (timerDuration - deltaDate < 0) {
      // Stop timer
      clearInterval(interval.current);

      // Open comment dialog
      setIsCommentDialogOpen(true);
    }
  };

  const [isCommentDialogOpen, setIsCommentDialogOpen] = useState(false);

  const handleCommentSubmit = (event) => {
    event.preventDefault();

    // Add rate to history
    addRate(
      Math.round((60 / timerDuration) * refTaps.current),
      new Date(),
      event.target.comment.value
    );

    // Reset timer
    reset(timerDuration);

    // Close comment dialog
    setIsCommentDialogOpen(false);
  };

  return (
    <>
      <PetSelector />
      {/* Backup dialog */}
      <Dialog
        open={isBackUpDialogOpen}
        onClose={() => setIsBackUpDialogOpen(false)}
      >
        <DialogContent>
          <DialogContentText>
            {
              "Data last backed up over 30 days ago. We recommend backing up your data regularly!"
            }
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => setIsBackUpDialogOpen(false)}
            variant="outlined"
            size="small"
          >
            Cancel
          </Button>
          <BackUpButton variant={"contained"} />
        </DialogActions>
      </Dialog>
      <AutohideSnackbar />

      {/* Timer */}
      <h1>Timer</h1>
      <div className="white-bg">
        Tap this heart for every full breath your pet takes as the timer runs
        below.
        <br />
        <img
          id="heart"
          src="/heart.svg"
          height={300}
          width={300}
          alt="Heart"
          onClick={
            isTimerRunning ? () => updateTaps(stateTaps + 1) : initializeTimer
          }
        />
        <table>
          <tbody>
            <tr>
              <td>Timer:</td>
              <td>{Math.ceil(seconds)}</td>
            </tr>
            <tr>
              <td>Tap Count:</td>
              <td>{stateTaps}</td>
            </tr>
          </tbody>
        </table>
        <Tooltip title="Reset">
          <IconButton onClick={() => reset(timerDuration)}>
            <Replay />
          </IconButton>
        </Tooltip>
      </div>

      {/* Timer duration */}
      <Button
        variant="outlined"
        size="small"
        disableElevation
        onClick={() => setDisplayForm(!displayForm)}
        startIcon={<Speed />}
      >
        Timer Duration
      </Button>
      {displayForm && (
        <form className="white-bg" onSubmit={updateTimerDuration}>
          <OutlinedInput
            defaultValue={timerDuration}
            endAdornment={
              <InputAdornment position="end">seconds</InputAdornment>
            }
            name="timerDuration"
            type="number"
            required
            size="small"
            slotProps={{
              input: {
                inputMode: "numeric",
                pattern: "[0-9]*",
                min: "15",
                max: "60",
              },
            }}
            sx={{ width: "180px" }}
          />
          <Typography color="grey" sx={inputLabelStyle}>
            Enter a duration between 15 and 60 seconds.
          </Typography>
          <br />
          <SaveButton />
        </form>
      )}

      {/* Comment dialog */}
      <Dialog open={isCommentDialogOpen}>
        <form onSubmit={handleCommentSubmit}>
          <DialogContent>
            <CommentTextField />
          </DialogContent>
          <DialogActions>
            <SaveButton />
          </DialogActions>
        </form>
      </Dialog>
    </>
  );
};

export default Timer;
