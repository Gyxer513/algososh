import { ElementStates } from "./element-states";

export interface IItemArray {
  item: string | number;
  state: ElementStates;
}

export interface ISortArray {
  state: number;
  color: ElementStates;
}


export enum SortMethod {
  Select = "Select",
  Bubble = "Bubble",
}

export interface IStackElement {
  item: string;
  state: ElementStates;
}

export interface IQueueElement {
  item: string;
  state: ElementStates;
}