import { IItemArray } from "../types/utils";

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
  insertAt: (element: T, position: number) => void;
  getNodeByIndex: (index: number) => T | null;
  deleteByIndex: (index: number) => void;
  deleteHead: () => void;
  deleteTail: () => void;
  getSize: () => number;
}
export class LinkedList<T> implements ILinkedList<T> {
  private head: LinkedListNode<T> | null;
  private size: number;
  private tail: LinkedListNode<T> | null;
  constructor(initialState?: T[]) {
    this.head = null;
    this.tail = null;
    this.size = 0;
    initialState?.forEach((el) => {
      this.insertAt(el, 0);
    });
  }

  append = (element: T) => {
    const node = new LinkedListNode(element);

    if (!this.head || !this.tail) {
      this.head = node;
      this.tail = node;
      this.size++;

      return this;
    }
    this.tail.next = node;
    this.tail = node;
    this.size++;
  };

  prepend = (value: T) => {
    let node = new LinkedListNode(value);

    if (!this.head) {
      this.head = node;
    }
    node.next = this.head;
    this.head = node;
    this.size++;
  };

  insertAt = (element: T, index: number) => {
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

      this.size++;
    }
  };

  getNodeByIndex = (index: number) => {
    if (index < 0 || index > this.size) {
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
    if (index < 0 || index > this.size) {
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
    this.size--;
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
    this.size--;
    return deletedHead ? deletedHead.value : null;
  };

  deleteTail = () => {
    if (this.size === 0) {
      return null;
    }

    let currentNode = this.head;
    let prev = null;
    let currentIndex = 0;
    while (currentIndex < this.size - 1 && currentNode) {
      prev = currentNode;
      currentNode = currentNode.next;
      currentIndex++;
    }
    if (prev && currentNode) prev.next = currentNode.next;
    this.size--;
    return currentNode ? currentNode.value : null;
  };

  getSize = () => this.size;
}
