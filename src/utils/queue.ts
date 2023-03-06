import { ElementStates } from "../types/element-states";
interface IQueue<T> {
  enqueue: (item: T) => void;
  dequeue: () => void;
  clear: () => void;
  getTail: () => number;
  getHead: () => number;
  isFull: () => boolean;
  peak: () => T | null;
}

class Queue<T> implements IQueue<T> {
  private container: (T | null)[] = [];
  private head = 0;
  private tail = 0;
  private readonly size: number = 0;
  private length: number = 0;

  constructor(size: number) {
    this.size = size;
    this.container = Array(size).fill(null);
  }

  peak = (): T | null => {
    if (this.isEmpty()) {
      throw new Error("Очередь пуста");
    }
    return this.container[this.head % this.size] || null;
  };

  enqueue = (item: T) => {
    if (this.length >= this.size) {
      throw new Error("Достигнута максимальная длинна");
    }
    if (!this.isEmpty()) {
      this.tail++;
    }
    this.container[this.tail] = item;
    this.length++;
  };

  dequeue = () => {
    if (this.isEmpty()) {
      throw new Error("Очередь пуста");
    }
    this.container[this.head] = null;
    this.length--;

    if (this.head !== this.size - 1) {
      if (this.head !== this.tail) {
        this.head++;
      }
    }
  };

  getTail = () => {
    return this.tail;
  };

  getHead = () => {
    return this.head;
  };

  isEmpty = () => this.length === 0;

  isFull = () => this.tail >= this.size - 1;

  clear = () => {
    this.head = 0;
    this.tail = 0;
    this.container = Array(this.size).fill(null);
    this.length = 0;
  };
}

export const queue = new Queue<string>(7);
export const defaultArray = Array.from({ length: 7 }, () => ({
  item: "",
  state: ElementStates.Default,
  head: false,
  tail: false,
}));
