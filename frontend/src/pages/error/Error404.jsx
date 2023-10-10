import React from "react";
import { PrimaryBtn } from "../../components";
import { Link } from "react-router-dom";

const Error404 = () => {
  return (
    <div className="w-screen h-screen bg-gradient-to-r from-cyan-500 to-teal-500  flex justify-center items-center">
      <div className="bg-white flex flex-col gap-4 justify-center items-center h-2/3 w-2/3 rounded-lg shadow-lg">
        <div className="flex flex-col items-center gap-3">
          <h1 className="font-extrabold text-9xl text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-teal-500">404</h1>
          <h3 className="font-bold text-xl uppercase">Oops! Page Not Found</h3>
        </div>
        <div>
          <p className="text-lg text-gray-600">Sorry, page you are looking for does not exist.</p>
        </div>
        <div>
          <Link to="/"> <PrimaryBtn className="text-white" text="Return Home" /> </Link>
        </div>
      </div>
    </div>
  );
};

export default Error404;
