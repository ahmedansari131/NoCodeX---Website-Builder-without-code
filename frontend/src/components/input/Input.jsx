import React, { forwardRef, useId } from "react";
import Error from "../messages/Error";

const Input = forwardRef(function Input(
  { label, type = "text", errorMessage="", isError, required = false, className = "", ...props },
  ref
) {
  const id = useId();
  return (
    <>
      <div className="w-full flex flex-col gap-2">
        {label && (
          <label className="" htmlFor={id}>
            {label} {required && <span className="text-red-400">*</span>}
          </label>
        )}

        <input
          type={type}
          className={`outline-none text-md px-3 pr-10 py-2 rounded-md w-full focus:border-gray-500 text-gray-100 h-10 bg-gray-700 border border-gray-600 ${className}`}
          ref={ref}
          id={id}
          {...props}
        />
      </div>
      <div className=" h-5">{errorMessage && <Error message={errorMessage} />}</div>
    </>
  );
});

export default Input;
