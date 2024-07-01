/* eslint-disable react/prop-types */
import { useState, useEffect, useRef } from 'react';
import Button from './Button';
import timerSound from '../assets/timer-over.mp3';
import timerEnd from '../assets/timer-near-end.mp3';

const STATUS = {
  STARTED: 'Started',
  STOPPED: 'Stopped',
};

const TimerOver = new Audio(timerSound);
const TimerEnd = new Audio(timerEnd);

export default function CountdownApp({ INITIAL_COUNT }) {
  const [secondsRemaining, setSecondsRemaining] = useState(INITIAL_COUNT);
  const [status, setStatus] = useState(STATUS.STOPPED);

  useEffect(() => {
    setSecondsRemaining(INITIAL_COUNT);
    setStatus(STATUS.STOPPED);
  }, [INITIAL_COUNT]);

  useEffect(() => {
    if (secondsRemaining <= 10 && secondsRemaining > 0 && status === "Started") {
      if (TimerEnd.paused || !TimerEnd.currentTime) {
        TimerEnd.play();
      }
    }
  }, [secondsRemaining, status]);
  
  const secondsToDisplay = secondsRemaining % 60;
  const minutesRemaining = (secondsRemaining - secondsToDisplay) / 60;
  const minutesToDisplay = minutesRemaining % 60;
  const hoursToDisplay = (minutesRemaining - minutesToDisplay) / 60;

  const handleStart = () => {
    if(secondsRemaining > 0)TimerEnd.play();
    setStatus(STATUS.STARTED);
  };

  const handleStop = () => {
    TimerEnd.pause();
    TimerOver.pause();
    setStatus(STATUS.STOPPED);
  };

  const handleReset = () => {
    setStatus(STATUS.STOPPED);
    setSecondsRemaining(INITIAL_COUNT);
  };

  useInterval(
    () => {
      if (secondsRemaining > 0) {
        setSecondsRemaining(secondsRemaining - 1);
      } else {
        TimerEnd.pause();
        TimerOver.play();
        setStatus(STATUS.STOPPED);
      }
    },
    status === STATUS.STARTED ? 1000 : null
  );

  return (
    <div className="w-1/2 h-fit flex flex-col items-center justify-center">
      <div className="w-fit h-fit text-8xl border border-black flex justify-center p-2">
        {twoDigits(hoursToDisplay)}:{twoDigits(minutesToDisplay)}:{twoDigits(secondsToDisplay)}
      </div>
      <div>Status: {status}</div>
      <div className="flex gap-2 mt-3">
        <Button onClick={handleStart}>Start</Button>
        <Button onClick={handleStop}>Stop</Button>
        <Button onClick={handleReset}>Reset</Button>
      </div>
    </div>
  );
}

function useInterval(callback, delay) {
  const savedCallback = useRef();

  // Remember the latest callback.
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Set up the interval.
  useEffect(() => {
    function tick() {
      savedCallback.current();
    }
    if (delay !== null) {
      let id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
}

const twoDigits = (num) => String(num).padStart(2, '0');
