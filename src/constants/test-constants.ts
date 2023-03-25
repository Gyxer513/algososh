import { ElementStates } from "../types/element-states";

export const URL_FOR_TESTS = "http://localhost:3000";

export const array = [
  { item: "1", state: ElementStates.Modified },
  { item: "0", state: ElementStates.Modified },
  { item: "2", state: ElementStates.Modified },
  { item: "3", state: ElementStates.Modified },
];

export const reverseEvenArray = [
  { item: "3", state: ElementStates.Modified },
  { item: "2", state: ElementStates.Modified },
  { item: "0", state: ElementStates.Modified },
  { item: "1", state: ElementStates.Modified },
];

export const notEvenArray = [
  { item: "1", state: ElementStates.Modified },
  { item: "0", state: ElementStates.Modified },
  { item: "2", state: ElementStates.Modified },
];

export const reverseNotEvenArray = [
  { item: "2", state: ElementStates.Modified },
  { item: "0", state: ElementStates.Modified },
  { item: "1", state: ElementStates.Modified },
];

export const arrayWithOneElement = [
  { item: "1", state: ElementStates.Modified },
];

export const arrayWithEmptyString = [
  { item: "", state: ElementStates.Modified },
];

export const sortArrayToMin = [
  { item: "3", state: ElementStates.Modified },
  { item: "2", state: ElementStates.Modified },
  { item: "1", state: ElementStates.Modified },
  { item: "0", state: ElementStates.Modified },
];

export const sortArrayToMax = [
  { item: "0", state: ElementStates.Modified },
  { item: "1", state: ElementStates.Modified },
  { item: "2", state: ElementStates.Modified },
  { item: "3", state: ElementStates.Modified },
];

export const emptyArray = [];

export const colors = {
  default: "4px solid rgb(0, 50, 255)",
  changing: "4px solid rgb(210, 82, 225)",
  modified: "4px solid rgb(127, 224, 81)",
};
