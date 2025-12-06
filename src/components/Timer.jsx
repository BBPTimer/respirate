import { useRef, useState } from "react";

const Timer = () => {
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [seconds, setSeconds] = useState(0);
  const [taps, setTaps] = useState(0);
  const interval = useRef();
  let initialDate;

  const initializeTimer = () => {
    setIsTimerRunning(true);
    setTaps(1);
    initialDate = new Date();
    interval.current = setInterval(timer, 100);
  };

  const timer = () => {
    const currentDate = new Date();
    const deltaDate = (currentDate - initialDate) / 1000;
    setSeconds(deltaDate);
    if (deltaDate >= 5) {
      clearInterval(interval.current);
      setIsTimerRunning(false);
    }
  };

  const reset = () => {
    setIsTimerRunning(false);
    setSeconds(0);
    setTaps(0);
    clearInterval(interval.current);
  };

  return (
    <>
      Please tap this heart for every full breath your pet takes (a full breath
      includes breathing in and breathing out) as the timer runs below.
      <br />
      <img
        src="src/assets/heart.svg"
        onClick={isTimerRunning ? () => setTaps(taps + 1) : initializeTimer}
      />
      <br />
      <i>Timer:</i> {seconds}
      <br />
      <i>Tap Count:</i> {taps}
      <br />
      <br />
      <button onClick={reset}>Reset</button>
    </>
  );
};

export default Timer;
