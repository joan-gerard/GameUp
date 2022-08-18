import { useMutation } from "@apollo/client";
import React, { useState, FormEvent, useEffect } from "react";
import { useAuthContext } from "../../context/auth";
import { UPDATE_USER_PROFILE_IMAGE } from "../../graphql/mutations";
import ProfileImageUploader from "./ProfileImageUploader";
import styles from "./profileImageUploader.module.scss";

const UserSettings = () => {
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

  return <ProfileImageUploader setProfileImageUrl={setProfileImageUrl} />;
};

export default UserSettings;
