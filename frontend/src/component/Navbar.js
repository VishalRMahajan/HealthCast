import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="Navbar sticky top-0 z-50 grow-0 bg-teal-400 rounded-full shadow-lg px-10 py-3 flex justify-between mb-8">
      <Link
        to="/"
        className="flex items-center tracking-wider transition-all text-2xl font-bold text-white/90 brandName hover:text-white"
      >
        {/* <img src="favicon.png" alt="logo" className="logo w-10" /> */}
        <span>Health</span>
        <span>Cast</span>
      </Link>
      <div className="buttonContainer flex gap-6 justify-between text-white font-semibold text-lg">
        <Link>Services</Link>
        <Link>About</Link>
        <Link>Contact us</Link>
        <Link to="/auth">Login</Link>
      </div>
    </div>
  );
};

export default Navbar;
