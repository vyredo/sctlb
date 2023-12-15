import ImageCarousel from "./ImageCarousel";
import { render } from "@testing-library/react";
import React from "react";

describe("Image carousel", () => {
  it("should render 5 images", () => {
    const images = [
      "https://images.unsplash.com/photo-1612836266864-5f8e2e5e0b3e?ixid=MXwxMjA3fDB8MHxzZWFyY2h8Mnx8c2hvcHBpbmd8ZW58MHx8MHw%3D&ixlib=rb-1.2.1&w=1000&q=80",
      "https://images.unsplash.com/photo-1612836266864-5f8e2e5e0b3e?ixid=MXwxMjA3fDB8MHxzZWFyY2h8Mnx8c2hvcHBpbmd8ZW58MHx8MHw%3D&ixlib=rb-1.2.1&w=1000&q=80",
      "https://images.unsplash.com/photo-1612836266864-5f8e2e5e0b3e?ixid=MXwxMjA3fDB8MHxzZWFyY2h8Mnx8c2hvcHBpbmd8ZW58MHx8MHw%3D&ixlib=rb-1.2.1&w=1000&q=80",
      "https://images.unsplash.com/photo-1612836266864-5f8e2e5e0b3e?ixid=MXwxMjA3fDB8MHxzZWFyY2h8Mnx8c2hvcHBpbmd8ZW58MHx8MHw%3D&ixlib=rb-1.2.1&w=1000&q=80",
      "https://images.unsplash.com/photo-1612836266864-5f8e2e5e0b3e?ixid=MXwxMjA3fDB8MHxzZWFyY2h8Mnx8c2hvcHBpbmd8ZW58MHx8MHw%3D&ixlib=rb-1.2.1&w=1000&q=80",
    ];

    const { container } = render(<ImageCarousel images={images} />);
    const image = container.querySelectorAll(".item");

    expect(image.length).toBe(images.length);
  });
});
