import React, { useEffect } from "react";
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
import PostPage from "../pages/PostPage";

function Redirect({ to }: RedirectProps) {
  let navigate = useNavigate();
  useEffect(() => {
    navigate(to);
  });
  return null;
}

const AuthRoute = () => {
  const { user } = useAuthContext();

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
        <Route path="/post/:id" element={<PostPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};

export default AuthRoute;
