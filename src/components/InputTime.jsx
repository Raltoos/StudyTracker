/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";

export default function InputTime({setTotalSeconds, title, idx}) {
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  

  useEffect(() => {
    const calculatedSeconds = seconds + minutes * 60 + hours * 3600;
    setTotalSeconds(prev => {
        let newP = [...prev];
        newP[idx] = calculatedSeconds;
        return newP;
    });
  }, [hours, minutes, seconds]);

  const handleInputChange = (setter) => (e) => {
    const value = parseInt(e.target.value) || 0;
    setter(value);
  };

  return (
    <div className="flex flex-col gap-3">
      <p>Enter the {title} time</p>
      
      <div className="flex items-center gap-2">
        <input
          type="number"
          className="border border-black w-12 px-1 bg-slate-200 text-black"
          placeholder="00"
          min="0"
          value={hours}
          onChange={handleInputChange(setHours)}
        />
        <p>:</p>
        <input
          type="number"
          className="border border-black w-12 px-1 bg-slate-200 text-black"
          placeholder="00"
          min="0"
          max="59"
          value={minutes}
          onChange={handleInputChange(setMinutes)}
        />
        <p>:</p>
        <input
          type="number"
          className="border border-black w-12 px-1 bg-slate-200 text-black"
          placeholder="00"
          min="0"
          max="59"
          value={seconds}
          onChange={handleInputChange(setSeconds)}
        />
      </div>
    </div>
  );
}