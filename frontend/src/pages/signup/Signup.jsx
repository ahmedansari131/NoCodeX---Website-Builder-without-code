import React, { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Input,
  Loader,
  PrimaryBtn,
  SecondaryBtn,
} from "../../components/index";
import { useRegisterUserMutation } from "../../services/authApi";
import GoogleIcon from "@mui/icons-material/Google";

const Signup = () => {
  const [registerUser, { isLoading, isError }] = useRegisterUserMutation();
  const nameRef = useRef();
  const emailRef = useRef();
  const passRef = useRef();
  const cPassRef = useRef();
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    const name = nameRef.current.value;
    const email = emailRef.current.value;
    const password = passRef.current.value;
    const confirmPassword = cPassRef.current.value;

    const registerObj = {
      name: name,
      email: email,
      password: password,
      confirmPassword: confirmPassword,
    };

    nameRef.current.value = "";
    emailRef.current.value = "";
    passRef.current.value = "";
    cPassRef.current.value = "";

    try {
      let response = await registerUser(registerObj);
      const signupData = {
        email: response.data["data"]["email"],
        isRegisterSuccess: true,
      };
      localStorage.setItem("registration", JSON.stringify(signupData));
      navigate("/verify-email");
    } catch (error) {
      console.log("Error occurred while registering the user ", error);
    }
  };

  return (
    <>
      <div className="bg-gray-900 text-white flex justify-center items-center p-20 px-96">
        <div className="bg-gray-800 rounded-lg flex items-center overflow-hidden h-fit w-full">
          <div className="w-full h-full flex items-center justify-center px-14 py-12">
            <form className="flex flex-col gap-5 w-full">
              <h2 className="mb-8 font-bold uppercase text-4xl text-gray-300 relative">
                Signup
              </h2>
              <div className="flex gap-6 w-full">
                <div className="flex flex-col gap-1 text-sm text-gray-400 w-full">
                  <Input label="Name" ref={nameRef} required />
                </div>
                <div className="flex flex-col gap-1 text-sm text-gray-400 w-full">
                  <Input label="Email" ref={emailRef} required />
                </div>
              </div>

              <div className="flex gap-6 w-full">
                <div className="flex flex-col gap-1 text-sm text-gray-400 w-full">
                  <Input label="Password" type="password" ref={passRef} />
                </div>
                <div className=" flex flex-col gap-1 text-sm text-gray-400 w-full">
                  <Input
                    label="Confirm Password"
                    type="password"
                    ref={cPassRef}
                  />
                </div>
              </div>

              <div className="signup-btn mt-3 flex items-center gap-4 flex-col w-full">
                <PrimaryBtn
                  text={
                    isLoading ? (
                      <>
                        <div className="flex items-center gap-3 justify-center">
                          <Loader />
                          <span>Signing up...</span>
                        </div>
                      </>
                    ) : (
                      "Signup"
                    )
                  }
                  className="transition duration-300"
                  onClick={(e) => handleSignup(e)}
                />
                <p>or</p>
                <div className="flex justify-between w-full items-center gap-6">
                  <SecondaryBtn text={<GoogleIcon />} />
                </div>
                <div className="flex items-center gap-2 text-gray-400 font-light mt-3">
                  <p>Already have an account?</p>
                  <span>
                    <Link to="/login" className="hover:underline font-normal">
                      Login
                    </Link>
                  </span>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Signup;
