/**
 * @jest-environment jsdom
 */
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Home from "@/app/page";

describe("Home", () => {
  it("should contain 'Docs' text", () => {
    render(<Home />); //ARRANGE

    const heading = screen.getByText("Docs"); //ACT

    expect(heading).toBeInTheDocument(); //ASSERT
  });
  it("should contain 'information' text", () => {
    render(<Home />); //ARRANGE

    const heading = screen.getByText(/information/i); //ACT

    expect(heading).toBeInTheDocument(); //ASSERT
  });
  it("should have a heading", () => {
    render(<Home />); //ARRANGE

    const heading = screen.getByRole("heading", {
      name: /learn/i,
    }); //ACT

    expect(heading).toBeInTheDocument(); //ASSERT
  });
});
