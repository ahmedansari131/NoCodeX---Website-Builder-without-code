import React from "react";
import ErrorIcon from "@mui/icons-material/Error";

const Error = (props) => {
  const { message, className = "", } = props;
  return (
    <div className={`${className}`} {...props}>
      <p
        className="text-xs text-red-400 flex items-center gap-1 font-light"
        style={{ fontSize: ".7rem" }}
      >
        <ErrorIcon className="text-red-400" style={{ fontSize: ".85rem" }} />
        {message}
      </p>
    </div>
  );
};

export default Error;
