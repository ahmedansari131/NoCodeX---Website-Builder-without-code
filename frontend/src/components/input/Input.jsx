import React, { forwardRef, useId } from "react";

const Input = forwardRef(function Input(
  { label, type = "text", className = "", ...props },
  ref
) {
  const id = useId();
  return (
    <div className="w-full flex flex-col gap-2">
      {label && (
        <label className="" htmlFor={id}>
          {label}
        </label>
      )}

      <input type={type} className={`outline-none text-md px-3 pr-10 py-2 rounded-md w-full focus:border-gray-500 text-gray-100 h-10 bg-gray-700 border border-gray-600 ${className}`} ref={ref} id={id} {...props}  />
    </div>
  );
});

export default Input;
