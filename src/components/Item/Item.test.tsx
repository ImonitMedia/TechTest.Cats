import React from "react";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom";
import { IImageData } from "types";
import { Item } from "components/Item/Item";

const item: IImageData = {
  breed_ids: null,
  breeds: [],
  created_at: "2021-05-16T11:17:35.000Z",
  height: 340,
  id: "wbgR-JF5B",
  original_filename: "cat1.jpg",
  sub_id: "ct_test_cat",
  url: "https://cdn2.thecatapi.com/images/wbgR-JF5B.jpg",
  width: 509,
};

describe("Show an image item", () => {
  test("An item will render", () => {
    render(<Item item={item} />);
  });
});
