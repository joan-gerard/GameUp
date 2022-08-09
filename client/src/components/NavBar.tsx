import { useAuthContext } from "../context/auth";
import logo from "./assets/logo-transparent.png";
import LoggedInMenu from "./LoggedInMenu";
import LoggedOutMenu from "./LoggedOutMenu";
import "./componentStyles.css";
import CustomizedInputBase from "./SearchBar";
import { useNavigate } from "react-router-dom";
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
  const { user } = useAuthContext();

  const navigate = useNavigate();

  // const menuBar = user ? <LoggedInMenu /> : <LoggedOutMenu />;

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
      <div className="">{user ? <LoggedInMenu /> : <LoggedOutMenu />}</div>
    </div>
  );
}
