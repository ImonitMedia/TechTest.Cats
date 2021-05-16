import React from "react";
import {
  fireEvent,
  render,
  queryByTestId,
  waitFor,
  screen,
} from "@testing-library/react";
import "@testing-library/jest-dom";
import { Upload } from "pages/Upload/Upload";

const file = new File(["dummy content"], "example.jpg", { type: "image/jpeg" });

describe("FileUploadField", () => {
  render(<Upload />);
  const fileUpload = screen.getByTestId("file-uploader");
  const formSubmit = screen.getByTestId("form-submitter");

  Object.defineProperty(fileUpload, "files", {
    value: [file],
  });

  test("Uploading an image", async () => {
    fireEvent.change(fileUpload);
    fireEvent.click(formSubmit);
    await waitFor(() => screen.getByTestId("uploaded-img"));

    expect(screen.getByTestId("uploaded-img")).toBeTruthy();
  });
});
