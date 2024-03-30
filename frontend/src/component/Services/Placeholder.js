import React from "react";

const Placeholder = () => {
  return (
    <div className="Placeholder grow flex items-center justify-center">
      <div className="opacity-50 text-center">
        <img src="app_icon.png" alt="" className="w-96" />
        <h1 className="text-4xl font-bold mt-5 tracking-wider">
          <span className="text-green-500">HEALTH</span>
          <span className="text-orange-400">CAST</span>
        </h1>
        <p className="font-semibold text-lg">
          Click on a service to get started
        </p>
      </div>
    </div>
  );
};

export default Placeholder;
