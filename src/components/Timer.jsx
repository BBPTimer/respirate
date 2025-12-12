import { Replay } from "@mui/icons-material";
import { IconButton, Tooltip } from "@mui/material";
import { useContext, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router";
import { formatDate } from "../common/utils";
import { AppContext } from "../contexts/AppContext";

const Timer = () => {
  const { addRate } = useContext(AppContext);

  const reminderDays = 30;
  // Initialize React Router navigator
  const navigate = useNavigate();
  // Prompt user to back up data and redirect user to Data component
  const backupReminder = () => {
    // If user has no lastBackup in local storage, set to today
    if (!localStorage.getItem("lastBackup")) {
      localStorage.setItem("lastBackup", new Date());
    }
    // Get lastBackup from local storage
    const lastBackup = new Date(localStorage.getItem("lastBackup"));
    // Compare last backup date to today
    if (new Date() - lastBackup > reminderDays * 24 * 60 * 60 * 1000) {
      // Alert user to backup data
      alert(
        "Data last backed up on " +
          formatDate(lastBackup) +
          ". We recommend backing up your data regularly!"
      );
      // Redirect to Data component
      navigate("/data");
      // Update lastBackup in local storage to today
      localStorage.setItem("lastBackup", new Date());
    }
  };
  // Run backup reminder on first render
  useEffect(backupReminder, []);

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

  const timerDuration = 30;
  const [seconds, setSeconds] = useState(timerDuration);

  const reset = () => {
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

      // Add rate to history
      addRate((60 / timerDuration) * refTaps.current, initialDate);

      reset();
    }
  };

  return (
    <>
      <h3>Timer</h3>
      <div className="white-bg">
        Tap this heart for every full breath your pet takes as the timer runs
        below.
        <br />
        <img
          id="heart"
          src="/heart.svg"
          onClick={
            isTimerRunning ? () => updateTaps(stateTaps + 1) : initializeTimer
          }
        />
        <br />
        <i>Timer:</i> {Math.floor(seconds)}
        <br />
        <i>Tap Count:</i> {stateTaps}
        <br />
        <br />
        <Tooltip title="Reset">
          <IconButton onClick={reset}>
            <Replay />
          </IconButton>
        </Tooltip>
      </div>
    </>
  );
};

export default Timer;
