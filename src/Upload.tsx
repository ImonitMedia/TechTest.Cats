import { ChangeEvent, FormEvent, useState } from "react";
import { Link } from "react-router-dom";
import { uploadImage } from "./utils";
import { Loading } from "./components/Loading";
import "./styles.scss";

export function Upload() {
  const [file, setFile] = useState<File | null>(null);
  const [imgURL, setImgURL] = useState<string>("");
  const [result, setResult] = useState<Results>("unset");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (file) {
      setIsLoading(true);
      const fetchData = async () => {
        const res = await uploadImage(file);
        setResult("success");
        setImgURL(res.url);
        setIsLoading(false);
      };

      fetchData();
    } else {
      setResult("no-file");
    }
  }

  function onChange(e: ChangeEvent<HTMLInputElement>) {
    setFile(e.target.files[0]);
  }

  function clear() {
    setFile(null);
    setResult("unset");
    setImgURL("");
  }

  return (
    <div className="upload">
      <h1>Upload</h1>

      <p>Please upload a new cat</p>
      {result === "no-file" && (
        <p className="error">Please specify a file to upload</p>
      )}
      <form onSubmit={onSubmit}>
        <fieldset>
          <div className="field-row">
            <input type="file" onClick={clear} onChange={onChange} />
          </div>
          <div className="field-row">
            <button type="submit">Upload</button>
          </div>
        </fieldset>
      </form>

      <hr />

      {result === "success" && (
        <>
          <p className="success">
            Your cat was uploaded successfully! Please{" "}
            <Link to="/">Click here</Link> to see your cats
          </p>
          <p>
            <img className="uploaded-img" src={imgURL} alt="" />
          </p>
        </>
      )}

      {isLoading && <Loading message="Uploading your cat..." size="large" />}
    </div>
  );
}

type Results = "success" | "no-file" | "unset";
