import React, { useState, useEffect } from "react";

const Contact = ({ setPage }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  console.log(isLoaded);

  useEffect(() => {
    setPage("contact");
    setIsLoaded(true);
  }, [setPage]);

  const inputStyle =
    "border-[2.5px] focus:border-orange-400 outline-none text-lg py-3 px-4 m-2 w-full rounded-md";
  return (
    <div
      className={`Register px-24 pt-8 pb-16 h-full flex justify-center items-center ${
        isLoaded ? "slide-in" : ""
      }`}
    >
      <div className="flex w-full">
        <div className="w-[50%]"></div>
        <div className="w-[50%]">
          
        </div>
      </div>
    </div>
  );
};

export default Contact;
