import React, { useEffect, useState } from "react";

const AnimatedResult = ({ result }) => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    console.log("LOADED");
    setIsLoaded(true);
  }, []);

  return (
    <>
      <div className="w-[1px] bg-gray-500 mx-6 my-3"></div>
      <div
        className={`Result transition-width duration-1000`}
        style={{
          width: isLoaded ? "65%" : "0%",
        }}
      >
        <h1 className="font-semibold text-2xl">Diagnosis Result</h1>
        <hr />
        <p className="font-medium text-xl my-2">Disease</p>
        <p>{result.Disease}</p>
        <p className="font-medium text-xl my-2">Description</p>
        <p>{result.Description}</p>
        <p className="font-medium text-xl my-2">Precautions</p>
        <ul>
          {result.Precautions.map((recommandation, index) => (
            <li key={index} className="list-disc ml-4">
              {recommandation}
            </li>
          ))}
        </ul>

        <p className="font-medium text-xl my-2">Disclamer</p>
        <p>Prediciton is based on the data on which model is trained. We CORS Crushers do not guarantee about the prediciton. Please Consult you doctor before it is too late.</p>
      </div>
    </>
  );
};

export default AnimatedResult;
