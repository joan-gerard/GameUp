import { FormEvent, useState } from "react";
// import styles from "./profileImageUploader.module.scss";

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
    <div className="image-uploader__wrapper">
      <h3 className="h3">Upload a new avatar</h3>

      <form
        className="image-uploader__form"
        method="post"
        onChange={(e) => handleOnChange(e)}
        onSubmit={handleOnSubmit}
      >
        {/* <p> */}
        <input
          type="file"
          id="file"
          name="file"
          className="choose-file__input"
          aria-label="File uploader"
        />
        {/* </p> */}
        <div className="uploaded-image__wrapper">
          <img
            className=""
            // className={imageSrc ? styles.uploadedImage : ""}
            src={imageSrc || ""}
          />
        </div>

        {imageSrc && !uploadData && (
          <div className="upload-image__button__wrapper">

            <button className="upload-image__button"><span>Upload Image</span></button>
          </div>
        )}
        {uploadData && (
          <h3 className="h3">Successfully uploaded!</h3>
          // <code>
          //   <pre>{JSON.stringify(uploadData, null, 2)}</pre>
          // </code>
        )}
      </form>
    </div>
  );
};

export default ProfileImageUploader;
