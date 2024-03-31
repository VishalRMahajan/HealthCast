import React, { useState } from "react";

const ListInput = ({ tags, setTags }) => {
  const [symptoms, setSymptoms] = useState([
    "itching",
    "skin rash",
    "nodal skin eruptions",
    "continuous sneezing",
    "shivering",
    "chills",
    "joint pain",
    "stomach pain",
    "acidity",
    "ulcers on tongue",
    "muscle wasting",
    "vomiting",
    "burning micturition",
    "spotting urination",
    "fatigue",
    "weight gain",
    "anxiety",
    "cold hands and feets",
    "mood swings",
    "weight loss",
    "restlessness",
    "lethargy",
    "patches in throat",
    "irregular sugar level",
    "cough",
    "high fever",
    "sunken eyes",
    "breathlessness",
    "sweating",
    "dehydration",
    "indigestion",
    "headache",
    "yellowish skin",
    "dark urine",
    "nausea",
    "loss of appetite",
    "pain behind the eyes",
    "back pain",
    "constipation",
    "abdominal pain",
    "diarrhoea",
    "mild fever",
    "yellow urine",
    "yellowing of eyes",
    "acute liver failure",
    "fluid overload",
    "swelling of stomach",
    "swelled lymph nodes",
    "malaise",
    "blurred and distorted vision",
    "phlegm",
    "throat irritation",
    "redness of eyes",
    "sinus pressure",
    "runny nose",
    "congestion",
    "chest pain",
    "weakness in limbs",
    "fast heart rate",
    "pain during bowel movements",
    "pain in anal region",
    "bloody stool",
    "irritation in anus",
    "neck pain",
    "dizziness",
    "cramps",
    "bruising",
    "obesity",
    "swollen legs",
    "swollen blood vessels",
    "puffy face and eyes",
    "enlarged thyroid",
    "brittle nails",
    "swollen extremeties",
    "excessive hunger",
    "extra marital contacts",
    "drying and tingling lips",
    "slurred speech",
    "knee pain",
    "hip joint pain",
    "muscle weakness",
    "stiff neck",
    "swelling joints",
    "movement stiffness",
    "spinning movements",
    "loss of balance",
    "unsteadiness",
    "weakness of one body side",
    "loss of smell",
    "bladder discomfort",
    "foul smell ofurine",
    "continuous feel of urine",
    "passage of gases",
    "internal itching",
    "toxic look (typhos)",
    "depression",
    "irritability",
    "muscle pain",
    "altered sensorium",
    "red spots over body",
    "belly pain",
    "abnormal menstruation",
    "dischromic patches",
    "watering from eyes",
    "increased appetite",
    "polyuria",
    "family history",
    "mucoid sputum",
    "rusty sputum",
    "lack of concentration",
    "visual disturbances",
    "receiving blood transfusion",
    "receiving unsterile injections",
    "coma",
    "stomach bleeding",
    "distention of abdomen",
    "history of alcohol consumption",
    "blood in sputum",
    "prominent veins on calf",
    "palpitations",
    "painful walking",
    "pus filled pimples",
    "blackheads",
    "scurring",
    "skin peeling",
    "silver like dusting",
    "small dents in nails",
    "inflammatory nails",
    "blister",
    "red sore around nose",
    "yellow crust ooze",
    "prognosis",
  ]); // Define your list of predefined tags

  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleTagRemoval = (index) => {
    const removedTag = tags[index];
    const updatedTags = tags.filter((_, i) => i !== index);
    setTags(updatedTags);
    setSymptoms([...symptoms, removedTag]); // Add the removed tag back to symptoms
  };
  const suggestTags = () => {
    return symptoms.filter((tag) =>
      tag.toLowerCase().includes(inputValue.toLowerCase())
    ); // Limit suggestions to 5 tags
  };

  const handleTagAddition = (tag) => {
    if (tags.length < 17 && symptoms.includes(tag)) {
      setTags([...tags, tag]);
      setInputValue("");
      // Remove selected tag from suggestions
      const index = symptoms.indexOf(tag);
      if (index !== -1) {
        const updatedSymptoms = [
          ...symptoms.slice(0, index),
          ...symptoms.slice(index + 1),
        ];
        setSymptoms(updatedSymptoms);
      }
    }
  };

  return (
    <div className="ListInput">
      <div
      // className={`InputStyling border-[3px] border-solid rounded-lg ${
      //   focus
      //     ? "border-orange-400"
      //     : tags.length !== 0
      //     ? "border-green-500"
      //     : "border-gray-500"
      // }`}
      >
        {tags.length !== 0 && (
          <div className="flex gap-3 flex-wrap p-3 pb-1">
            {tags.map((tag, index) => (
              <div
                key={index}
                className="border-green-500 border-2 p-1 px-3 gap-2 rounded-full flex justify-center items-center"
              >
                {tag}
                <button onClick={() => handleTagRemoval(index)}>
                  <i className="fa-solid fa-xmark"></i>
                </button>
              </div>
            ))}
          </div>
        )}
        {tags.length !== 0 && (
          <div className="">
            <button
              type="submit"
              className="bg-green-500 text-white py-2 px-5 w-40 rounded-lg my-3"
            >
              Submit
            </button>
          </div>
        )}
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          placeholder="Search for symptoms..."
          className={`border-[3px] border-solid rounded-lg focus:border-orange-300 ${
            inputValue !== "" ? "border-green-500" : "border-gray-500 "
          }`}
        />
        {suggestTags().length !== 0 && (
          <div className="SymptomsContainer flex gap-3 flex-wrap p-3 max-h-[70vh] overflow-y-scroll">
            {suggestTags().map((tag, index) => (
              <button
                className="border-[2px] border-orange-400 outline-none focus:border-orange-200 active:border-orange-100 p-1 px-3 rounded-full focus:bg-orange-200"
                key={index}
                onClick={() => handleTagAddition(tag)}
                type="button"
              >
                {tag}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ListInput;
