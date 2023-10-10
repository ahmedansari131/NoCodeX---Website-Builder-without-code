import React from "react";
import { PrimaryBtn, TertiaryBtn } from "../components/index.js";
import LaunchIcon from '@mui/icons-material/Launch';

const Landing = () => {
  return (
    <>
      <div className="bg-slate-900 w-full py-56 text-white flex justify-center items-center flex-col gap-8">
        <div className="w-2/3 flex flex-col gap-6 justify-center items-center">
          <h1 className="text-6xl font-bold text-center  ">
            Unleash the creativity with the furture of web development.
          </h1>
          <p className="text-center text-gray-400 text-xl w-2/3">
            Unlock the power of app creation effortlessly with No Code X – no
            coding required. Transform your ideas into reality today!
          </p>
        </div>
        <div className="flex gap-12 items-center">
          <div>
            <PrimaryBtn text="Get Started" />
          </div>
          <div>
            <a href="https://github.com/ahmedansari131/NoCodeX---Website-Builder-without-code" target="_blank">
            <TertiaryBtn className="hover:underline flex items-center gap-2" icon={<LaunchIcon style={{fontSize: "1.4rem"}}  />} text="Github" /></a>
          </div>
        </div>
      </div>
    </>
  );
};

export default Landing;
