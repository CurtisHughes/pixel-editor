import PixelEditor from './PixelEditor';

export type Color = string;

export type Point = {
  x: number;
  y: number;
};

export type Pixel = Point & {
  color?: Color;
};

export type Delta = {
  prev: Pixel[];
  next: Pixel[];
};

export interface Tool {
  handlePointerDown: (position: Point, editor: PixelEditor) => void;
  handlePointerMove: (position: Point, editor: PixelEditor) => void;
  handlePointerUp: (position: Point, editor: PixelEditor) => void;
}
