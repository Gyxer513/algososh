import { ElementStates } from "../types/element-states";
import { swap } from "./utils";
import { IItemArray } from "../types/utils";

export const reverseArray = async (
    string: Array<IItemArray>,
    stringArray: Function,
    start: number = 0,
    end: number = string.length - 1
  ) => {
    const mid = string.length / 2;
  
    while (start < mid) {
      string[start].state = ElementStates.Changing;
      string[end].state = ElementStates.Changing;
      stringArray([...string]);
  
      await new Promise((res) => setTimeout(res, 2000));
  
      string[start].state = ElementStates.Modified;
      string[end].state = ElementStates.Modified;
      swap(string, start, end);
      stringArray([...string]);
  
      await new Promise((res) => setTimeout(res, 2000));
  
      start++;
      end--;
    }
  };
