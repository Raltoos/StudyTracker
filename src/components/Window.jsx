/* eslint-disable react/prop-types */
import { useEffect, useState, useRef } from "react";
import AlarmClock from "./AlarmClock";
import Modal from "./Modal";
import TimeConfirmation from "./TimeConfirmation";
import SetTime from "./SetTime";

export default function Window({ init }) {
  const [time, setTime] = useState(init);
  const [totalSeconds, setTotalSeconds] = useState([0, 0]);
  // const [isModalOpen, setIsModalOpen] = useState(false);
  const modal = useRef();

  useEffect(() => {
    setTime(init);
  }, [init]);

  function handleStart() {
    // setIsModalOpen(true);
    modal.current.open();
  }

  function handleCancel() {
    // setIsModalOpen(false);
    modal.current.close();
  }

  function handleConfirm() {
    setTime(totalSeconds);
    // setIsModalOpen(false);
    modal.current.close();
  }

  return (
    <div className="w-full h-full flex flex-col justify-center items-center ">
      <Modal ref={modal}>
        <SetTime setTotalSeconds={setTotalSeconds} />
        <TimeConfirmation onCancel={handleCancel} onConfirm={handleConfirm} />
      </Modal>

      <div className="h-fit w-fit flex flex-col items-center overflow-hidden cursor-pointer transition">
        <p
          className="text-xl font-bold hover:text-red-500 mb-2"
          onClick={handleStart}
        >
          --Set up the timer--
        </p>
      </div>
      <AlarmClock initialTime={time} />
    </div>
  );
}
