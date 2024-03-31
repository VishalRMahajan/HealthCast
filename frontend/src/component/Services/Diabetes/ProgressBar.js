import React from "react";

const ProgressBar = ({ progress }) => {
  let bgColor;
  if (progress > 80) {
    bgColor = "bg-red-500";
  } else if (progress > 60) {
    bgColor = "bg-orange-500";
  } else if (progress > 40) {
    bgColor = "bg-yellow-500";
  } else if (progress > 20) {
    bgColor = "bg-green-500";
  } else {
    bgColor = "bg-green-500";
  }
  return (
    <div className="ProgressBar w-full h-5 rounded-full border-solid border-2 border-gray-400 overflow-hidden">
      <div
        className={`${bgColor} h-full rounded-r-full `}
        style={{ width: `${progress}%` }}
      ></div>
    </div>
  );
};

export default ProgressBar;
