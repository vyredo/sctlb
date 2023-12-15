import { Stars } from "./Star";
import { render } from "@testing-library/react";
import React from "react";

describe("Stars", () => {
  it("should render 5 stars", () => {
    const { container } = render(<Stars rating={5} />);
    const star = container.querySelectorAll(".full-stars")[0];

    // @ts-ignore
    expect(star.style._values.width).toBe("100%");
  });

  it("should render 3 stars", () => {
    const { container } = render(<Stars rating={2.5} />);
    const star = container.querySelectorAll(".full-stars")[0];
    // @ts-ignore
    expect(star.style._values.width).toBe("50%");
  });

  it("should render 0 stars", () => {
    const { container } = render(<Stars rating={0} />);
    // width of fullstar is 0px
    const star = container.querySelectorAll(".full-stars")[0];
    expect(star.clientWidth).toBe(0);
  });
});
