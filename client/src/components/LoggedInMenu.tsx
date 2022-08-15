import React from "react";
import { useAuthContext } from "../context/auth";
import { Button } from "@mui/material";

const LoggedInMenu = () => {
  const { user, logout } = useAuthContext();

  return (
    <li className="navbar-item">
      {user && (
        <>
          <Button
            // sx={{
            //   marginLeft: 2,
            // }}
            variant="outlined"
            onClick={logout}
          >
            Logout
          </Button>
        </>
      )}
    </li>
  );
};

export default LoggedInMenu;
