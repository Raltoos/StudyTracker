import Window from "./components/Window";

function App() {
  return (
    <div className="w-full h-full md:h-screen flex flex-col items-center justify-center bg-teal-200">
      <div className="w-full flex flex-col justify-center items-center mb-10">
        <h1 className="text-5xl mb-5 text-center mt-2">Pomodoro Timer</h1>
        <p className="w-8/12 text-center border border-black rounded-md shadow-md">
          The Pomodoro Technique is a time management method developed by
          Francesco Cirillo in the late 1980s. It uses a kitchen timer to break
          work into intervals, typically 25 minutes in length, separated by
          short breaks. Each interval is known as a pomodoro, from the Italian
          word for tomato, after the tomato-shaped kitchen timer Cirillo used as
          a university student
        </p>
      </div>
      <Window init={[1500, 300]} />
    </div>
  );
}

export default App;
