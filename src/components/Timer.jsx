/* eslint-disable react/prop-types */
export default function Timer({secondsRemaining}) {
  const secondsToDisplay = secondsRemaining % 60;
  const minutesRemaining = (secondsRemaining - secondsToDisplay) / 60;
  const minutesToDisplay = minutesRemaining % 60;
  const hoursToDisplay = (minutesRemaining - minutesToDisplay) / 60;

  return (
    <div className="w-1/2 h-fit flex items-start justify-center gap-5 p-3">
      <div className="flex flex-col justify-center items-center">
        <div className="w-fit h-fit text-6xl sm:text-9xl border border-black flex justify-center items-center p-2">
          {twoDigits(hoursToDisplay)}:{twoDigits(minutesToDisplay)}:
          {twoDigits(secondsToDisplay)}
        </div>
      </div>
    </div>
  );
}

const twoDigits = (num) => String(num).padStart(2, "0");
