import { useContext, useRef, useState } from "react";
import Rate from "../classes/Rate";
import { AppContext } from "../contexts/AppContext";
import { formatDate } from "../common/utils";

const Timer = () => {
  const timerDuration = 5;

  const { rates, setRates } = useContext(AppContext);

  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [seconds, setSeconds] = useState(timerDuration);
  const [stateTaps, setStateTaps] = useState(0);

  const refTaps = useRef(0);
  const interval = useRef();

  let initialDate;

  const updateTaps = (newTaps) => {
    refTaps.current = newTaps;
    setStateTaps(newTaps);
  };

  const initializeTimer = () => {
    setIsTimerRunning(true);
    // Record first tap
    updateTaps(1);
    initialDate = new Date();
    interval.current = setInterval(timer, 100);
  };

  const timer = () => {
    const currentDate = new Date();
    const deltaDate = (currentDate - initialDate) / 1000;
    setSeconds(timerDuration - deltaDate);
    if (timerDuration - deltaDate < 0) {
      // Stop timer
      clearInterval(interval.current);
      setIsTimerRunning(false);
      // Add rate to history
      setRates([
        ...rates,
        new Rate((60 / timerDuration) * refTaps.current, initialDate),
      ]);
      // Alert user of rate
      alert(
        (60 / timerDuration) * refTaps.current +
          " breaths/minute added to rate history on " +
          formatDate(initialDate) +
          "."
      );
      // Reset timer
      setSeconds(timerDuration);
      // Reset taps
      updateTaps(0);
    }
  };

  const reset = () => {
    setIsTimerRunning(false);
    setSeconds(0);
    updateTaps(0);
    clearInterval(interval.current);
  };

  return (
    <>
      <h3>Timer</h3>
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
      <button onClick={reset}>Reset</button>
      <br />
    </>
  );
};

export default Timer;
