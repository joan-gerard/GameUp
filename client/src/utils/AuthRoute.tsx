import React, { useContext, useEffect } from "react";
import { useAuthContext } from "../context/auth";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useNavigate,
} from "react-router-dom";
import NavBar from "../components/NavBar";
import Register from "../pages/Register";
import NotFound from "../pages/NotFound";
import Home from "../pages/Home";
import Login from "../pages/Login";

// @ts-ignore
function Redirect({ to }) {
  let navigate = useNavigate();
  useEffect(() => {
    navigate(to);
  });
  return null;
}

const AuthRoute = () => {
  const { user } = useAuthContext();

  console.log("AuthRoute user", user);
  //   if (user) {
  //     return (
  //         <Route>
  //             <Redirect to="/" />
  //         </Route>
  //     );
  //   }
  //   return <Route {...rest} element={<Element />} />;
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/" element={user ? <Home /> : <Redirect to="/login" />} />
        <Route path="/login" element={user ? <Redirect to="/" /> : <Login />} />
        <Route
          path="/register"
          element={user ? <Redirect to="/" /> : <Register />}
        />
        {/* <Route path="/register" user ? element={<Home />} : element={<Register />} /> */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};

export default AuthRoute;
