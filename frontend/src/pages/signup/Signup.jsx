import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Input,
  Loader,
  PrimaryBtn,
  SecondaryBtn,
  Success,
  Error,
} from "../../components/index";
import { useRegisterUserMutation } from "../../services/index";
import GoogleIcon from "@mui/icons-material/Google";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { useDispatch } from "react-redux";
import { setRegistered } from "../../store/slices";

const Signup = () => {
  const [registerUser, { isLoading, isError }] = useRegisterUserMutation();
  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passError, setPassError] = useState("");
  const [cPassError, setCPassError] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cPassword, setCPassword] = useState("");
  const [passFocus, setPassFocus] = useState(false);
  const [cPassFocus, setCPassFocus] = useState(false);
  const [passInputType, setPassInputType] = useState("password");
  const [cPassInputType, setCPassInputType] = useState("password");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const passRef = useRef(null);
  const cPassRef = useRef(null);

  const passInputHandler = (e) => {
    const content = passRef.current.value;
    setPassword(content);
    setPassFocus(true);
    if (!content) setPassFocus(false);
  };

  const cPassInputHandler = (e) => {
    const content = cPassRef.current.value;
    setCPassword(content);
    setCPassFocus(true);
    if (!content) setCPassFocus(false);
  };

  const handleSignup = async (e) => {
    e.preventDefault();

    const registerObj = {
      name: name,
      email: email,
      password: password,
      password2: cPassword,
    };

    try {
      setNameError("");
      setEmailError("");
      setPassError("");
      setCPassError("");
      const response = await registerUser(registerObj);
      if (response.data["status"] === 400) {
        if (response.data.message.email) {
          console.log("name");
          setEmailError(response.data.message.email[0]);
        }
        if (response.data.message.name) {
          setNameError(response.data.message.name[0]);
        }
        if (response.data.message.password) {
          setPassError(response.data.message.password[0]);
        }
        if (response.data.message.password2) {
          setCPassError(response.data.message.password2[0]);
        }
      }
      if (response.data["status"] === 200) {
        setName("");
        setEmail("");
        setPassword("");
        setCPassword("");
        const signupData = {
          email: response.data["data"]["email"],
          isRegisterSuccess: true,
        };
        localStorage.setItem("registration", JSON.stringify(signupData));
        dispatch(
          setRegistered(JSON.parse(localStorage.getItem("registration"))?.isRegisterSuccess)
        );
        navigate("/verify-email");
      } else {
        console.log(response.data);
      }
    } catch (error) {
      console.log("Error occurred while registering the user ", error);
    }
  };

  return (
    <>
      <div className="bg-gray-900 text-white flex justify-center items-center p-20 px-96">
        <div className="bg-gray-800 rounded-lg flex items-center overflow-hidden h-fit w-full">
          <div className="w-full h-full flex items-center justify-center px-14 py-12">
            <form className="flex flex-col gap-2 w-full">
              <h2 className="mb-8 font-bold uppercase text-4xl text-gray-300 relative">
                Signup
              </h2>
              <div className="flex gap-8 w-full">
                <div className="flex flex-col gap-1 text-sm text-gray-400 w-full">
                  <Input
                    required={true}
                    label={`Name`}
                    errorMessage={nameError && (!name || name) ? nameError : ""}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className={`${
                      nameError && (!name || name) ? "border-red-400" : ""
                    }`}
                  />
                </div>
                <div className="flex flex-col gap-1 text-sm text-gray-400 w-full">
                  <Input
                    required={true}
                    label="Email"
                    errorMessage={
                      emailError && (!email || email) ? emailError : ""
                    }
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={`${
                      emailError && (!email || email) ? "border-red-400" : ""
                    }`}
                  />
                </div>
              </div>

              <div className="flex gap-8 w-full">
                <div
                  className={`flex flex-col gap-1 text-sm text-gray-400 w-full relative }`}
                >
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
                    ref={passRef}
                    type={passInputType}
                    label="Password"
                    errorMessage={
                      passError && (!password || passError) ? passError : ""
                    }
                    value={password}
                    onChange={(e) => {
                      passInputHandler(e);
                    }}
                    className={`${
                      passError && (!password || password)
                        ? "border-red-400"
                        : ""
                    }`}
                  />
                </div>
                <div className=" flex flex-col gap-1 text-sm text-gray-400 w-full relative">
                  {cPassFocus && cPassInputType === "password" && (
                    <VisibilityOffIcon
                      className="absolute top-1/2 right-4 -translate-y-2"
                      style={{ fontSize: "1.1rem" }}
                      onClick={() => setCPassInputType("text")}
                    />
                  )}

                  {cPassFocus && cPassInputType === "text" && (
                    <VisibilityIcon
                      className="absolute top-1/2 right-4 -translate-y-2"
                      style={{ fontSize: "1.1rem" }}
                      onClick={() => setCPassInputType("password")}
                    />
                  )}
                  <Input
                    required={true}
                    ref={cPassRef}
                    label="Confirm Password"
                    type={cPassInputType}
                    errorMessage={cPassError && !cPassword ? cPassError : ""}
                    value={cPassword}
                    onChange={(e) => {
                      cPassInputHandler(e);
                    }}
                    className={`${
                      cPassError && (!cPassword || cPassword)
                        ? "border-red-400"
                        : ""
                    }`}
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
