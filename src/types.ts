import PixelEditor from './PixelEditor';

export type Pixel = {
  x: number;
  y: number;
  color?: string;
};

export type Delta = {
  prev: Pixel[];
  next: Pixel[];
};

export interface Tool {
  handlePointerDown: (pos: Pixel, editor: PixelEditor) => void;
  handlePointerMove: (pos: Pixel, editor: PixelEditor) => void;
  handlePointerUp: (pos: Pixel, editor: PixelEditor) => void;
}
