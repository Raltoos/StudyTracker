import Window from "./components/Window.jsx";
import { useReducer } from "react";

function displayReducer(state, action) {
  if (action.type == "pomodoro") {
    return <Window init={1500}/>;
  }
  if (action.type == "break") {
    return <Window init={300}/>;
  }
  return state;
}

function App() {
  const [displayState, displayStateDispatch] = useReducer(
    displayReducer,
    <Window init={1500}/>
  );

  let styles = "border border-black w-1/2 flex justify-center items-center p-2 cursor-pointer shadow-lg hover:shadow-sm hover:scale-95 transition-all";

  let styles1 = "w-screen h-screen flex flex-col items-center justify-center ";

  if(displayState.props.init == 1500) styles1 += "bg-cyan-300";
  else styles1 += "bg-blue-300";
  return (
    <div className={styles1}>
      <div className="w-1/2 flex justify-evenly m-4">
        <div className={styles} onClick={() => displayStateDispatch({ type: "pomodoro"})}>Pomodoro</div>
        <div className={styles} onClick={() => displayStateDispatch({ type: "break"})}>Break</div>
      </div>
      {console.log(displayState.props.init)}
      {displayState}
    </div>
  );
}

export default App;
