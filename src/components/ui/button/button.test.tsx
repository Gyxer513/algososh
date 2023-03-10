import { render, screen } from "@testing-library/react";
import { Button } from "./button";
import userEvent from "@testing-library/user-event";

describe("Check Button component", () => {
  it("should render with text", () => {
    const { getByRole } = render(<Button text="Text" />);
    const btn = getByRole("button");
    expect(btn).toMatchSnapshot();
  });
  it("should render without text", () => {
    const { getByRole } = render(<Button />);
    const btn = getByRole("button");
    expect(btn).toMatchSnapshot();
  });
  it("disabled button", () => {
    const { getByRole } = render(<Button disabled />);
    const btn = getByRole("button");
    expect(btn).toMatchSnapshot();
  });
  it("Button Loader is active", () => {
    const { getByRole } = render(<Button isLoader />);
    const btn = getByRole("button");
    expect(btn).toMatchSnapshot();
  });

  it("Button onClick", () => {
    const onClick = jest.fn();
    render(<Button onClick={onClick} text={"Test text"} />);

    userEvent.click(screen.getByText("Test text"));
    expect(onClick).toHaveBeenCalled();
  });
});
