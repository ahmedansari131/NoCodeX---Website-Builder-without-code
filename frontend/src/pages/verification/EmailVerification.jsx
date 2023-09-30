import { React, useRef, useState } from "react";
import { Input, PrimaryBtn, Loader, Popup } from "../../components/index";
import { useVerifyEmailMutation } from "../../services/authApi";

const EmailVerification = () => {
  const digOneRef = useRef();
  const digTwoRef = useRef();
  const digThreeRef = useRef();
  const digFourRef = useRef();
  const [isVerified, setIsVerified] = useState(false);
  const [popupText, setPopupText] = useState("");
  const [popupError, setPopupError] = useState(false);
  const [popupSuccess, setPopupSuccess] = useState(false);
  const [verifyEmail, { data, isLoading, isError, isSuccess }] =
    useVerifyEmailMutation();

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
      digOneRef.current.value = "";
      digTwoRef.current.value = "";
      digThreeRef.current.value = "";
      digFourRef.current.value = "";
      const response = await verifyEmail(otpObj);

      if (response.data["status"] === 400) {
        console.log(response.data["status"])
        setIsVerified(true);
        setPopupError(true);
        setPopupText(response.data["message"])
      }

      //   if (isSuccess) localStorage.removeItem("registration");
    } catch (error) {
      console.log("Error occurred while verifying the otp ", error);
    }
  };

  return (
    <>
      {isVerified && <Popup active={true} text={popupText} success={popupSuccess} error={popupError} />}

      <div className="w-full bg-gray-900 flex justify-center items-center p-56">
        <div className="bg-gray-800 p-8 rounded-md flex flex-col gap-7">
          <div className="text-white">
            <h2 className="text-3xl font-semibold">Email Verification</h2>
            <p className="text-gray-400 text-sm mt-2">
              Check your email for the otp
            </p>
          </div>
          <div className="flex gap-3 w-96">
            <Input
              onChange={() => handleChange(digOneRef, digTwoRef)}
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
          <div>
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
                  "Submit"
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
