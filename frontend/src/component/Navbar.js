import React from "react";
import { Link } from "react-router-dom";

const Navbar = ({ page }) => {
  return (
    <div className="Navbar flex grow-0 items-center justify-between">
      <Link to="/" className="Brand flex items-center">
        <img src="app_icon.png" alt="" className="w-8 mr-2" />
        <h1>
          <span className="text-green-500 font-bold text-2xl">HEALTH</span>
          <span className="text-orange-400 font-bold text-2xl">CAST</span>
        </h1>
      </Link>
      <div className="Menu font-semibold text-xl">
        <Link
          to="/"
          className={`NavLink ${page === "home" ? "active" : ""}`}
        >
          Home
        </Link>
        <Link
          to="/services"
          className={`NavLink ${page === "services" ? "active" : ""}`}
        >
          Services
        </Link>
        <Link
          to="/about"
          className={`NavLink ${page === "about" ? "active" : ""}`}
        >
          About
        </Link>
        {/* <Link
          to="/contact"
          className={`NavLink ${page === "contact" ? "active" : ""}`}
        >
          Contact
        </Link> */}
      </div>
      <div className="AuthLink font-semibold text-xl">
        <Link
          to="/login"
          className={`NavLink ${page === "login" ? "active" : ""}`}
        >
          Sign In
        </Link>
        <Link
          to="/register"
          className={`Navlink px-4 py-3 text-white rounded ${page === "register" ? "bg-green-400 hover:bg-green-500" : "bg-orange-400 hover:bg-orange-500"}`}
        >
          Sign Up
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
