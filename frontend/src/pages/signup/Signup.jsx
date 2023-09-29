import React, { useRef } from "react";
import { Link } from "react-router-dom";
import { Input, PrimaryBtn, SecondaryBtn } from "../../components/index";
import {
  useLoginUserMutation,
  useRegisterUserMutation,
} from "../../services/authApi";
import GoogleIcon from "@mui/icons-material/Google";

const Signup = () => {
  const [registerUser] = useRegisterUserMutation();
  const nameRef = useRef();
  const emailRef = useRef();
  const passRef = useRef();
  const cPassRef = useRef();

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
      await registerUser(registerObj);
    } catch (error) {
      console.log("Error occurred while registering the user ", error);
    }
  };

  return (
    <>
      <div className="bg-gray-900 text-white flex justify-center items-center h-screen">
        <div className="m-28 bg-gray-800 rounded-lg flex items-center overflow-hidden h-fit w-fit">
          <div className="w-full h-full flex items-center justify-center px-14 py-12">
            <form className="flex flex-col gap-5 w-full">
              <h2 className="mb-8 font-bold uppercase text-4xl text-gray-300 relative">
                Signup
              </h2>
              <div className="flex gap-6">
                <div className="flex flex-col gap-1 text-sm text-gray-400">
                  <Input label="Name" ref={nameRef}></Input>
                </div>
                <div className="flex flex-col gap-1 text-sm text-gray-400">
                  <Input label="Email" ref={emailRef}></Input>
                </div>
              </div>

              <div className="flex gap-6">
                <div className="flex flex-col gap-1 text-sm text-gray-400">
                  <Input label="Password" type="password" ref={passRef} />
                </div>
                <div className=" flex flex-col gap-1 text-sm text-gray-400">
                  <Input
                    label="Confirm Password"
                    type="password"
                    ref={cPassRef}
                  />
                </div>
              </div>

              <div className="signup-btn mt-3 flex items-center gap-4 flex-col w-full">
                <PrimaryBtn
                  text="Signup"
                  className=""
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
