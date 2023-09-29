import React from "react";
import {
  Header,
  Footer,
  Input,
  PrimaryBtn,
  SecondaryBtn,
} from "../components/index.js";
import Login from "./login/Login.jsx";

const Landing = () => {
  return (
    <>
      <div className="bg-slate-900 w-full h-screen text-white flex justify-center items-center flex-col gap-8">
        <div className="w-2/3 flex flex-col gap-6 justify-center items-center">
          <h1 className="text-6xl font-bold text-center  ">
            Unleash the creativity with the furture of web development.
          </h1>
          <p className="text-center text-gray-400 text-xl w-2/3">
            Unlock the power of app creation effortlessly with No Code X – no
            coding required. Transform your ideas into reality today!
          </p>
        </div>
        <div>
          <PrimaryBtn text="Get Started" />
        </div>
      </div>
    </>
  );
};

export default Landing;
