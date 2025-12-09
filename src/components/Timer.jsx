import { useContext, useRef, useState } from "react";
import Rate from "../classes/Rate";
import { AppContext } from "../contexts/AppContext";

const Timer = () => {
  const timerDuration = 2;

  const { rates, setRates } = useContext(AppContext);

  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [seconds, setSeconds] = useState(0);
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
    updateTaps(1);
    initialDate = new Date();
    interval.current = setInterval(timer, 100);
  };

  const timer = () => {
    const currentDate = new Date();
    const deltaDate = (currentDate - initialDate) / 1000;
    setSeconds(deltaDate);
    if (deltaDate >= timerDuration) {
      clearInterval(interval.current);
      setIsTimerRunning(false);
      setRates([
        ...rates,
        new Rate((60 / timerDuration) * refTaps.current, initialDate),
      ]);
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
      <h1>Timer</h1>
      Please tap this heart for every full breath your pet takes (a full breath
      includes breathing in and breathing out) as the timer runs below.
      <br />
      <img
        src="/heart.svg"
        onClick={
          isTimerRunning ? () => updateTaps(stateTaps + 1) : initializeTimer
        }
      />
      <br />
      <i>Timer:</i> {seconds}
      <br />
      <i>Tap Count:</i> {stateTaps}
      <br />
      <br />
      <button onClick={reset}>Reset</button>
    </>
  );
};

export default Timer;
