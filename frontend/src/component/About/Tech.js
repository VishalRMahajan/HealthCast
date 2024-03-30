import React from "react";

const Tech = () => {
  return (
    <div className="Tech mt-16">
      <h1 className="text-center font-semibold text-3xl mb-5">
        Technologies used
      </h1>
      <div className="flex gap-3">
        <div>
          <div className="flex">
            <TechItem
              name="ReactJS"
              img="https://th.bing.com/th/id/R.f81a6f373c244b1f70f4b7402b5ab372?rik=rbXh4ieLuKt%2bmA&riu=http%3a%2f%2flogos-download.com%2fwp-content%2fuploads%2f2016%2f09%2fReact_logo_logotype_emblem.png&ehk=QhGOkKcUKCU7FBQgHOajOiJqJBACUTD2Ni6LsfqzCEA%3d&risl=&pid=ImgRaw&r=0"
              text="text-black"
              bg="bg-white"
            />
            <TechItem
              name="TailwindCSS"
              img="https://static-00.iconduck.com/assets.00/tailwind-css-icon-2048x1229-u8dzt4uh.png"
              text="text-black"
              bg="bg-white"
            />
          </div>
          <h2 className="text-xl font-semibold text-center border-t-[3px] border-orange-400 tracking-wider">
            Frontend
          </h2>
        </div>

        <div>
          <div className="flex">
            <TechItem
              name="FastAPI"
              img="fastapi.png"
              text="text-black"
              bg="bg-white"
            />
            <TechItem
              name="PostgreSQL"
              img="https://logospng.org/download/postgresql/postgresql-1536.png"
              text="text-black"
              bg="bg-white"
            />
          </div>
          <h2 className="text-xl font-semibold text-center border-t-[3px] border-orange-400 tracking-wider">
            Backend
          </h2>
        </div>

        <div>
          <div className="flex">
            <TechItem
              name="Azure"
              img="https://logosdownload.com/logo/microsoft-azure-logo-1024.png"
              text="text-black"
              bg="bg-white"
            />
            <TechItem
              name="Netlify"
              img="https://starkarnab.github.io/assets/netlify-fd169a11.png"
              text="text-black"
              bg="bg-white"
            />
          </div>
          <h2 className="text-xl font-semibold text-center border-t-[3px] border-orange-400 tracking-wider">
            Deployment
          </h2>
        </div>
        <div>
          <div className="flex">
            <TechItem
              name="Scikit Learn"
              img="https://s3.amazonaws.com/com.twilio.prod.twilio-docs/original_images/scikit-learn.png"
              text="text-black"
              bg="bg-white"
            />
          </div>
          <h2 className="text-xl font-semibold text-center border-t-[3px] border-orange-400 tracking-wider">
            ML
          </h2>
        </div>
        <div>
          <div className="flex">
            <TechItem
              name="Github"
              img="https://logos-download.com/wp-content/uploads/2016/09/GitHub_logo.png"
              text="text-black"
              bg="bg-white"
            />
          </div>
          <h2 className="text-xl font-semibold text-center border-t-[3px] border-orange-400 tracking-wider">
            VCS
          </h2>
        </div>
        <div>
          <div className="flex">
            <TechItem
              name="Postman"
              img="https://www.4x-treme.com/wp-content/uploads/2019/09/postman-300x300.png"
              text="text-black"
              bg="bg-white"
            />
          </div>
          <h2 className="text-xl font-semibold text-center border-t-[3px] border-orange-400 tracking-wider">
            API Docs
          </h2>
        </div>
      </div>
    </div>
  );
};

const TechItem = ({ name, img, bg, text }) => {
  return (
    <div className={`TechItem w-32 h-32 p-1 ${bg} rounded-2xl flex flex-col`}>
      <div className="grow flex justify-center items-center">
        <img src={img} alt={name} className="w-20" />
      </div>
      <p className={`${text} font-semibold text-xl mt-1 text-center`}>{name}</p>
    </div>
  );
};

export default Tech;
