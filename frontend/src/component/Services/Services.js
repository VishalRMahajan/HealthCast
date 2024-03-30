import React, { useEffect, useState } from "react";

const Services = ({ setPage }) => {
  useEffect(() => {
    setPage("services");
  }, []);
  return <div>Services</div>;
};

export default Services;
