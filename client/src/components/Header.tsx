import { useAuthContext } from "../context/auth";
import logo from "./assets/logo-transparent.png";
import avatar from "./assets/avatar.png";
import LoggedInMenu from "./LoggedInMenu";
import LoggedOutMenu from "./LoggedOutMenu";
import "./componentStyles.css";
import CustomizedInputBase from "./SearchBar";
import { useNavigate, Link } from "react-router-dom";
import { capitalizeFirstLetter, UrlExists } from "../utils/helpers";
import { IoCloseOutline, IoMenuOutline, IoCloseSharp, IoAlarmOutline } from "react-icons/io5";

import "../global.css";
import { useState } from "react";

const navbar: any = document.querySelector("[data-navbar]");
const navbarLinks = document.querySelectorAll("[data-nav-link]");
const navbarToggler: any = document.querySelector("[data-nav-toggler]");

// navbarToggler.addEventListener("click", function () {
//   navbar.classList.toggle("active");
//   this.classList.toggle("active");
// });

// for (let i = 0; i < navbarLinks.length; i++) {
//   navbarLinks[i].addEventListener("click", function () {
//     navbar.classList.remove("active");
//     navbarToggler.classList.remove("active");
//   });
// }

export default function Header() {
  const { user, logout } = useAuthContext();
  const [togglerIsActive, setTogglerIsActive] = useState(false);
  const [loginFormIsActive, setLoginFormIsActive] = useState(false);

  const navigate = useNavigate();
  const navgiateToUserProfile = () => {};

  const handleToggler = () => {
    setTogglerIsActive(!togglerIsActive);
  };
  const handleShowLoginForm = () => {
    setLoginFormIsActive(!loginFormIsActive);
  };

  console.log(togglerIsActive);

  return (
    <header className="header skewBg" data-header>
      <div className="container">
        {/* <img src={logo} alt="logo" onClick={() => navigate("/")} /> */}
        <a href="#" className="logo">
          GameUp
        </a>

        {user && (
          <p className="user-greeting">
            Hi, {capitalizeFirstLetter(user?.username)}
          </p>
        )}

        {/* {user && <CustomizedInputBase />} */}

        <nav
          className={togglerIsActive ? "navbar active" : "navbar"}
          data-navbar
        >
          {user ? (
            <li className="navbar-item">
              {user && (
                <>
                  <button onClick={logout}>Logout</button>
                </>
              )}
            </li>
          ) : (
            <ul className="navbar-list">
              <li className="navbar-item">
                <Link to="login" className="navbar-link" data-nav-link>
                  <button onClick={handleShowLoginForm}>LOGIN</button>
                </Link>
              </li>

              <li className="navbar-item">
                <Link to="register" className="navbar-link" data-nav-link>
                  <button>REGISTER</button>
                </Link>
              </li>
            </ul>
          )}
        </nav>
        <button
          className="nav-toggle-btn"
          aria-label="toggle menu"
          data-nav-toggler
          onClick={handleToggler}
        >
          {togglerIsActive ? (
            <IoCloseOutline className="close"></IoCloseOutline>
          ) : (
            <IoMenuOutline className="menu"></IoMenuOutline>
          )}
        </button>
      </div>
    </header>
  );
}

{
  /* <a href={`/user/${user.username}`} className="flex">
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
              </a> */
}
