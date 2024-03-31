import React from "react";

const Team = () => {
  return (
    <div className="Team mt-16">
      <h1 className="text-center font-semibold text-3xl mb-5">Our Team</h1>
      <div className="flex justify-evenly">
        <Member
          name="Kevin Nadar"
          img="kevin-transperent.png"
          title="FastAPI, DevOps"
          linkedin={"https://www.linkedin.com/in/kevin-nadar-509946284/"}
          github={"https://github.com/KevinNadar"}
        />
        <Member
          name="Ajaykumar Nadar"
          img="ajaykumar-transperent.png"
          title="React, UI/UX"
          linkedin={"https://www.linkedin.com/in/ajaykumarn3000/"}
          github={"https://github.com/ajaykumarn3000"}
        />
        <Member
          name="Vishal Mahajan"
          img="vishal-transparent.png"
          title="FastAPI, ML"
          linkedin={"https://www.linkedin.com/in/vishalrmahajan/"}
          github={"https://github.com/VishalRMahajan/"}
        />
      </div>
    </div>
  );
};
const Member = ({ name, img, title, github, linkedin }) => {
  return (
    <div className="Member w-[30%] flex flex-col items-center">
      <div className="w-72 bg-gradient-to-b from-green-400 to-orange-400/30 h-72 px-2 pt-4 rounded-full overflow-hidden">
        <img src={img} alt={name} />
      </div>
      <div className="flex mt-2">
        <div className="flex flex-col">
          <a
            href={linkedin}
            target="_blank"
            rel="noreferrer"
            className="text-2xl hover:text-orange-600 transition-colors"
          >
            <i className="fa-brands fa-linkedin"></i>
          </a>
          <a
            href={github}
            target="_blank"
            rel="noreferrer"
            className="text-2xl hover:text-orange-600 transition-colors"
          >
            <i className="fa-brands fa-github"></i>
          </a>
        </div>

        <div className="text-left border-l-[2px] border-solid border-red-500 rounded-sm pl-2 ml-2 mt-1">
          <h1 className="font-semibold text-xl">{name}</h1>
          <h2 className="font-semibold text-lg text-gray-500/80">{title}</h2>
        </div>
      </div>
    </div>
  );
};

export default Team;
