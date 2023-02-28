import { IItemArray } from "../types/utils";

export const swap = (
  arr: Array<IItemArray>,
  firstIndex: number,
  secondIndex: number
): void => {
  const temp = arr[firstIndex];
  arr[firstIndex] = arr[secondIndex];
  arr[secondIndex] = temp;
};
