import React from "react";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Alert } from "components/Alert/Alert";

describe("I will get an alert", () => {
  test("An error will be returned", () => {
    render(<Alert message="Error message" type="error" />);
  });

  test("A success message will be returned", () => {
    render(<Alert message="Success message" type="success" />);
  });
});
