import React from "react";

const Metric = ({ icon, text }) => {
  return (
    <div className="flex flex-col items-center">
      <div className="rounded-full bg-green-600 hover:bg-green-500 transition-colors w-24 h-24 text-white flex justify-center items-center text-5xl">
        <i class={icon}></i>
      </div>
      <p className="mt-2 font-semibold ">{text}</p>
    </div>
  );
};

export default Metric;
