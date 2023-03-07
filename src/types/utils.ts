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
  head?: boolean;
  tail?: boolean;
}

export enum Location {
  Top = "Top",
  Bottom = "Bottom",
  None = "None"
}

export interface IListElement {
  item: string;
  state: ElementStates;
  head?: boolean;
}
