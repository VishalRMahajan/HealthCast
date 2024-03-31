import React, { useEffect, useState } from "react";
import "./Services.css";
import Diabetes from "./Diabetes/Diabetes";
import Placeholder from "./Placeholder";
import Disease from "./Disease/Disease";

const Services = ({ setPage }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [param, setParam] = useState("");
  useEffect(() => {
    setIsLoaded(true);
    setPage("services");
  }, [setPage]);

  return (
    <div
      className={`Services grow flex px-7 pt-8 ${isLoaded ? "slide-in" : ""}`}
    >
      <div className="List min-w-56">
        <h1 className="font-bold text-3xl">Our Services</h1>
        <div className="mt-5 text-xl font-bold text-gray-500">
          <hr />
          <p
            className={`cursor-pointer transition-colors ${
              param === "diabetes" ? "text-orange-400" : ""
            }`}
            onClick={() => setParam("diabetes")}
          >
            Diabetes Checking
          </p>
          <hr />

          <p
            className={`cursor-pointer transition-colors ${
              param === "disease" ? "text-orange-400" : ""
            }`}
            onClick={() => setParam("disease")}
          >
            Disease Prediction
          </p>
        </div>
      </div>
      <div className="w-[1px] h-full bg-gray-500 mx-6 my-3"></div>
      {param === "" && <Placeholder />}
      {param === "diabetes" && <Diabetes />}
      {param === "disease" && <Disease />}
    </div>
  );
};

export default Services;
