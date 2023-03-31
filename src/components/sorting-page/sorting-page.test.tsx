import "@testing-library/jest-dom/extend-expect";
import { Direction } from "../../types/direction";
import { returner } from "../../utils/utils";
import { bubbleSort, selectSort } from "./utils";
import {
  array,
  sortArrayToMax,
  sortArrayToMin,
  arrayWithOneElement,
  emptyArray,
} from "../../constants/test-constants";

describe("sorting algoritm tests", () => {
  /* Массив с одним элементом */

  it("should correct with one element array", async () => {
    expect(
      await bubbleSort(arrayWithOneElement, Direction.Ascending, returner)
    ).toEqual(arrayWithOneElement);
  });
  it("should correct with one element array", async () => {
    expect(
      await bubbleSort(arrayWithOneElement, Direction.Descending, returner)
    ).toEqual(arrayWithOneElement);
  });
  it("should correct with one element array", async () => {
    expect(
      await selectSort(arrayWithOneElement, Direction.Ascending, returner)
    ).toEqual(arrayWithOneElement);
  });
  it("should correct with one element array", async () => {
    expect(
      await selectSort(arrayWithOneElement, Direction.Descending, returner)
    ).toEqual(arrayWithOneElement);
  });

  /* Пустой массив */

  it("should correct with even value", async () => {
    expect(await selectSort(emptyArray, Direction.Ascending, returner)).toEqual(
      emptyArray
    );
  });
  it("should correct with even value", async () => {
    expect(
      await selectSort(emptyArray, Direction.Descending, returner)
    ).toEqual(emptyArray);
  });
  it("should correct with even value", async () => {
    expect(await bubbleSort(emptyArray, Direction.Ascending, returner)).toEqual(
      emptyArray
    );
  });
  it("should correct with even value", async () => {
    expect(
      await bubbleSort(emptyArray, Direction.Descending, returner)
    ).toEqual(emptyArray);
  });

  /* Массив */

  it("should correct with even value", async () => {
    expect(await bubbleSort(array, Direction.Ascending, returner)).toEqual(
      sortArrayToMax
    );
  });
  it("should correct with even value", async () => {
    expect(await bubbleSort(array, Direction.Descending, returner)).toEqual(
      sortArrayToMin
    );
  });
  it("should correct with even value", async () => {
    expect(await selectSort(array, Direction.Ascending, returner)).toEqual(
      sortArrayToMax
    );
  });
  it("should correct with even value", async () => {
    expect(await selectSort(array, Direction.Descending, returner)).toEqual(
      sortArrayToMin
    );
  });
});
