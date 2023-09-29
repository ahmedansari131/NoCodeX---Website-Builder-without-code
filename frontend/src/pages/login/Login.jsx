import React, { useRef } from "react";
import { Link } from "react-router-dom";
import { Input, PrimaryBtn, SecondaryBtn } from "../../components/index";
import { useLoginUserMutation } from "../../services/authApi";
import GoogleIcon from "@mui/icons-material/Google";

const Login = () => {
  const usernameRef = useRef(null);
  const passwordRef = useRef(null);
  const [loginUser] = useLoginUserMutation();

  const loginHandler = async (e) => {
    e.preventDefault();
    const userData = {
      username: usernameRef.current.value,
      password: passwordRef.current.value,
    };
    try {
      await loginUser(userData);
    } catch (error) {
      console.log("Error occurred while login ", error);
    }
  };

  return (
    <>
      <div className="bg-gray-900 text-white flex justify-center items-center h-screen">
        <div className="m-28 bg-gray-800 rounded-lg flex items-center overflow-hidden">
          <div className="w-full h-full flex items-center justify-center px-14 py-12">
            <form
              onClick={(e) => loginHandler(e)}
              className="flex flex-col gap-5 w-full "
            >
              <h2 className="mb-8 font-bold uppercase text-4xl text-gray-300 relative">
                Login
              </h2>
              <div className="username-input flex flex-col gap-1 text-sm text-gray-400">
                <Input label="Username" ref={usernameRef}></Input>
              </div>
              <div className="password-input flex flex-col gap-1 text-sm text-gray-400">
                <Input label="Password" type="password" ref={passwordRef} />
              </div>

              <div className="signup-btn mt-3 flex items-center gap-4 flex-col w-full">
                <PrimaryBtn text="Login" />
                <p>or</p>
                <div className="flex justify-between w-full items-center gap-6">
                  <SecondaryBtn text={<GoogleIcon />} />
                </div>
                <div className="flex items-center gap-2 text-gray-400 font-light mt-3">
                  <p>Don't have an account?</p>
                  <span>
                    <Link to="/signup" className="hover:underline font-normal">
                      Signup
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

export default Login;
