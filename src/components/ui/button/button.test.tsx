import { render, screen } from "@testing-library/react";
import { Button } from "./button";
import userEvent from "@testing-library/user-event";


describe("Check Button component", () => {
  
  /* кнопки с текстом */
  it("button with text", () => {
    const { getByRole } = render(<Button text="Text" />);
    const btn = getByRole("button");
    expect(btn).toMatchSnapshot();
  });

  /* кнопки без текста */
  it("button without text", () => {
    const { getByRole } = render(<Button />);
    const btn = getByRole("button");
    expect(btn).toMatchSnapshot();
  });

  /* заблокированной кнопки */
  it("disabled button", () => {
    const { getByRole } = render(<Button disabled />);
    const btn = getByRole("button");
    expect(btn).toMatchSnapshot();
  });

  /* кнопки с индикацией загрузки */
  it("Button Loader is active", () => {
    const { getByRole } = render(<Button isLoader />);
    const btn = getByRole("button");
    expect(btn).toMatchSnapshot();
  });

  /* Проверяем корректность вызова колбека при клике на кнопку */
  it("Button onClick", () => {
    const onClick = jest.fn();
    render(<Button onClick={onClick} text={"TEST"} />);

    userEvent.click(screen.getByText("TEST"));
    expect(onClick).toHaveBeenCalled();
  });
});
