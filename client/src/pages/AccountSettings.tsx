import { useMutation } from "@apollo/client";
import React, { useEffect, useState } from "react";
import ProfileImageUploader from "../components/userProfile/ProfileImageUploader";
import { useAuthContext } from "../context/auth";
import { UPDATE_USER_PROFILE_IMAGE } from "../graphql/mutations";

const AccountSettings = () => {
  const { user, updateUserDetails } = useAuthContext();
  const [profileImageUrl, setProfileImageUrl] = useState<string | null>(null);

  const [updateUserProfileImage, { data, loading }] = useMutation(
    UPDATE_USER_PROFILE_IMAGE,
    {
      variables: { userId: user?.id, profileImageUrl: profileImageUrl || "" },
    }
  );

  useEffect(() => {
    if (!!profileImageUrl) {
      updateUserProfileImage();
    }
  }, [profileImageUrl]);

  useEffect(() => {
    if (!loading && !!data) {
      const { updateUserProfileImage } = data || {};
      updateUserDetails({ userData: { ...updateUserProfileImage } });
    }
  }, [loading, data]);

  // const [userProfileView, setUserProfileView] = React.useState("account");

  // const handleViewChange = (
  //   event: React.MouseEvent<HTMLElement>,
  //   nextView: string
  // ) => {
  //   setUserProfileView(nextView);
  // };

  // PAGE WILL HOLD MORE SETTINGS IN THE FUTURE eg: delete account, change username, email,

  return (
    <div className="settings-page">
      <div className="current-avatar__wrapper">
        <h3 className="h3">Current Avatar</h3>
        <div className="current-avatar">
          <img src={user?.profileImageUrl} alt="avatar" />
        </div>
      </div>
      <ProfileImageUploader setProfileImageUrl={setProfileImageUrl} />
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
