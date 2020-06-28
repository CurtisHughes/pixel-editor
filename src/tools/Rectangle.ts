import PixelEditor from '../PixelEditor';
import { Pixel, Tool, Color, Point } from '../types';

export default class Rectangle implements Tool {
  private startPosition!: Point;

  private dragging = false;

  constructor(private color: Color) {}

  public handlePointerUp() {
    this.dragging = false;
  }

  public handlePointerDown(position: Point, editor: PixelEditor) {
    this.dragging = true;
    this.startPosition = position;
    editor.set([{ x: position.x, y: position.y, color: this.color }]);
  }

  public handlePointerMove(position: Point, editor: PixelEditor) {
    if (this.dragging) {
      const xStart = Math.min(position.x, this.startPosition.x);
      const yStart = Math.min(position.y, this.startPosition.y);
      const xEnd = Math.max(position.x, this.startPosition.x);
      const yEnd = Math.max(position.y, this.startPosition.y);
      const pixels: Pixel[] = [];

      for (let y = yStart; y <= yEnd; y += 1) {
        for (let x = xStart; x <= xEnd; x += 1) {
          if (x === xStart || x === xEnd || y === yStart || y === yEnd) {
            pixels.push({ x, y, color: this.color });
          }
        }
      }

      editor.undo();
      editor.set(pixels);
    }
  }
}
