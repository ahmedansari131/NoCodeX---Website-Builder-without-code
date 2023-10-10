import React from "react";
import { Link } from "react-router-dom";
import GitHubIcon from "@mui/icons-material/GitHub";

const Footer = () => {
  return (
    <div className="flex items-center justify-between border-t border-gray-800 py-5 px-20 bg-gray-950">
      <div className="flex items-center">
        <Link to="/">
          <div className="text-2xl font-bold text-gray-200 pr-5 border-r border-gray-700">
            <span>No</span> <span>Code</span>{" "}
            <span className="text-teal-500">X</span>
          </div>
        </Link>
        <p className="text-xs text-gray-400 pl-5">
          Copyright © 2023 NoCodeX, All rights reserved.
        </p>
      </div>
      <div className="cursor-pointer text-white">
        <a
          href="https://github.com/ahmedansari131/NoCodeX---Website-Builder-without-code"
          target="_blank"
        >
          <GitHubIcon />  
        </a>
      </div>
    </div>
  );
};

export default Footer;
