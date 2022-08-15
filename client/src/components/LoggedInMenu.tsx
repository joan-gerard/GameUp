import React from "react";
import { useAuthContext } from "../context/auth";
import { Button } from "@mui/material";

const LoggedInMenu = () => {
  const { user, logout } = useAuthContext();

  return (
    <div className="logged-in__menu">
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
    </div>
  );
};

export default LoggedInMenu;
