import React, { useState } from "react";
import UserAccount from "../components/userComponents/UserAccount";
import UserSettings from "../components/userComponents/UserSettings";
// import "./userComponents.css";
import { ToggleButton, ToggleButtonGroup } from "@mui/material";
import DeleteAccount from "../components/userComponents/DeleteAccount";
import { useAuthContext } from "../context/auth";

const UserProfile = () => {

  const { user } = useAuthContext();

console.log(user)
  const [showAboutMe, setShowAboutMe] = useState<boolean>(false);
  const [showMyGames, setShowMyGames] = useState<boolean>(false);
  const [showMyPosts, setShowMyPosts] = useState<boolean>(false);

  return (
    <div className="profile-page">
      <div className="profile-page-container">
        <div className="profile-header">
          <button onClick={() => setShowAboutMe(!showAboutMe)}>About me</button>
          {showAboutMe && <h2 className="collapsible">This is about me</h2>}
          <button onClick={() => setShowMyGames(!showMyGames)}>My games</button>
          {showMyGames && <h2 className="collapsible">These are my games</h2>}

          <button onClick={() => setShowMyPosts(!showMyPosts)}>My posts</button>
          {showMyPosts && <h2 className="collapsible">These are my posts</h2>}
        </div>
      </div>
    </div>
  );
};

export default UserProfile;

