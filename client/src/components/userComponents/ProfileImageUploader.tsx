import { FormEvent, useState } from "react";
import styles from "./profileImageUploader.module.scss";

const ProfileImageUploader = () => {
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
    setImageSrc(data.secure_url);
    setUploadData(data);
  }

  return (
    <div className="">
      <main className="">
        <h1 className="">Image Uploader</h1>

        <p className="">Upload your image to Cloudinary!</p>

        <form
          className=""
          method="post"
          onChange={(e) => handleOnChange(e)}
          onSubmit={handleOnSubmit}
        >
          <p>
            <input type="file" name="file" />
          </p>

          <img className={styles.uploadedImage} src={imageSrc} />

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
