import React, { useEffect, useState } from "react";
import { Link, NavLink, json, useNavigate } from "react-router-dom";
import { Dropdown, TertiaryBtn } from "../index";
import "./header.css";
import { useDispatch, useSelector } from "react-redux";
import { removeToken, removeUserData } from "../../services";
import { logout, login } from "../../store/slices/authSlice";
import Profile from "../../assets/profile.webp";
import LogoutIcon from "@mui/icons-material/Logout";
import PersonIcon from "@mui/icons-material/Person";
import { setUserProfile } from "../../store/slices";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [image, setImage] = useState(Profile);
  const isLoggedIn = useSelector((state) => state.auth.status);
  const user = useSelector((state) => state.userProfile.userProfile);

  useEffect(() => {
    if (user) {
      setUsername(user.username);
      setImage(user.image);
      setUserEmail(user.email);
    }
  }, [isLoggedIn, user]);

  const handleLogout = () => {
    removeToken();
    removeUserData();
    dispatch(logout(null));
    dispatch(setUserProfile(null));
    setImage("");
    setUsername("");
    navigate("/");
  };

  return (
    <header>
      <nav className="flex bg-gray-900 text-white px-20 border-b border-b-gray-800 h-20 sticky w-full">
        <ul className="flex justify-between w-full items-center h-full">
          <li className="text-3xl font-bold flex gap-1 cursor-pointer uppercase">
            <Link to="/">
              <span>No</span> <span>Code</span>{" "}
              <span className="text-teal-500">X</span>
            </Link>
          </li>

          <div className="btn-section flex gap-10 items-center h-full">
            {!isLoggedIn && (
              <>
                <li className=" relative btn flex items-center gap-10 font-medium h-full">
                  <NavLink
                    to="/signup"
                    className={({ isActive }) =>
                      `${
                        isActive ? "text-sky-500 underlined" : ""
                      }  login hover:text-sky-500 transition-all duration-300`
                    }
                  >
                    <TertiaryBtn text="Signup" />
                  </NavLink>
                </li>
                <li className="relative btn flex items-center gap-10 font-medium h-full">
                  <NavLink
                    to="/login"
                    className={({ isActive }) =>
                      `${
                        isActive ? "text-sky-500 underlined" : ""
                      }  login hover:text-sky-500 transition-all duration-300`
                    }
                  >
                    <TertiaryBtn text="Login" />
                  </NavLink>
                </li>
              </>
            )}
            {isLoggedIn && (
              <Dropdown
                list={["Your Profile", "Logout"]}
                icons={[<PersonIcon />, <LogoutIcon />]}
                profile={[username, userEmail, image]}
                actions={handleLogout}
                links={["/profile-setup"]}
              />
            )}
          </div>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
