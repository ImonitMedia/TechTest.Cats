import React from "react";
import { fireEvent, render, waitFor, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Upload } from "pages/Upload/Upload";

const file = new File(["Dummy content"], "example.txt", { type: "text/plain" });

describe("FileUploadField", () => {
  render(<Upload />);
  const fileUpload = screen.getByTestId("file-uploader");
  const formSubmit = screen.getByTestId("form-submitter");

  Object.defineProperty(fileUpload, "files", {
    value: [file],
  });

  test("Uploading an incorrect file type will trigger an error", async () => {
    fireEvent.change(fileUpload);
    fireEvent.click(formSubmit);
    await waitFor(() => screen.getByTestId("error-message"));

    expect(screen.getByTestId("error-message")).toBeTruthy();
  });
});
