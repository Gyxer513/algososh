import "@testing-library/jest-dom/extend-expect";
import { reverseArray } from "./utils";
import { returner } from "../../utils/utils";
import { ElementStates } from "../../types/element-states";
import {
  array,
  reverseEvenArray,
  notEvenArray,
  reverseNotEvenArray,
  arrayWithEmptyString,
  arrayWithOneElement,
} from "../../constants/test-constants";

describe("string algoritms tests", () => {
  /* С четным значением */
  it("should correct with even value", async () => {
    expect(await reverseArray(array, returner)).toEqual(reverseEvenArray);
  });
  /*  С нечетным значением */
  it("should correct with not even value", async () => {
    expect(await reverseArray(notEvenArray, returner)).toEqual(
      reverseNotEvenArray
    );
  });
  /* С одним значением */
  it("should correct with one value", async () => {
    expect(await reverseArray(arrayWithOneElement, returner)).toEqual(
      arrayWithOneElement
    );
  });
  /* Пустой массив */
  it("should correct with one value", async () => {
    expect(await reverseArray(arrayWithEmptyString, returner)).toEqual(
      arrayWithEmptyString
    );
  });
});
