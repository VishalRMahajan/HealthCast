import React, { useState } from "react";
import InputField from "./InputField";
import { BACKEND_URL } from "../../setup";
import ProgressBar from "./ProgressBar";
import Result from "./Result";

const Diabetes = () => {
  const [preg, setPreg] = useState("");
  const [glucose, setGlucose] = useState("");
  const [bp, setBp] = useState("");
  const [insulin, setInsulin] = useState("");
  const [pedigreeFunction, setPedigreeFunction] = useState("");
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [age, setAge] = useState("");
  const [result, setResult] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log({
      pregnancies: preg,
      glucose: glucose,
      bp: bp,
      insulin: insulin,
      pedigreeFunction: pedigreeFunction,
      age: age,
    });

    const response = await fetch(`${BACKEND_URL}/diabetics/predict`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        pregnancies: preg,
        glucose: glucose,
        blood_pressure: bp,
        insulin: insulin,
        bmi: weight / ((height / 100) * (height / 100)),
        diabetes_pedigree_function: pedigreeFunction,
        age: age,
      }),
    });

    if (!response.ok) {
      console.log("Error in response");
      return;
    }
    const data = await response.json();
    setResult(data);
    // console.log(data);
    // setPreg("");
    // setGlucose("");
    // setBp("");
    // setInsulin("");
    // setPedigreeFunction("");
    // setHeight("");
    // setWeight("");
    // setAge("");
  };

  return (
    <div className="Diabetes flex justify-center my-4 grow">
      <form onSubmit={handleSubmit}>
        <InputField
          label="How many times you have been pregnant?"
          type="number"
          name="pregnancies"
          placeholder="If none or not applicable, type 0"
          data={preg}
          setData={setPreg}
        />
        <InputField
          label="What is your glucose level?"
          type="number"
          name="glucose"
          placeholder="Example: 200"
          data={glucose}
          setData={setGlucose}
        />
        <InputField
          label="What is your blood pressure?"
          type="number"
          name="bp"
          placeholder="Example: 70"
          data={bp}
          setData={setBp}
        />
        <InputField
          label="What is your insulin level?"
          type="number"
          name="insulin"
          placeholder="Example: 600"
          data={insulin}
          setData={setInsulin}
        />
        <InputField
          label="What is your pedigree function?"
          type="number"
          name="pedigreeFunction"
          placeholder="Example: 0.5"
          data={pedigreeFunction}
          setData={setPedigreeFunction}
        />
        <InputField
          label="What is your height (in centimeters)?"
          type="number"
          name="height"
          placeholder="Example: 180"
          data={height}
          setData={setHeight}
        />
        <InputField
          label="What is your weight (in kilograms)?"
          type="number"
          name="weight"
          placeholder="Example: 70"
          data={weight}
          setData={setWeight}
        />
        <InputField
          label="What is your age?"
          type="number"
          name="age"
          placeholder="Example: 25"
          data={age}
          setData={setAge}
        />
        <button className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg mt-4">
          Submit
        </button>
      </form>
      {result !== null && <Result result={result} />}
    </div>
  );
};

export default Diabetes;
