import { IItemArray } from "../types/utils";
import { ElementStates } from "../types/element-states";

export type TListElement = IItemArray & {
  head?: boolean;
  tail?: boolean;
  isAdded?: boolean;
  isRemoved?: boolean;
  newCircle?: {
    item: string;
  } | null;
};
export class LinkedListNode<T> {
  value: T;
  next: LinkedListNode<T> | null = null;
  constructor(value: T, next?: LinkedListNode<T> | null) {
    this.value = value;
    this.next = next === undefined ? null : next;
  }
}

interface ILinkedList<T> {
  append: (element: T) => void;
  prepend: (value: T) => void;
  addByIndex: (element: T, position: number) => void;
  getNodeByIndex: (index: number) => T | null;
  deleteByIndex: (index: number) => void;
  deleteHead: () => void;
  deleteTail: () => void;
  getSize: () => number;
}

export class LinkedList<T> implements ILinkedList<T> {
  private head: LinkedListNode<T> | null;
  private length: number;
  private tail: LinkedListNode<T> | null;
  constructor(initialState?: T[]) {
    this.head = null;
    this.tail = null;
    this.length = 0;
    initialState?.forEach((el) => {
      this.addByIndex(el, 0);
    });
  }
  /* Добавляем элемент в конец*/
  append = (value: T) => {
    const node = new LinkedListNode(value);
    if (!this.head || !this.tail) {
      this.head = node;
      this.tail = node;
      this.length++;
      return this;
    }
    this.tail.next = node;
    this.tail = node;
    this.length++;
  };
  /* Добавляем элемент в начало*/
  prepend = (value: T) => {
    let node = new LinkedListNode(value);

    if (!this.head) {
      this.head = node;
    }
    node.next = this.head;
    this.head = node;
    this.length++;
  };

  addByIndex = (element: T, index: number) => {
    if (index < 0 || index > this.getSize()) {
      throw new Error("Введите действительный индекс");
    } else {
      const node = new LinkedListNode(element);

      if (index === 0) {
        node.next = this.head;
        this.head = node;
      } else {
        let curr = this.head;
        let currIndex = 0;
        let prev = this.head;

        while (currIndex < index) {
          if (curr) {
            currIndex++;
            prev = curr;
            curr = curr.next;
          }
        }

        node.next = curr;
        if (prev) {
          prev.next = node;
        }
      }

      this.length++;
    }
  };

  getNodeByIndex = (index: number) => {
    if (index < 0 || index > this.length) {
      return null;
    }
    let current = this.head;
    let currentIndex = 0;

    while (currentIndex < index && current) {
      current = current.next;
      currentIndex++;
    }
    return current ? current.value : null;
  };

  deleteByIndex = (index: number) => {
    if (index < 0 || index > this.length) {
      return null;
    }
    let current = this.head;

    if (index === 0 && current) {
      this.head = current.next;
    } else {
      let previous = null;
      let currentIndex = 0;

      while (currentIndex < index && current) {
        previous = current;
        current = current.next;
        currentIndex++;
      }

      if (previous && current) {
        previous.next = current.next;
      }
    }
    this.length--;
    return current ? current.value : null;
  };

  deleteHead = () => {
    if (!this.head) {
      return null;
    }
    let deletedHead = this.head;

    if (this.head.next) {
      this.head = deletedHead.next;
    } else {
      this.head = null;
      this.tail = null;
    }
    this.length--;
    return deletedHead ? deletedHead.value : null;
  };

  deleteTail = () => {
    if (this.length === 0) {
      return null;
    }

    let currentNode = this.head;
    let prev = null;
    let currentIndex = 0;
    while (currentIndex < this.length - 1 && currentNode) {
      prev = currentNode;
      currentNode = currentNode.next;
      currentIndex++;
    }
    if (prev && currentNode) prev.next = currentNode.next;
    this.length--;
    return currentNode ? currentNode.value : null;
  };

  toArray() {
    let curr = this.head;
    let res: T[] = [];
    while (curr) {
      res.push(curr.value);
      curr = curr.next;
    }
    return [...res].map((item) => ({
      item: item,
      state: ElementStates.Default,
    }));
  }

  getSize = () => this.length;
}

export const defaultArray = ["0", "34", "8", "1"];

export const list = new LinkedList<string>(defaultArray);
