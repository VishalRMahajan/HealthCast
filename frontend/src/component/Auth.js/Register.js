import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { BACKEND_URL } from "../../setup";
import useUserContext from "../../hooks/useUserContext";

const Register = ({ setPage }) => {
  const { dispatch } = useUserContext();

  const [isLoaded, setIsLoaded] = useState(false);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [showOTP, setShowOTP] = useState(false);
  const [otp, setOtp] = useState("");

  const [error, setError] = useState("");

  console.log(isLoaded);

  useEffect(() => {
    setPage("register");
    setIsLoaded(true);
  }, [setPage]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (showOTP) {
      if (otp === "") {
        setError("Please fill the OTP");
      } else {
        setError("");
        const response = await fetch(`${BACKEND_URL}/auth/verify`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, otp }),
        });
        if (!response.ok) {
          const data = await response.json();
          setError(data.detail);
          return;
        }
        const data = await response.json();
        dispatch({ type: "LOGIN", payload: data.access_token });
        setEmail("");
        setUsername("");
        setPassword("");
        setOtp("");
        setShowOTP(false);
        setError("");
      }
    } else {
      if (email === "" || username === "" || password === "") {
        setError("Please fill all the fields");
      } else {
        if (password.length < 8) {
          setError("Password must be at least 8 characters long");
          return;
        }
        setError("");
        const response = await fetch(`${BACKEND_URL}/auth/register`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, username, password }),
        });
        const data = await response.json();
        if (!response.ok) {
          setError(data.detail);
          return;
        }
        console.log(data);
        setShowOTP(true);
      }
    }
  };

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
          <form onSubmit={handleSubmit}>
            {showOTP ? (
              <input
                type="number"
                placeholder="OTP"
                className={`border-[2.5px] focus:border-orange-400 text-xl font-bold py-3 px-4 m-2 w-full rounded-md text-center tracking-widest ${
                  username !== "" ? "border-green-500" : "border-gray-500"
                }`}
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
              />
            ) : (
              <>
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
              </>
            )}
            {error !== null && error !== "" ? (
              <p className="text-red-600 font-semibold ml-2">{error}</p>
            ) : (
              <hr className="w-0 h-0 m-4" />
            )}
            <div className="flex justify-end mt-2 gap-4">
              {!showOTP && (
                <Link className="py-2 text-lg font-semibold" to="/login">
                  Sign in
                </Link>
              )}
              <button
                type="submit"
                className="bg-green-500 text-white py-2 text-lg font-semibold rounded-lg px-5"
              >
                {showOTP ? "Verify" : "Send OTP"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
