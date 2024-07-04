/* eslint-disable react/prop-types */
import InputTime from "./InputTime";

export default function SetTime({ setTotalSeconds }) {
  
  return (
    <form
      className="w-full flex flex-col justify-center items-center gap-1 p-2 rounded-md mb-2"
    >
      <InputTime setTotalSeconds={setTotalSeconds} title="study" idx={0}/>
      <InputTime setTotalSeconds={setTotalSeconds} title="break" idx={1}/>
    </form>
  );
}
