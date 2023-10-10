import React, { useEffect, useState } from "react";
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import {
  Landing,
  EmailVerification,
  ProfileSetup,
  Signup,
  Login,
  Error404,
} from "./pages";
import Layout from "./Layout";
import { useDispatch, useSelector } from "react-redux";
import { getUserData, getToken } from "./services";
import { useRefreshTokenMutation } from "./services/api/authApi";
import { login, logout } from "./store/slices/authSlice";
import { setUserProfile } from "./store/slices/index.js";
import { PrivateRoutes } from "./components";

const App = () => {
  const dispatch = useDispatch();
  const [refreshToken] = useRefreshTokenMutation();

  const updateToken = async () => {
    console.log("In update token function");
    const getRefreshToken = getToken().refresh;
    if (getRefreshToken) {
      const response = await refreshToken({ refresh: getRefreshToken });
      if (response.data) {
        storeToken(response.data);
      }
    }
  };

  useEffect(() => {
    const token = getToken()["access"];
    const userData = JSON.parse(getUserData());
    if (token) {
      dispatch(login(token));
    } else {
      dispatch(logout(null));
    }
    if (userData) dispatch(setUserProfile(userData));
  }, []);

  useEffect(() => {
    let time = 1000 * 60 * 4;
    let interval = setInterval(() => {
      updateToken();
    }, time);
    return () => clearInterval(interval);
  }, []);

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Layout />} errorElement={<Error404 />}>
        <Route path="/" element={<Landing />} />
        <Route path="verify-email" element={<EmailVerification />} />
        <Route element={<PrivateRoutes />} errorElement={<Error404 />}>
          <Route path="profile-setup" element={<ProfileSetup />} />
        </Route>
        <Route path="signup" element={<Signup />} />
        <Route path="login" element={<Login />} />
      </Route>
    )
  );

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
};

export default App;
