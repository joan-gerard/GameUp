import { Button } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

const LoggedOutMenu = () => {
  return (
    <div>
      <Link to="login" className="links">
        <Button variant="contained">Login</Button>
      </Link>
      <Link to="register" className="links">
        <Button variant="outlined">Sign up</Button>
      </Link>
    </div>
  );
};

export default LoggedOutMenu;

