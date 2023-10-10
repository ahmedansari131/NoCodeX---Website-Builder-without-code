import React, { useEffect, useRef, useState } from "react";
import { Input, PrimaryBtn, Loader } from "../../components/index";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import {
  useProfileSetupMutation,
  useProfileUpdateMutation,
} from "../../services/api/authApi";
import { useDispatch, useSelector } from "react-redux";
import { setProfile } from "../../store/slices/profileSetupSlice";
import { useNavigate } from "react-router-dom";
import { storeUserData, getUserData } from "../../services";
import { login } from "../../store/slices/authSlice";
import "../../styles/profileSetup.css";
import { setUserProfile } from "../../store/slices";
import { toast } from "react-toastify";

const ProfileSetup = () => {
  const usernameRef = useRef(null);
  const imageRef = useRef(null);
  const [filePreview, setFilePreview] = useState(null);
  const [usernameExist, setUsernameExist] = useState("");
  const [profileSetup, { isLoading }] = useProfileSetupMutation();
  const [profileUpdate] = useProfileUpdateMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const reader = new FileReader();
  const getUserData = useSelector((state) => state.userProfile.userProfile);

  useEffect(() => {
    if (getUserData) {
      usernameRef.current.value = getUserData.username;
      setFilePreview(`http://127.0.0.1:8000${getUserData.image}`);
    }
  }, [getUserData]);

  const handleFileChange = () => {
    let file = imageRef.current.files[0];

    if (file) {
      reader.onload = (event) => {
        const dataUrl = event.target.result;
        setFilePreview(dataUrl);
      };
      reader.onerror = (event) => {
        console.error("FileReader error:", event.target.error);
      };

      reader.onabort = (event) => {
        console.error("File reading aborted");
      };
    }
    reader.readAsDataURL(file);
  };

  const handleSave = async () => {
    try {
      setUsernameExist("");
      const formData = new FormData();
      formData.append("username", usernameRef.current.value);
      filePreview ? formData.append("image", imageRef.current.files[0]) : "";
      if (imageRef.current.files[0] === undefined) {
        formData.delete("image");
      }
      console.log(imageRef.current.files[0]);
      if (getUserData) {
        if(getUserData.username === usernameRef.current.value) formData.delete("username");
        formData.append("id", getUserData.id);
        formData.append("profileId", getUserData.profileId);
      }

      if (getUserData) {
        const response = await profileUpdate(formData);
        if (response.data["status"] === 200) {
          const userData = response.data["user"];
          storeUserData(JSON.stringify(userData));
          dispatch(login(userData));
          toast("Profile updated successfully.");
        }
        console.log("Profile updated");

        if (response.data.status === 400) {
          setUsernameExist(response.data.message);
        }
        return;
      }

      const response = await profileSetup(formData);
      if (response.data["status"] === 200) {
        const userData = response.data["user"];
        storeUserData(JSON.stringify(userData));
        navigate("/");
        dispatch(setUserProfile(userData));
        setFilePreview(null);
        usernameRef.current.value = "";
      }
    } catch (error) {
      console.log("Error occurred while saving the profile ", error);
    }
  };

  return (
    <>
      <div className="bg-gray-900 text-white flex justify-center items-center w-full p-20 px-96">
        <div className=" bg-gray-800 rounded-lg flex items-center overflow-hidden w-full">
          <div className="w-full h-full flex justify-center px-14 py-12 flex-col gap-4">
            <h2 className="mb-8 font-bold uppercase text-4xl text-gray-300 relative">
              Your profile
            </h2>
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-1 text-sm text-gray-400">
                <Input
                  required={true}
                  label="Username"
                  type="text"
                  ref={usernameRef}
                  className={`${
                    usernameExist &&
                    (!usernameRef.current.value || usernameRef.current.value)
                      ? "border-red-400"
                      : ""
                  }`}
                  errorMessage={
                    usernameExist &&
                    (!usernameRef.current.value || usernameRef.current.value)
                      ? usernameExist
                      : ""
                  }
                />
              </div>
              <div className="flex flex-col gap-1 text-sm text-gray-400 relative overflow-hidden group">
                <div
                  className={`upload-container bg-gray-700 border border-gray-600 rounded-md flex gap-2 items-center justify-center w-full h-32 flex-col overflow-hidden transition-opacity duration-300`}
                >
                  {filePreview && (
                    <div
                      onClick={() => imageRef.current.click()}
                      className="absolute top-0 left-0 w-full h-full bg-black flex justify-center items-center text-xl text-white font-semibold cursor-pointer opacity-0 rounded-md bg-opacity-0 group-hover:bg-opacity-30 hover:opacity-100 transition-all duration-300 z-20 selection:bg-none"
                    >
                      Choose Photo
                    </div>
                  )}
                  <div
                    className={`rounded-full w-24 h-24 overflow-hidden ${
                      !filePreview ? "hidden" : ""
                    }`}
                  >
                    <img
                      className="prof-img w-full h-full object-cover object-center"
                      src={filePreview}
                      alt=""
                    />
                  </div>
                  <div
                    className={`flex flex-col items-center absolute w-full h-full justify-center ${
                      filePreview ? "opacity-0" : ""
                    }`}
                  >
                    <input
                      ref={imageRef}
                      type="file"
                      name="file"
                      id="file"
                      accept=".jpg, .jpeg, .png"
                      className="opacity-0 p-2 w-full h-full absolute top-0 rounded-md -z-0 cursor-pointer"
                      onChange={handleFileChange}
                    />
                    <CloudUploadIcon style={{ fontSize: "2.5rem" }} />
                    <label className="text-lg" htmlFor="file">
                      Choose Profile Image
                    </label>
                    <p className="text-sm text-teal-700">(Optional)</p>
                  </div>
                </div>
              </div>
              <div className="mt-5">
                <PrimaryBtn
                  text={
                    isLoading ? (
                      <>
                        <div className="flex items-center gap-3 justify-center">
                          <Loader />
                          <span>Saving profile...</span>
                        </div>
                      </>
                    ) : (
                      "Save"
                    )
                  }
                  onClick={handleSave}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfileSetup;
