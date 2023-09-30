import React, { useEffect, useState } from "react";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ErrorIcon from "@mui/icons-material/Error";
const Popup = (props) => {
  const { text, active = false, error } = props;
  const [isActive, setIsActive] = useState(true);

  useEffect(() => {
    setIsActive(true);
    const timeout = setTimeout(() => {
      setIsActive(false);
    }, 3000);
    return () => clearTimeout(timeout);
  },[]);

  return (
    <div
      className={`${
        error ? "bg-red-900 border-red-600" : "bg-teal-900  border-teal-700"
      } border text-white flex items-center justify-center gap-5 px-6 py-4 pointer-events-none absolute top-0 left-1/2 -translate-x-1/2  rounded-md transition duration-500 ${
        isActive ? "opacity-100 translate-y-24" : "opacity-0"
      }`}
    >
      <div>
        {error ? (
          <ErrorIcon className="" style={{ fontSize: "1.7rem" }} />
        ) : (
          <CheckCircleIcon className="" style={{ fontSize: "1.7rem" }} />
        )}
      </div>
      <div>
        <h4 className="font-semibold">{text}</h4>
      </div>
    </div>
  );
};

export default Popup;
