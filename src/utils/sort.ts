import { timer, swap } from "./utils";
import { IItemArray } from "../types/utils";
import { ElementStates } from "../types/element-states";
import { SHORT_DELAY_IN_MS } from "../constants/delays";
import { Direction } from "../types/direction";

export const getRandomArray = (
  min = 0,
  max = 100,
  minLength = 3,
  maxLength = 17
) => {
  const result = new Array(
    Math.floor(Math.random() * (maxLength - minLength + 1) + minLength)
  ).fill(0);
  return Array.from(
    new Set(result.map(() => Math.floor(Math.random() * (max - min + 1) + min)))
  );
};

export const selectSort = async (
  arr: Array<IItemArray>,
  sortType: Direction,
  func: Function
) => {
  for (let i = 0; i < arr.length; i++) {
    let index = i;
    for (let j = i + 1; j < arr.length; j++) {
      arr[i].state = ElementStates.Changing;
      arr[j].state = ElementStates.Changing;
      func([...arr]);
      await timer(SHORT_DELAY_IN_MS);
      if (sortType === Direction.Ascending) {
        if (arr[j].item < arr[index].item) {
          index = j;
          swap(arr, j, index);
          func([...arr]);
        }
      }
      if (sortType === Direction.Descending) {
        if (arr[j].item > arr[index].item) {
          index = j;
          swap(arr, j, index);
          func([...arr]);
        }
      }
      arr[j].state = ElementStates.Default;
      arr[i].state = ElementStates.Default;
      func([...arr]);
    }
    arr[index].state = ElementStates.Modified;
    swap(arr, i, index);
    func([...arr]);
  }
};

export const bubbleSort = async (
  arr: Array<IItemArray>,
  sortType: Direction,
  func: Function
) => {
  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr.length - i - 1; j++) {
      arr[j].state = ElementStates.Changing;
      arr[j + 1].state = ElementStates.Changing;
      func([...arr]);
      await timer(SHORT_DELAY_IN_MS);
      if (sortType === Direction.Ascending) {
        if (arr[j].item > arr[j + 1].item) {
          swap(arr, j, j + 1);
        }
      }
      if (sortType === Direction.Descending) {
        if (arr[j].item < arr[j + 1].item) {
          swap(arr, j, j + 1);
        }
      }
      arr[j].state = ElementStates.Default;
      arr[j + 1].state = ElementStates.Default;
      func([...arr]);
    }
    const length = arr.length;
    arr[length - i - 1].state = ElementStates.Modified;
    func([...arr]);
  }
  func([...arr]);
};
