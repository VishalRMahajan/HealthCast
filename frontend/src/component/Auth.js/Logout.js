import React from "react";
import useUserContext from "../../hooks/useUserContext";

const Logout = () => {
  const { dispatch } = useUserContext();
  const onClick = () => {
    dispatch({ type: "LOGOUT" });
  };
  return (
    <div className="Logout">
      <button
        className="logout font-bold mx-2 text-xl text-gray-400 w-fit hover:text-red-600 transition-colors flex justify-center items-center"
        onClick={onClick}
      >
        <i className="fa-solid fa-arrow-right-from-bracket"></i>
      </button>
    </div>
  );
};

export default Logout;
