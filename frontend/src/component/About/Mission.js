import React from "react";

const Mission = () => {
  return (
    <div className="Mission flex items-center">
      <img src="mission.png" alt="" className="w-[40%]" />
      <div className="w-full ml-10">
        <h1 className="text-center font-semibold text-3xl mb-3">Our Mission</h1>
        <p className="text-justify text-xl">
          At HealthCast, our mission is to revolutionize healthcare delivery
          through innovative technology and predictive analytics. We are
          committed to empowering healthcare professionals with advanced tools
          and insights that enhance diagnostic accuracy, improve treatment
          decisions, and ultimately, transform patient outcomes. By harnessing
          the power of data and cutting-edge algorithms, we strive to create a
          future where every individual receives timely and personalized care,
          leading to healthier communities and a better quality of life for all.
        </p>
      </div>
    </div>
  );
};

export default Mission;
