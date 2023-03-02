import { SHORT_DELAY_IN_MS } from "../constants/delays";

export const fibArr = (n: number): Array<number> => {
  let arr: number[] = [1, 1];
  for (let i = 2; i < n + 1; i++) {
    arr.push(arr[i - 2] + arr[i - 1]);
  }
  return arr;
};

export const fib = async (n: number, func: Function) => {
  for (let i = 0; i <= fibArr(n).length; i++ ) {
    await new Promise((res) => setTimeout(res, SHORT_DELAY_IN_MS));
    func(fibArr(n).slice(0, i))
  }
}