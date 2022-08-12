import { FormEvent, useState } from "react";
import { useAuthContext } from "../../context/auth";
import styles from "./profileImageUploader.module.scss";

const ProfileImageUploader: React.FC<ProfileImageUploaderProps> = ({
  setProfileImageUrl,
}) => {
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [uploadData, setUploadData] = useState(null);

  /**
   * handleOnChange
   * @description Triggers when the file input changes (ex: when a file is selected)
   */

  function handleOnChange(e: FormEvent<HTMLFormElement>) {
    const reader = new FileReader();

    reader.onload = function (onLoadEvent: ProgressEvent<FileReader> | null) {
      if (typeof onLoadEvent?.target?.result === "string") {
        setImageSrc(onLoadEvent.target.result);
      }
      // setUploadData(null);
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
    currentTarget: HTMLFormElement;
  }) {
    e.preventDefault();
    const form = e.currentTarget;
    const fileInput: any = Array.from(form.elements).find(
      // @ts-ignore
      ({ name }) => name === "file"
    );

    const formData = new FormData();

    if (!!fileInput) {
      for (const file of fileInput.files) {
        formData.append("file", file);
      }

      formData.append("upload_preset", "my-uploads");
    }

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

  return (
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
          <div className={styles.uploadedImageContainer}>
            <img
              className={imageSrc ? styles.uploadedImage : ""}
              src={imageSrc || ""}
            />
          </div>

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
  );
};

export default ProfileImageUploader;
