import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { BACKEND_URL } from "../../setup";
import useUserContext from "../../hooks/useUserContext";

const Login = ({ setPage }) => {
  const { dispatch } = useUserContext();
  const [isLoaded, setIsLoaded] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  console.log(isLoaded);

  useEffect(() => {
    setPage("login");
    setIsLoaded(true);
  }, [setPage]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (username === "" || password === "") {
      return setError("Please fill in all fields");
    } else {
      setError("");
    }

    const formdata = new FormData();
    formdata.append("username", username);
    formdata.append("password", password);

    try {
      const response = await fetch(`${BACKEND_URL}/auth/login`, {
        method: "POST",
        body: formdata,
      });

      const data = await response.json();

      if (!response.ok) {
        return setError(data.detail);
      }
      console.log(data);
      dispatch({ type: "LOGIN", payload: data.access_token });
      setError("");
      setUsername("");
      setPassword("");
    } catch (error) {
      console.error("Error:", error);
      setError("An error occurred. Please try again later.");
    }
  };

  const inputStyle =
    "border-[2.5px] focus:border-orange-400 text-lg py-3 px-4 m-2 w-full rounded-md";
  return (
    <div
      className={`Login px-24 pt-8 pb-16 h-full flex justify-center items-center ${
        isLoaded ? "slide-in" : ""
      }`}
    >
      <div className="LoginContainer flex w-[70%] rounded-[40px] shadow-lg p-16">
        <div className="RightLogin w-[50%]">
          <img src="app_icon.png" alt="" className="w-[20%]" />
          <h1 className="text-6xl font-semibold my-5 w-fit">Sign in</h1>
          <p className="text-xl w-fit">to continue to HealthCast</p>
        </div>
        <div className="LeftLogin w-[50%]">
          <form onSubmit={handleSubmit}>
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
              <Link className="py-2 text-lg font-semibold" to="/register">
                Create account
              </Link>
              <button
                type="submit"
                className="bg-green-500 text-white py-2 text-lg font-semibold rounded-lg px-5"
              >
                Sign In
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
