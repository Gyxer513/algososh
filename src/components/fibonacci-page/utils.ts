import { SHORT_DELAY_IN_MS } from "../../constants/delays";
import { timer } from "../../utils/utils";

export const getFibonacciNumbers = (n: number): Array<number> => {
  let arr: number[] = [1, 1];
  for (let i = 2; i < n + 1; i++) {
    arr.push(arr[i - 2] + arr[i - 1]);
  }
  return arr;
};

export const fib = async (n: number, func: Function) => {
  for (let i = 0; i <= getFibonacciNumbers(n).length; i++ ) {
    await timer(SHORT_DELAY_IN_MS);
    func(getFibonacciNumbers(n).slice(0, i))
  }
}