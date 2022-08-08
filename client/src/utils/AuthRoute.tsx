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
import GameDashboard from "../admin/GameDashboard";

function Redirect({ to }: RedirectProps) {
  let navigate = useNavigate();
  useEffect(() => {
    navigate(to);
  });
  return null;
}

const AuthRoute = () => {
  const { user } = useAuthContext();

  console.log('Authroute')

  return (
    <Router>
      <NavBar />
      <div>
        <Routes>
          <Route
            path="/"
            element={user ? <Home /> : <Redirect to="/login" />}
          />
          <Route
            path="/login"
            element={user ? <Redirect to="/" /> : <Login />}
          />
          <Route
            path="/register"
            element={user ? <Redirect to="/" /> : <Register />}
          />
          <Route path="/post/:id" element={<PostPage />} />
          {user?.email === "admin@mail.com" && (
            <Route path="/gameDB" element={<GameDashboard />} />
          )}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </Router>
  );
};

export default AuthRoute;
