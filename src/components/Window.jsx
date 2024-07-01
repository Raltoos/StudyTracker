/* eslint-disable react/prop-types */
import { useRef, useState, useEffect } from "react";
import AlarmClock from "./AlarmClock";
import Button from "./Button";

export default function Window({init}) {
  const [time, setTime] = useState(init);
  useEffect(() => {
    setTime(init);
  }, [init]);
  const secondRef = useRef(0);
  const minutesRef = useRef(0);
  const hoursRef = useRef(0);

  function handleSubmit(e) {
    e.preventDefault();

    let seconds = parseInt(secondRef.current.value) || 0;
    let minutes = parseInt(minutesRef.current.value) || 0;
    let hours = parseInt(hoursRef.current.value) || 0;

    let timerTime = seconds + minutes * 60 + hours * 3600;

    setTime(timerTime);
  }
  return (
    <div className="w-1/2 h-fit flex flex-col justify-center items-center">
      <form
        className="flex flex-col gap-2 border border-black p-2 rounded-md mb-4 bg-slate-200"
        onSubmit={handleSubmit}
      >
        <p>Enter the time</p>

        <div className="flex gap-2">
          <input
            ref={hoursRef}
            type="number"
            className="border border-black w-12 px-1 bg-slate-200 text-black"
            placeholder="00"
          />
          <p>:</p>
          <input
            ref={minutesRef}
            type="number"
            className="border border-black w-12 px-1 bg-slate-200 text-black"
            placeholder="00"
          />
          <p>:</p>
          <input
            ref={secondRef}
            type="number"
            className="border border-black w-12 px-1 bg-slate-200 text-black"
            placeholder="00"
          />
        </div>

        <Button>Set time</Button>
      </form>
      <AlarmClock INITIAL_COUNT={time} />
    </div>
  );
}
