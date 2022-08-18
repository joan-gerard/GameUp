import { Button } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

const LoggedOutMenu = () => {
  return (
    <li className="navbar-item">
      <Link to="login" className="navbar-link skewBg" data-nav-link>
        <button>Login</button>
      </Link>
      <Link to="register" className="navbar-link skewBg" data-nav-link>
        <button>Sign up</button>
      </Link>
    </li>
  );
};

export default LoggedOutMenu;
