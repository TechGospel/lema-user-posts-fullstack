import React from "react";
import { render, screen } from "@testing-library/react";
import Loader from "./loader";

describe("Loader", () => {
  it("renders loader divs with correct background color", () => {
    render(<Loader backgroundColor="#ff0000" />);
    const loaderDivs = screen.getAllByTestId("loader-div");
    expect(loaderDivs).toHaveLength(3);

    loaderDivs.forEach((div) => {
      expect(div).toHaveStyle({ backgroundColor: "#ff0000" });
    });
  });
});


