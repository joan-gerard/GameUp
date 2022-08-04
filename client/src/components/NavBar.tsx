
import { useAuthContext } from "../context/auth";
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
  const { user } = useAuthContext();

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
