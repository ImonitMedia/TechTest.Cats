import { ChangeEvent, FormEvent, useState } from "react";
import { Link } from "react-router-dom";
import { images } from "./services";
import { Loading } from "./components";
import "./styles.scss";

export function Upload() {
  const [file, setFile] = useState<File>(undefined);
  const [imgURL, setImgURL] = useState<string>(undefined);
  const [result, setResult] = useState<"success" | "no-file">(undefined);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (file) {
      setIsLoading(true);
      const fetchData = async () => {
        const res = await images.upload(file);
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
    setFile(undefined);
    setResult(undefined);
    setImgURL(undefined);
  }

  return (
    <div className="upload">
      <h1>Upload</h1>

      <form onSubmit={onSubmit}>
        <p>Please upload a new cat</p>
        {result === "no-file" && (
          <p className="error">Please specify a file to upload</p>
        )}
        <p>
          <input type="file" onClick={clear} onChange={onChange} />
        </p>
        <p>
          <button type="submit">Upload</button>
        </p>
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
