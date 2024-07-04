/* eslint-disable react/prop-types */
import { useState, useEffect, useRef } from "react";
import Button from "./Button";
import Timer from "./Timer";
import timerSound from "../assets/timer-over.mp3";
import timerEnd from "../assets/timer-near-end.mp3";

const STATUS = {
  STARTED: "Started",
  STOPPED: "Stopped",
  FINISHED: "Finished",
};

const TimerOver = new Audio(timerSound);
const TimerEnd = new Audio(timerEnd);

export default function CountdownApp({ initialTime }) {
  const [secondsRemaining1, setSecondsRemaining1] = useState(initialTime[0]);
  const [secondsRemaining2, setSecondsRemaining2] = useState(initialTime[1]);
  const [status, setStatus] = useState([STATUS.STOPPED, STATUS.STOPPED]);


  //for handling changes in initial time
  useEffect(() => {
    setSecondsRemaining1(initialTime[0]);
    setSecondsRemaining2(initialTime[1]);
    setStatus([STATUS.STOPPED, STATUS.STOPPED]);
  }, [initialTime]);

  useEffect(() => {
    if (
      secondsRemaining1 <= 10 &&
      secondsRemaining1 > 0 &&
      status[0] === "Started"
    ) {
      if (TimerEnd.paused || !TimerEnd.currentTime) {
        TimerEnd.play();
      }
    }
  }, [secondsRemaining1, secondsRemaining2, status]);

  const handleStart = () => {
    if (secondsRemaining1 > 0) TimerEnd.play();
    if (secondsRemaining1 > 0) {
      setStatus((prev) => {
        let newStatus = [...prev];
        newStatus[0] = STATUS.STARTED;
        return newStatus;
      });
    }else setStatus((prev) => {
      let newStatus = [...prev];
      newStatus[1] = STATUS.STARTED;
      return newStatus;
    });
  };

  const handleStop = () => {
    TimerEnd.pause();
    TimerOver.pause();
    setStatus([STATUS.STOPPED, STATUS.STOPPED]);
  };

  const handleReset = () => {
    TimerEnd.pause();
    TimerOver.pause();
    setStatus([STATUS.STOPPED, STATUS.STOPPED]);
    setSecondsRemaining1(initialTime[0]);
    setSecondsRemaining2(initialTime[1]);
  };

  useInterval(
    () => {
      if (secondsRemaining1 <= 0) {
        setStatus((prev) => {
          let newStatus = [...prev];
          newStatus[0] = STATUS.FINISHED;
          newStatus[1] = STATUS.STARTED;
          return newStatus;
        });
      }
      if (secondsRemaining2 <= 0) {
        setStatus((prev) => {
          let newStatus = [...prev];
          newStatus[1] = STATUS.FINISHED;
          return newStatus;
        });
      }
      if (secondsRemaining1 > 0 && status[0] !== STATUS.FINISHED) {
        setSecondsRemaining1(secondsRemaining1 - 1);
      } else if (
        secondsRemaining1 <= 0 &&
        status[0] === STATUS.FINISHED &&
        (secondsRemaining2 > 0 || status[1] !== STATUS.FINISHED)
      ) {
        setSecondsRemaining2(secondsRemaining2 - 1);
      } else {
        TimerEnd.pause();
        TimerOver.play();
      }
    },
    ((status[0] === STATUS.STARTED || status[1] === STATUS.STARTED) ? 1000 : null)
  );

  return (
    <>
      <div className="h-fit w-fit flex justify-start gap-2 mt-3">
        <Button onClick={handleStart}>Start</Button>
        <Button onClick={handleStop}>Stop</Button>
        <Button onClick={handleReset}>Reset</Button>
      </div>
      {secondsRemaining1 > 0 ? (
        <Timer secondsRemaining={secondsRemaining1} />
      ) : (
        <div className="opacity-65 flex justify-center"><Timer secondsRemaining={0} /></div>
      )}
      {(secondsRemaining2 > 0 && status[0] == STATUS.FINISHED) ? (
        <Timer secondsRemaining={secondsRemaining2} />
      ) : (
        <div className="opacity-65 flex justify-center"><Timer secondsRemaining={secondsRemaining2>0?secondsRemaining2:0} /></div>
      )}
    </>
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