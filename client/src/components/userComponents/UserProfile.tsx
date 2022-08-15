import React from "react";
import UserAccount from "./UserAccount";
import UserSettings from "./UserSettings";
// import "./userComponents.css";
import { ToggleButton, ToggleButtonGroup } from "@mui/material";
import DeleteAccount from "./DeleteAccount";

const UserProfile = () => {
  const [userProfileView, setUserProfileView] = React.useState("account");

  const handleViewChange = (
    event: React.MouseEvent<HTMLElement>,
    nextView: string
  ) => {
    setUserProfileView(nextView);
  };

  return (
    <div
      className="c-white m-8 p-8 user-profile-layout"
      id="user-profile__container"
    >
      <div id="user-profile__nav" className="column">
        <ToggleButtonGroup
          // sx={{
          //   backgroundColor: "white",
          //   margin: 2,
          // }}
          orientation="vertical"
          value={userProfileView}
          exclusive
          onChange={handleViewChange}
        >
          <ToggleButton value="account" aria-label="account">
            <span>Account</span>{" "}
          </ToggleButton>
          <ToggleButton value="settings" aria-label="settings">
            <span>Settings</span>
          </ToggleButton>
          <ToggleButton value="delete" aria-label="delete">
            <span>Delete Account</span>
          </ToggleButton>
        </ToggleButtonGroup>
      </div>
      <div id="user-profile__data">
        {userProfileView === "account" ? (
          <UserAccount />
        ) : userProfileView === "settings" ? (
          <UserSettings />
        ) : (
          <DeleteAccount />
        )}
      </div>
    </div>
  );
};

export default UserProfile;
