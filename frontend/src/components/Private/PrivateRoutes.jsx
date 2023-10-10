import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { EmailVerification, ProfileSetup } from "../../pages";

const PrivateRoutes = () => {
  const isRegistered = localStorage.getItem("registration");
  const isLoggedIn = useSelector((state) => state.auth.status);

  return <>{isLoggedIn || isRegistered ? <Outlet /> : <Navigate to="/" />}</>;
};

export default PrivateRoutes;
