import React from "react";

const AccountSettings = () => {
  // const [userProfileView, setUserProfileView] = React.useState("account");

  // const handleViewChange = (
  //   event: React.MouseEvent<HTMLElement>,
  //   nextView: string
  // ) => {
  //   setUserProfileView(nextView);
  // };

  return (
    <div className="settings-page">
      {/* <div id="user-profile__nav" className="column">
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
      </div> */}
    </div>
  );
};

export default AccountSettings;
