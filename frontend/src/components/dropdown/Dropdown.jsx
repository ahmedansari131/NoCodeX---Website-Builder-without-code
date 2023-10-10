import React, { useState, useReducer, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import Profile from "../../assets/profile.webp";

const Dropdown = (props) => {
  const { list, icons, profile, actions, links } = props;
  const [active, setActive] = useState(false);
  const dropdownRef = useRef(null);

  const toggleDropdown = () => {
    setActive(!active);
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setActive(false);
        e.stopPropagation();
      }
    };

    window.addEventListener("click", handleClickOutside);

    return () => {
      window.removeEventListener("click", handleClickOutside);
    };
  }, [active]);

  return (
    <>
      <div
        ref={dropdownRef}
        onClick={toggleDropdown}
        className="w-10 h-10 rounded-full cursor-pointer relative group"
      >
        <img
          className="w-full h-full rounded-full object-cover object-center"
          src={profile[0] ? `http://127.0.0.1:8000${profile[2]}` : Profile}
          alt="Profile"
        />
        <div
          className={`w-52 bg-gray-700 absolute top-0 right-full rounded-md text-white mr-2 overflow-hidden origin-bottom shadow-2xl transition-all duration-3f00 ${
            active ? "opacity-100 translate-y-0 scale-y-100" : "opacity-0 pointer-events-none scale-y-50 translate-y-10"
          }`}
        >
          <ul className="flex flex-col">
            {profile && (
              <li className="p-4 px-5 flex items-center gap-5 cursor-text border-b border-gray-600">
                <img
                  className="w-8 h-8 rounded-full"
                  src={profile[0] ? `http://127.0.0.1:8000${profile[2]}` : Profile}
                  alt="Profile"
                />
                <p className="flex flex-col">
                  {profile[0]}{" "}
                  <span className=" font-light text-sm">{profile[1]}</span>
                </p>
              </li>
            )}
            {list.map((listItem, index) => (
              <Link to={listItem === "Your Profile" ? links[0] : ""} key={listItem}>
                <li
                  onClick={() => {
                    listItem === "Logout" ? actions() : "";
                  }}
                  className="hover:bg-gray-600 p-4 px-5 flex items-center gap-5"
                >
                  {icons && <span>{icons[index]}</span>}
                  {listItem}
                </li>
              </Link>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};

export default Dropdown;
