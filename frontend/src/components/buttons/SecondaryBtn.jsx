import React from "react";

const SecondaryBtn = ({ text, type = "button", className="", ...props }) => {
  return (
    <button type={type} className={`border-teal-500 border w-full px-4 py-2 text-lg rounded-md text-white font-medium transition-all duration-200 hover:bg-teal-900  ${className}`} {...props}>
      {text}
    </button>
  );
};

export default SecondaryBtn;
