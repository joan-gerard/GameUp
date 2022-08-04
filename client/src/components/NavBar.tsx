import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";

import { useAuthContext } from "../context/auth";
import { Link } from "react-router-dom";
import { capitalizeFirstLetter } from "../utils/helpers";
import logo from "./assets/logo.webp";
import LoggedInMenu from "./LoggedInMenu";
import LoggedOutMenu from "./LoggedOutMenu";
import "./componentStyles.css";
import CustomizedInputBase from "./SearchBar";

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
  const { user, logout } = useAuthContext();

  // const menuBar = user ? <LoggedInMenu /> : <LoggedOutMenu />;

  return (
    <div className="navigation-bar">
      <div className="navigation-bar__primary">
        <img src={logo} alt="logo" />
        <CustomizedInputBase />
      </div>
      <div className="">{user ? <LoggedInMenu /> : <LoggedOutMenu />}</div>
    </div>
  );
}
