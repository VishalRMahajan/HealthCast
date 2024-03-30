import React, { useState, useEffect } from "react";

import Mission from "./Mission";
import Team from "./Team";
import Tech from "./Tech";

const About = ({ setPage }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  console.log(isLoaded);

  useEffect(() => {
    setPage("about");
    setIsLoaded(true);
  }, [setPage]);

  return (
    <div className={`About px-24 pt-8 pb-16 ${isLoaded ? "slide-in" : ""}`}>
      <Mission />
      <Team />
      <Tech />
    </div>
  );
};

export default About;
