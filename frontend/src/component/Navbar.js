import React from "react";

const Navbar = () => {
  return (
    <div className="Navbar bg-teal-400 rounded-full shadow-lg px-10 py-3 flex justify-between ">
      <a
        href="/"
        className="flex items-center tracking-wider transition-all text-2xl font-bold text-white/90 brandName hover:text-white"
      >
        {/* <img src="favicon.png" alt="logo" className="logo w-10" /> */}
        <span>Health</span>
        <span>Cast</span>
      </a>
      <div className="buttonContainer flex gap-6 justify-between text-white font-semibold text-lg">
        <button>Services</button>
        <button>About</button>
        <button>Contact us</button>
        <button className=" border-2 border-white transition-all rounded-full py-1 px-3 shadow hover:shadow-md flex items-center">
          Login
        </button>
      </div>
    </div>
  );
};

export default Navbar;
