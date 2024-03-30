import React, { useState, useEffect } from "react";

const About = ({ setPage }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  console.log(isLoaded);

  useEffect(() => {
    setPage("about");
    setIsLoaded(true);
  }, [setPage]);

  return <div>About</div>;
};

export default About;
