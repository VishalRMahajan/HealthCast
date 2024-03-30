import React, { useState, useEffect } from "react";

const Contact = ({ setPage }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  console.log(isLoaded);

  useEffect(() => {
    setPage("contact");
    setIsLoaded(true);
  }, [setPage]);

  return <div>Contact</div>;
};

export default Contact;
