import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import React from "react";
import { Circle } from "./circle";
import { ElementStates } from "../../../types/element-states";

describe("Circle tests", () => {
  /* без буквы */
  it("Circle without letter", () => {
    const circle = <Circle />;
    render(circle);
    expect(screen.getByTestId("circleContent")).toHaveTextContent("");
  });
  /* с буквами */
  it("Circle with letter", () => {
    const circle = <Circle letter="a" />;
    render(circle);
    expect(screen.getByTestId("circleContent")).toHaveTextContent("a");
  });
  /* с head */
  it("Circle with head", () => {
    const circle = <Circle head="a" />;
    render(circle);
    expect(screen.getByTestId("head")).toHaveTextContent("a");
  });
  /* с react-элементом в head */
  it("Circle with circle head", () => {
    const circle = <Circle tail={<Circle />} />;
    render(circle);
    expect(screen.getAllByTestId("circleContent").length).toBe(2);
  });
  /* с tail */
  it("Circle with tail", () => {
    const circle = <Circle tail="a" />;
    render(circle);
    expect(screen.getByTestId("tail")).toHaveTextContent("a");
  });
  /* с react-элементом в tail */
  it("Circle with tail head", () => {
    const circle = <Circle tail={<Circle />} />;
    render(circle);
    expect(screen.getAllByTestId("circleContent").length).toBe(2);
  });
  /* c index */
  it("Circle with index", () => {
    const circle = <Circle index={0} />;
    render(circle);
    expect(screen.getByTestId("circleContent")).toHaveTextContent(String(0));
  });
  /* с пропом isSmall ===  true */
  it("Circle is small", () => {
    const circle = <Circle isSmall={true} />;
    render(circle);
    screen.debug();
    expect(screen.getByTestId("circle")).not.toHaveStyle("width: 80px");
  });
  /* в состоянии default */
  it("Circle Default", () => {
    const circle = <Circle state={ElementStates.Default} />;
    render(circle);
    expect(screen.getByTestId("circle")).toHaveStyle(
      "border-color:  --default-color"
    );
  });
  /* в состоянии changing */
  it("Circle Changing", () => {
    const circle = <Circle state={ElementStates.Changing} />;
    render(circle);
    expect(screen.getByTestId("circle")).toHaveStyle(
      "border-color:  --changing-color"
    );
  });
  /*  в состоянии modified */
  it("Circle Modified", () => {
    const circle = <Circle state={ElementStates.Modified} />;
    render(circle);
    expect(screen.getByTestId("circle")).toHaveStyle(
      "border-color:  --modified-color"
    );
  });
});
