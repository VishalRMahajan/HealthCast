import React, { useState } from "react";
import ListInput from "./ListInput";
import { BACKEND_URL } from "../../../setup";
import Result from "./Result";

const Disease = () => {
  const [tags, setTags] = useState([]);
  const [result, setResult] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(tags);
    if (tags.length === 0) {
      alert("Please select atleast one symptom");
      return;
    }
    console.log("Sending request");
    const response = await fetch(`${BACKEND_URL}/diseases/predict`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(tags),
    });
    if (!response.ok) {
      console.log("Error in response");
      return;
    }
    const data = await response.json();
    console.log(data);
    setResult(data);
  };

  return (
    <div className="Disease flex justify-center my-4 grow">
      <form
        action=""
        className=" flex flex-col max-w-[40rem]"
        onSubmit={handleSubmit}
      >
        <label htmlFor="symptoms" className="font-bold text-xl ">
          Select all your symptoms (max 17):
        </label>
        <ListInput tags={tags} setTags={setTags} />
      </form>

      {result !== null && <Result result={result} />}
    </div>
  );
};

export default Disease;
