import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { IoCloseOutline, IoMenuOutline } from "react-icons/io5";

import "../global.css";
import { useAuthContext } from "../context/auth";
import { capitalizeFirstLetter, UrlExists } from "../utils/helpers";

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

  return (
    <header className="header skewBg" data-header>
      <div className="container">
        {/* <img src={logo} alt="logo" onClick={() => navigate("/")} /> */}
        <a onClick={() => navigate("/")} className="logo">
          GameUp
        </a>

        {/* {user && (
          <p className="user-greeting">
            Hi, {capitalizeFirstLetter(user?.username)}
          </p>
        )} */}

        {/* {user && <CustomizedInputBase />} */}

        <nav
          className={togglerIsActive ? "navbar active" : "navbar"}
          data-navbar
        >
          {user ? (
            <li className="navbar-item">
              {user && (
                <ul className="navbar-list">
                  <a href={`/user/${user.username}`}>
                    <li className="navbar-link">
                      <h3 className="h3">My Profile</h3>
                    </li>
                  </a>
                  <hr className="hr-style" />
                  <a href={`/user/${user.username}/settings`}>
                    <li className="navbar-link">
                      <h3 className="h3">My Account</h3>
                    </li>
                  </a>
                  <li className="navbar-link">
                    <h3 className="h3" onClick={logout}>
                      <span></span>
                      Logout
                    </h3>
                  </li>
                </ul>
              )}
            </li>
          ) : (
            <ul className="navbar-list">
              <li className="navbar-link">
                <Link to="login" data-nav-link>
                  <h3 className="h3" onClick={handleShowLoginForm}>
                    LOGIN
                  </h3>
                </Link>
              </li>

              <li className="navbar-link">
                <Link to="register" data-nav-link>
                  <h3 className="h3">REGISTER</h3>
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
