import { getLine } from "./getLine";
import { Color } from "../types";

export const getLineWithColor = (x0: number, y0: number, x1: number, y1: number, color?: Color) =>
  getLine(x0, y0, x1, y1, (x: number, y: number) => ({ x, y, color }));
