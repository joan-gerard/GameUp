import { useAuthContext } from "../context/auth";
import logo from "./assets/logo-transparent.png";
import avatar from "./assets/avatar.png";
import LoggedInMenu from "./LoggedInMenu";
import LoggedOutMenu from "./LoggedOutMenu";
import "./componentStyles.css";
import CustomizedInputBase from "./SearchBar";
import { useNavigate } from "react-router-dom";
import { capitalizeFirstLetter, UrlExists } from "../utils/helpers";

import "../global.css";

// type Context = {
//   user: {
//     username: string;
//   };
//   logout: () => void;
// };

// type User = {
//   user: null | Context;
// };

export default function NavBar() {
  const { user } = useAuthContext();

  const navigate = useNavigate();

  const navgiateToUserProfile = () => {};

  return (
    <div className="navigation-bar">
      <div className="navigation-bar__primary">
        <img src={logo} alt="logo" onClick={() => navigate("/")} />
        {user && (
          <p className="user-greeting">
            Hi, {capitalizeFirstLetter(user?.username)}
          </p>
        )}
      </div>
      {user && <CustomizedInputBase />}
      <div className="row items-center">
        {user ? (
          <>
            <a href={`/user/${user.username}`} className="flex">
              <img
                className="w-10 h-10"
                src={
                  !user.profileImageUrl
                    ? avatar
                    : UrlExists(user.profileImageUrl) !== 404
                    ? user.profileImageUrl
                    : avatar
                }
                style={{ borderRadius: "9999px" }}
              />
            </a>
            <LoggedInMenu />
          </>
        ) : (
          <LoggedOutMenu />
        )}
      </div>
    </div>
  );
}
