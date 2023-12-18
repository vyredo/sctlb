import { ImageViewer } from "./ImageViewer";
import { render } from "@testing-library/react";
import React from "react";

describe("ImageViewer", () => {
  it("should render empth when image is empty", () => {
    const images: string[] = [];
    const { baseElement } = render(<ImageViewer images={images} />);
    expect(baseElement).toBeTruthy();
  });

  it("should render  when image is not empty", () => {
    const images: string[] = ["image1", "image2"];
    const { baseElement } = render(<ImageViewer images={images} />);
    expect(baseElement).toBeTruthy();
  });
});
