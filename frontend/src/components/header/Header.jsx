import React from "react";
import { Link, NavLink } from "react-router-dom";
import TertiaryBtn from "../buttons/TertiaryBtn";
import "./header.css"

const Header = () => {
  return (
    <header>
      <nav className="flex top- bg-gray-900 text-white px-10 border-b border-b-gray-800 h-20 sticky w-full">
        <ul className="flex justify-between w-full items-center h-full">
          <li className="logo text-3xl font-bold flex gap-1 cursor-pointer uppercase">
            <Link to="/">
              <span>No</span> <span>Code</span>{" "}
              <span className="text-teal-500">X</span>
            </Link>
          </li>

          <div className="btn-section flex gap-10 items-center h-full">
            <li className=" relative btn flex items-center gap-10 font-medium h-full">
              <NavLink
                to="/signup"
                className={({ isActive }) =>
                  `${
                    isActive ? "text-sky-500 underlined" : ""
                  }  login hover:text-sky-500 transition-all duration-300`
                }
              >
                <TertiaryBtn text="Signup"  />
              </NavLink>
            </li>
            <li className="relative btn flex items-center gap-10 font-medium h-full">
              <NavLink
                to="/login"
                className={({ isActive }) =>
                  `${
                    isActive ? "text-sky-500 underlined" : ""
                  }  login hover:text-sky-500 transition-all duration-300`
                }
              >
                <TertiaryBtn text="Login" />
              </NavLink>
            </li>
            <div className="github border-l pl-10">
              <button className="github-icon transition-all duration-300">
                {/* <GitHubIcon /> */}
              </button>
            </div>
          </div>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
