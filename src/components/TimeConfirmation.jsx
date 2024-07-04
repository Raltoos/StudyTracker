/* eslint-disable react/prop-types */
export default function TimeConfirmation({ onConfirm, onCancel }) {
    return (
      <div className="flex flex-col items-center m-2">
        <p>Are you sure ?</p>
        <div className="w-1/2 flex justify-between">
          <button onClick={onCancel} className="button-text">
            No
          </button>
          <button onClick={onConfirm} className="button">
            Yes
          </button>
        </div>
      </div>
    );
  }