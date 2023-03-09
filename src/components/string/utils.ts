import { ElementStates } from "../../types/element-states";
import { swap, timer } from "../../utils/utils";
import { IItemArray } from "../../types/utils";
import { DELAY_IN_MS } from "../../constants/delays";

export const reverseArray = async (
  string: Array<IItemArray>,
  setArray: Function,
  start: number = 0,
  end: number = string.length - 1
) => {
  const mid = string.length / 2;

  while (start < mid) {
    string[start].state = ElementStates.Changing;
    string[end].state = ElementStates.Changing;
    setArray([...string]);

    await timer(DELAY_IN_MS);

    string[start].state = ElementStates.Modified;
    string[end].state = ElementStates.Modified;
    swap(string, start, end);
    setArray([...string]);

    await timer(DELAY_IN_MS);

    start++;
    end--;
  }
};
