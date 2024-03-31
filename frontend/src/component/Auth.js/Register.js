import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Register = ({ setPage }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  // const [otp, setOtp] = useState("");
  const [error] = useState("");

  console.log(isLoaded);

  useEffect(() => {
    setPage("register");
    setIsLoaded(true);
  }, [setPage]);

  const inputStyle =
    "border-[2.5px] focus:border-orange-400 text-lg py-3 px-4 m-2 w-full rounded-md";
  return (
    <div
      className={`Register px-24 pt-8 pb-16 h-full flex justify-center items-center ${
        isLoaded ? "slide-in" : ""
      }`}
    >
      <div className="RegisterContainer flex w-[70%] rounded-[40px] shadow-lg p-16">
        <div className="RightRegister w-[50%]">
          <img src="app_icon.png" alt="" className="w-[20%]" />
          <h1 className="text-6xl font-semibold my-5 w-fit">Sign up</h1>
          <p className="text-xl w-fit">to continue to HealthCast</p>
        </div>
        <div className="LeftRegister w-[50%]">
          <form>
            <input
              type="email"
              placeholder="Email"
              className={`${inputStyle} ${
                username !== "" ? "border-green-500" : "border-gray-500"
              }`}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="text"
              placeholder="Username"
              className={`${inputStyle} ${
                username !== "" ? "border-green-500" : "border-gray-500"
              }`}
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              className={`${inputStyle} ${
                password !== "" ? "border-green-500" : "border-gray-500"
              }`}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {error !== null && error !== "" ? (
              <p className="text-red-600 font-semibold ml-2">{error}</p>
            ) : (
              <hr className="w-0 h-0 m-4" />
            )}
            <div className="flex justify-end mt-2 gap-4">
              <Link className="py-2 text-lg font-semibold" to="/login">
                Sign in
              </Link>
              <button
                type="submit"
                className="bg-green-500 text-white py-2 text-lg font-semibold rounded-lg px-5"
              >
                Send OTP
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
