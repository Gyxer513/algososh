import { SHORT_DELAY_IN_MS } from "../constants/delays";

export const fib = async (n: number, func: Function) => {
  let arr: number[] = [1, 1];
  for (let i = 2; i < n + 1; i++) {
    arr.push(arr[i - 2] + arr[i - 1]);
  }
  await new Promise((res) => setTimeout(res, SHORT_DELAY_IN_MS));
  func(...[arr]);
};
