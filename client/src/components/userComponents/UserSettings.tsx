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

  // const handleUpdateUserProfileImage = (e: React.FormEvent<HTMLFormElement>) => {
  //   e.preventDefault()
  //   updateUserProfileImage();
  // };

  // console.log("profileImageUrl", profileImageUrl);
  // UPLOADER BELOW

  const [imageSrc, setImageSrc] = useState();
  const [uploadData, setUploadData] = useState();
  /**
   * handleOnChange
   * @description Triggers when the file input changes (ex: when a file is selected)
   */

  function handleOnChange(e: FormEvent<HTMLFormElement>) {
    const reader = new FileReader();

    reader.onload = function (onLoadEvent: any) {
      setImageSrc(onLoadEvent.target.result);
      setUploadData(undefined);
    };

    // @ts-ignore
    reader.readAsDataURL(e.target.files[0]);
  }

  /**
   * handleOnSubmit
   * @description Triggers when the main form is submitted
   */

  async function handleOnSubmit(e: {
    preventDefault: () => void;
    currentTarget: any;
  }) {
    e.preventDefault();

    const form = e.currentTarget;
    const fileInput: any = Array.from(form.elements).find(
      // @ts-ignore
      ({ name }) => name === "file"
    );

    const formData = new FormData();

    for (const file of fileInput.files) {
      formData.append("file", file);
    }

    formData.append("upload_preset", "my-uploads");

    const data = await fetch(
      "https://api.cloudinary.com/v1_1/dpo5hvd8r/image/upload",
      {
        method: "POST",
        body: formData,
      }
    ).then((r) => r.json());
    setProfileImageUrl(data.secure_url);

    setImageSrc(data.secure_url);
    setUploadData(data);
  }
  // UPLOADER ABOVE

  return (
    <div>
      {/* <form onSubmit={handleUpdateUserProfileImage}>
        <label>
          <input
            type="test"
            value={profileImageUrl}
            onChange={(e) => setProfileImageUrl(e.target.value)}
          ></input>
          <button type="submit">Upload</button>
        </label>
      </form> */}

      <div className="">
        <main className="">
          <h1 className="">Image Uploader</h1>

          <form
            className=""
            method="post"
            onChange={(e) => handleOnChange(e)}
            onSubmit={handleOnSubmit}
          >
            <p>
              <input type="file" name="file" />
            </p>

            <img className={imageSrc ? (styles.uploadedImage) : ("")} src={imageSrc} />

            {imageSrc && !uploadData && (
              <p>
                <button>Upload Files</button>
              </p>
            )}

            {uploadData && (
              <code>
                <pre>{JSON.stringify(uploadData, null, 2)}</pre>
              </code>
            )}
          </form>
        </main>
      </div>
    </div>
  );
};

export default UserSettings;
