import React, { ChangeEvent, FormEvent, useState } from "react";
import { Link } from "react-router-dom";
import { uploadImage } from "services";
import { Alert } from "components/Alert/Alert";
import { Loading } from "components/Loading/Loading";
import "./Upload.scss";

const allowedFileTypes = ["image/gif", "image/jpeg", "image/jpg", "image/png"];
const banners = {
  noFile: "File not selected: Please specify a file to upload",
  invalid: "File type not allowed: The image format must be JPG, PNG or GIF.",
};

export function Upload() {
  const [disabled, setDisabled] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [file, setFile] = useState<File | null>(null);
  const [imgURL, setImgURL] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);

  function validation() {
    if (!file) {
      setError(banners.noFile);
      return;
    } else {
      if (!allowedFileTypes.includes(file.type)) {
        setError(banners.invalid);
        return;
      }

      return true;
    }
  }

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const canProceed = validation();

    if (canProceed && file) {
      setIsLoading(true);
      setDisabled(true);

      const fetchData = async () => {
        const res = await uploadImage(file);

        if (typeof res === "string") {
          setError(res);
        } else {
          setSuccess(true);
          setImgURL(res.url);
        }
        setIsLoading(false);
      };

      fetchData();
    }
  }

  function onChange(e: ChangeEvent<HTMLInputElement>) {
    setDisabled(false);
    setFile(e.target.files?.[0] || null);
  }

  function clear() {
    setFile(null);
    setError("");
    setImgURL("");
  }

  return (
    <div className="upload">
      <h1>Upload</h1>

      <p>Please upload a new cat</p>
      <p>
        <small>The image format must be JPG, PNG or GIF.</small>
      </p>

      {error && <Alert message={error} type="error" />}

      <form onSubmit={onSubmit}>
        <fieldset>
          <div className="field-row">
            <input
              type="file"
              data-testid="file-uploader"
              onClick={clear}
              onChange={onChange}
            />
          </div>
          <div className="field-row">
            <button
              type="submit"
              data-testid="form-submitter"
              disabled={disabled}
            >
              Upload
            </button>
          </div>
        </fieldset>
      </form>

      {success && (
        <>
          <hr />
          <Alert
            message={
              <>
                Your cat was uploaded successfully!
                <br />
                <small>
                  Please <Link to="/">Click here</Link> to see your cats
                </small>
              </>
            }
            type="success"
          />

          <p>
            <img
              className="uploaded-img"
              data-testid="uploaded-img"
              src={imgURL}
              alt=""
            />
          </p>
        </>
      )}

      {isLoading && <Loading message="Uploading your cat..." size="large" />}
    </div>
  );
}

type Results = "success" | "no-file" | "unset";
