import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";

import { useAuthContext } from "../context/auth";
import { Link } from "react-router-dom";
import { capitalizeFirstLetter } from "../utils/helpers";

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

  const menuBar = user ? (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <p>Hi, {capitalizeFirstLetter(user?.username)}</p>
          <Link to="login">
            <Button color="inherit" onClick={logout}>
              Logout
            </Button>
          </Link>
        </Toolbar>
      </AppBar>
    </Box>
  ) : (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Link to="login">
            <Button color="inherit">Login</Button>
          </Link>
          <Link to="register">
            <Button color="inherit">Register</Button>
          </Link>
        </Toolbar>
      </AppBar>
    </Box>
  );

  return menuBar;
}
