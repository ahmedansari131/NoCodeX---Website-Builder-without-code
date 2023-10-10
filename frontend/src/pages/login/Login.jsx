import React, { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Input,
  PrimaryBtn,
  SecondaryBtn,
  Loader,
} from "../../components/index";
import {
  useLoginUserMutation,
  storeToken,
  getToken,
  storeUserData,
  getUserData,
} from "../../services/index";
import GoogleIcon from "@mui/icons-material/Google";
import { useDispatch } from "react-redux";
import { login } from "../../store/slices/authSlice";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { toast } from "react-toastify";
import { setUserProfile } from "../../store/slices/index";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passError, setPassError] = useState("");
  const [passFocus, setPassFocus] = useState(false);
  const [passInputType, setPassInputType] = useState("password");
  const [loginUser, { isLoading }] = useLoginUserMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const passRef = useRef(null);

  const passInputHandler = (e) => {
    const content = passRef.current.value;
    setPassword(content);
    setPassFocus(true);
    if (!content) setPassFocus(false);
  };

  const loginHandler = async () => {
    const userData = {
      login_data: email,
      password: password,
    };
    try {
      setEmailError("");
      setPassError("");

      const response = await loginUser(userData);
      if (response.data.status === 200) {
        storeUserData(JSON.stringify(response.data.user));
        storeToken(response.data["token"]["data"]);
        navigate("/");

        dispatch(login(getToken()["access"]));
        dispatch(setUserProfile(JSON.parse(getUserData())));

        setEmail("");
        setPassword("");
      }

      if (response.data.status === 400) {
        if (response.data.message.login_data)
          setEmailError(response.data.message.login_data[0]);

        if (response.data.message.password)
          setPassError(response.data.message.password[0]);

        if (response.data.message.user) {
          toast.error(response.data.message.user, {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            theme: "colored",
          });
        }
      }
    } catch (error) {
      console.log("Error occurred while login ", error);
    }
  };

  return (
    <>
      <div className="bg-gray-900 text-white flex justify-center items-center w-full p-20 px-96">
        <div className=" bg-gray-800 rounded-lg flex items-center overflow-hidden w-2/3">
          <div className="w-full h-full flex items-center justify-center px-14 py-12">
            <form
              onClick={(e) => e.preventDefault()}
              className="flex flex-col gap-1 w-full "
            >
              <h2 className="mb-8 font-bold uppercase text-4xl text-gray-300 relative">
                Login
              </h2>
              <div className="username-input flex flex-col gap-1 text-sm text-gray-400">
                <Input
                  required={true}
                  label="Email or username"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={`${
                    emailError && (!email || email) ? "border-red-400" : ""
                  }`}
                  errorMessage={
                    emailError && (!email || email) ? emailError : ""
                  }
                ></Input>
              </div>
              <div className="password-input flex flex-col gap-1 text-sm text-gray-400 relative">
                {passFocus && passInputType === "password" && (
                  <VisibilityOffIcon
                    className="absolute top-1/2 right-4 -translate-y-2"
                    style={{ fontSize: "1.1rem" }}
                    onClick={() => setPassInputType("text")}
                  />
                )}

                {passFocus && passInputType === "text" && (
                  <VisibilityIcon
                    className="absolute top-1/2 right-4 -translate-y-2"
                    style={{ fontSize: "1.1rem" }}
                    onClick={() => setPassInputType("password")}
                  />
                )}
                <Input
                  required={true}
                  label="Password"
                  ref={passRef}
                  type={passInputType}
                  value={password}
                  onChange={(e) => {
                    passInputHandler(e);
                  }}
                  className={`${
                    passError && (!password || password) ? "border-red-400" : ""
                  }`}
                  errorMessage={
                    passError && (!password || password) ? passError : ""
                  }
                />
              </div>

              <div className="signup-btn mt-3 flex items-center gap-4 flex-col w-full">
                <PrimaryBtn
                  text={
                    isLoading ? (
                      <>
                        <div className="flex items-center gap-3 justify-center">
                          <Loader />
                          <span>Logging...</span>
                        </div>
                      </>
                    ) : (
                      "Login"
                    )
                  }
                  onClick={loginHandler}
                />
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
