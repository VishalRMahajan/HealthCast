import React, { useState } from "react";

const Register = ({ login }) => {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState(false);

  const [otp, setOtp] = useState("");
  const [showOtp, setShowOtp] = useState(false);
  const [otpError, setOtpError] = useState(false);

  const [error, setError] = useState(null);
  return (
    <div className={`Register ${!login ? "Active" : ""}`}>
      <div className="AuthContainer">
        <form
          className="mobileBox shadow-lg sm:shadow-none flex flex-col"
          onSubmit={(e) => {
            console.log("Register form submitted");
          }}
        >
          <h1 className="text-teal-400 text-3xl mb-2 font-semibold">
            Register
          </h1>
          <div className="inputContainer">
            <div className={`email-password ${showOtp ? null : "Active"}`}>
              <input
                className={`text-gray-700 font-semibold tracking-wide text-lg border-solid border-2 focus:bg-teal-100 focus:border-teal-400 transition-colors duration-300 rounded-md ${
                  emailError
                    ? "border-red-500 bg-red-200 placeholder-red-500"
                    : "border-white bg-background-200"
                }`}
                type="email"
                placeholder="Email"
                name="email"
                onChange={(e) => {
                  setEmailError(false);
                  setEmail(e.target.value);
                }}
                value={email}
              />
              <input
                className={`text-gray-700 font-semibold tracking-wide text-lg border-solid border-2 focus:bg-teal-100 focus:border-teal-400 transition-colors duration-300 rounded-md ${
                  passwordError
                    ? "border-red-500 bg-red-200 placeholder-red-500"
                    : "border-white bg-background-200"
                }`}
                type="password"
                placeholder="Password"
                name="password"
                onChange={(e) => {
                  setPasswordError(false);
                  setPassword(e.target.value);
                }}
                value={password}
              />
            </div>
            <div className={`otp ${showOtp ? "Active" : null}`}>
              <input
                className={`text-center tracking-widest text-gray-700 font-semibold text-lg bg-background-200 border-solid border-2 focus:bg-teal-100 focus:border-teal-400 transition-colors duration-300 rounded-md ${
                  otpError
                    ? "border-red-500 bg-red-200 placeholder-red-500"
                    : "border-white bg-background-200"
                }`}
                type="number"
                placeholder="Enter OTP"
                name="otp"
                onChange={(e) => {
                  setOtp(e.target.value);
                }}
                value={otp}
              />
            </div>
          </div>
          {error && <p className="Error text-red-600 font-semibold">{error}</p>}
          <button
            className="btn flex relative justify-center items-center self-center text-background font-bold rounded-lg transition-colors duration-300 border-1 mt-4 bg-teal-400 shadow-md hover:bg-teal-450 active:bg-teal-500 active:shadow-none text-white"
            type="submit"
          >
            {showOtp ? "Register" : "Send OTP"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
