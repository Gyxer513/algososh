import { fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import React from "react";
import { reverseArray } from "./utils";
import { returner } from "../../utils/utils";
import { ElementStates } from "../../types/element-states";

describe("string algoritms tests", () => {
  /* С четным значением */
  it("should correct with even value", async () => {
    const input = [
      { item: "1" },
      { item: "2" },
      { item: "3" },
      { item: "4" },
    ];
    const output = [
      { item: "4", state: ElementStates.Modified },
      { item: "3", state: ElementStates.Modified },
      { item: "2", state: ElementStates.Modified },
      { item: "1", state: ElementStates.Modified },
    ];
    expect(await reverseArray(input, returner)).toEqual(output);
  });
  /*  С нечетным значением */
  it("should correct with not even value", async () => {
    const input = [{ item: "1" }, { item: "2" }, { item: "3" }];
    const output = [
      { item: "3", state: ElementStates.Modified },
      { item: "2", state: ElementStates.Modified },
      { item: "1", state: ElementStates.Modified },
    ];
    expect(await reverseArray(input, returner)).toEqual(output);
  });
  /* С одним значением */
  it("should correct with one value", async () => {
    const input = [{ item: "1" }];
    const output = [{ item: "1", state: ElementStates.Modified }];
    expect(await reverseArray(input, returner)).toEqual(output);
  });
  /* Пустая строка */
  it("should correct with empty value", async () => {
    const input: [] = [];
    expect(await reverseArray(input, returner)).toEqual(input);
  });
});
