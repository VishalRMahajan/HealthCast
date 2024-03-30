import React, { useState } from "react";

const Login = ({ login }) => {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState(false);

  const [error, setError] = useState(null);

  return (
    <div className={`Login ${!login ? "Active" : ""}`}>
      <div className="AuthContainer">
        <form
          className="mobileBox shadow-lg sm:shadow-none flex flex-col"
          onSubmit={(e) => {
            console.log("Login form submitted");
          }}
        >
          <h1 className="text-teal-500 text-3xl mb-2 font-semibold">Login</h1>
          <input
            type="email"
            className={`text-gray-700 font-semibold tracking-wider text-lg border-solid border-2 focus:bg-teal-100 focus:border-teal-400 transition-colors duration-300 rounded-md ${
              emailError
                ? "border-red-500 bg-red-200 placeholder-red-500"
                : "border-white bg-background-200"
            }`}
            name="email"
            placeholder="Email"
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
          {error && <p className="Error text-red-600 font-semibold">{error}</p>}
          <button
            className="btn flex text-white relative justify-center items-center self-center text-background font-bold rounded-lg transition-colors duration-300 border-1 mt-4 bg-teal-400 shadow-md hover:bg-teal-500 active:bg-teal-600 active:shadow-none"
            type="submit"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
