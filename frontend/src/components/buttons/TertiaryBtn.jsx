import React from "react";

const TertiaryBtn = ({ text, type = "button", className = "",icon=null, ...props }) => {
  return (
    <button
      type={type}
      {...props}
      className={`py-2 text-lg rounded-md text-white font-medium transition-all duration-200 hover:text-teal-500 ${className}`}
    >
      {text}
      {icon}
    </button>
  );
};

export default TertiaryBtn;
