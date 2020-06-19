import { Delta, Pixel } from './types';

export default class History {
  constructor(private maxLength: number = 99, private undoStack: Delta[] = [], private redoStack: Delta[] = []) {}

  public push(delta: Delta) {
    this.undoStack = [...this.undoStack.splice(-this.maxLength), delta];
    this.redoStack = [];
  }

  public prev(): Pixel[] | undefined {
    const delta = this.undoStack.pop();
    if (!delta) {
      return undefined;
    }
    const { next: prev, prev: next } = delta;
    this.redoStack.push({ next, prev });
    return next;
  }

  public next(): Pixel[] | undefined {
    const delta = this.redoStack.pop();
    if (!delta) {
      return undefined;
    }
    const { next: prev, prev: next } = delta;
    this.undoStack = [...this.undoStack.splice(-this.maxLength), { next, prev }];
    return next;
  }

  public squash() {
    this.undoStack = [
      ...this.undoStack.slice(0, -2),
      this.undoStack.slice(-2).reduce(
        (acc, delta): Delta => ({
          prev: [...delta.prev, ...acc.prev],
          next: [...delta.next, ...acc.next],
        }),
        { prev: [], next: [] },
      ),
    ];
  }
}
