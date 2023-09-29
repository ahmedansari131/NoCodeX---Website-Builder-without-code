import React from "react";

const PrimaryBtn = ({ text, type = "button", className="",icons, ...props }) => {
  return (
    <button type={type} className={`bg-teal-500 w-full px-4 py-2 text-lg rounded-md text-gray-900 font-semibold hover:bg-teal-300 transition-all duration-200 ${className}`} {...props}>
      {text}
      {icons}
    </button>
  );
};

export default PrimaryBtn;
