import { React, useRef, useState } from "react";
import { Input, PrimaryBtn, Loader, Error } from "../../components/index";
import {
  getToken,
  storeToken,
  useVerifyEmailMutation,
} from "../../services/index";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../../store/slices/authSlice";

const EmailVerification = () => {
  const [inputError, setInputError] = useState("");
  const digOneRef = useRef();
  const digTwoRef = useRef();
  const digThreeRef = useRef();
  const digFourRef = useRef();
  const [verifyEmail, { data, isLoading, isError, isSuccess }] =
    useVerifyEmailMutation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleKeyDown = (e, currentRef, prevRef, nextRef) => {
    if (e.key === "Backspace") {
      if (prevRef && currentRef.current.value === "") {
        prevRef.current.focus();
      }
    }

    if (prevRef) {
      if (e.key === "ArrowLeft") {
        prevRef.current.focus();
      }
    }

    if (nextRef) {
      if (e.key === "ArrowRight") {
        nextRef.current.focus();
      }
    }
  };

  const handleChange = (currentRef, nextRef) => {
    const value = currentRef.current.value;
    if (!isNaN(value) && value.length === 1) {
      currentRef.current.value = value;
      if (nextRef) {
        nextRef.current.focus();
      }
    } else {
      currentRef.current.value = "";
    }
  };

  const handleEmailVerification = async () => {
    try {
      const otp =
        String(digOneRef.current.value) +
        String(digTwoRef.current.value) +
        String(digThreeRef.current.value) +
        String(digFourRef.current.value);
      const otpObj = {
        email: JSON.parse(localStorage.getItem("registration"))["email"],
        otp: otp,
      };
      const response = await verifyEmail(otpObj);
      digOneRef.current.value = "";
      digTwoRef.current.value = "";
      digThreeRef.current.value = "";
      digFourRef.current.value = "";

      if (response.data["status"] === 400) {
        console.log("Wrong OTP");
        setInputError(response.data["message"]);
        return;
      }

      if (response.data.status === 200) {
        storeToken(response.data.token.data);
        dispatch(login(getToken()["access"]));
        localStorage.removeItem("registration");
        navigate("/profile-setup");
        return;
      }
    } catch (error) {
      console.log("Error occurred while verifying the otp ", error);
    }
  };

  return (
    <>
      <div className="w-full bg-gray-900 flex justify-center items-center p-52">
        <div className="bg-gray-800 p-8 rounded-md flex flex-col h-70 justify-center">
          <div className="text-white mb-5">
            <h2 className="text-3xl font-semibold">Email Verification</h2>
            <p className="text-gray-400 text-sm mt-2">
              Check your email for the otp
            </p>
          </div>
          <div className="flex gap-3 w-96">
            <Input
              onChange={() => {
                handleChange(digOneRef, digTwoRef);
              }}
              onKeyDown={(e) => handleKeyDown(e, digOneRef, null, digTwoRef)}
              ref={digOneRef}
              className="text-center pr-0 px-0"
            />
            <Input
              onChange={() => handleChange(digTwoRef, digThreeRef)}
              onKeyDown={(e) =>
                handleKeyDown(e, digTwoRef, digOneRef, digThreeRef)
              }
              ref={digTwoRef}
              className="text-center pr-0 px-0"
            />
            <Input
              onChange={() => handleChange(digThreeRef, digFourRef)}
              onKeyDown={(e) =>
                handleKeyDown(e, digThreeRef, digTwoRef, digFourRef)
              }
              ref={digThreeRef}
              className="text-center pr-0 px-0"
            />
            <Input
              onChange={() => handleChange(digFourRef, null)}
              onKeyDown={(e) => handleKeyDown(e, digFourRef, digThreeRef, null)}
              ref={digFourRef}
              className="text-center pr-0 px-0"
            />
          </div>
          <div className="h-4 mt-2">
            {inputError && <Error message={inputError} />}
          </div>
          <div className="mt-2">
            <PrimaryBtn
              text={
                isLoading ? (
                  <>
                    <div className="flex items-center gap-3 justify-center">
                      <Loader />
                      <span>Verifying OTP...</span>
                    </div>
                  </>
                ) : (
                  "Verify"
                )
              }
              className="transition duration-300"
              onClick={handleEmailVerification}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default EmailVerification;
