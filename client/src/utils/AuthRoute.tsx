import React, { useEffect } from "react";
import { useAuthContext } from "../context/auth";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useNavigate,
} from "react-router-dom";

import Header from "../components/Header";
import Register from "../pages/Register";
import NotFound from "../pages/NotFound";
import Home from "../pages/Home";
import Login from "../pages/Login";
import PostPage from "../pages/PostPage";
import GameDashboard from "../admin/GameDashboard";
import UserProfile from "../pages/UserProfile";
import AccountSettings from "../pages/AccountSettings";
import Footer from "../components/Footer";
import GameImageUploader from "../components/GameImageUploader";

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
      <Header />
      <main className="main-content">
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
          <Route
            path="/post/:id"
            element={user ? <PostPage /> : <Redirect to="/login" />}
          />
          <Route
            path="/user/:username"
            element={user ? <UserProfile /> : <Redirect to="/login" />}
          />
          <Route
            path="/user/:username/settings"
            element={user ? <AccountSettings /> : <Redirect to="/login" />}
          />
          <Route
            path="/uploader"
            element={user ? <GameImageUploader /> : <Redirect to="/login" />}
          />
          {user?.email === "admin@mail.com" && (
            <Route path="/gameDB" element={<GameDashboard />} />
          )}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      {user && <Footer />}
    </Router>
  );
};

export default AuthRoute;
