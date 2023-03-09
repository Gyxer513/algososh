import { IItemArray, ISortArray } from "../types/utils";

export const timer = (mlsec: number) =>
  new Promise((res) => setTimeout(res, mlsec));

export const swap = (
  arr: Array<IItemArray | ISortArray>,
  firstIndex: number,
  secondIndex: number
): void => {
  const temp = arr[firstIndex];
  arr[firstIndex] = arr[secondIndex];
  arr[secondIndex] = temp;
};

