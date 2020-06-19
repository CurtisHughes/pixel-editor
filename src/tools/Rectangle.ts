import PixelEditor from '../PixelEditor';
import { Pixel, Tool } from '../types';

export default class Rectangle implements Tool {
  private startPosition: Pixel = { x: -1, y: -1 };

  private dragging = false;

  constructor(private color: string) {}

  public handlePointerUp() {
    this.dragging = false;
    this.startPosition = { x: -1, y: -1 };
  }

  public handlePointerDown({ x, y }: Pixel, editor: PixelEditor) {
    this.dragging = true;
    this.startPosition = { x, y };
    editor.paint([{ x, y, color: this.color }]);
  }

  public handlePointerMove(pixel: Pixel, editor: PixelEditor) {
    if (this.dragging) {
      const xStart = Math.min(pixel.x, this.startPosition.x);
      const yStart = Math.min(pixel.y, this.startPosition.y);
      const xEnd = Math.max(pixel.x, this.startPosition.x);
      const yEnd = Math.max(pixel.y, this.startPosition.y);
      const nextPoints: Pixel[] = [];

      for (let y = yStart; y <= yEnd; y += 1) {
        for (let x = xStart; x <= xEnd; x += 1) {
          if (x === xStart || x === xEnd || y === yStart || y === yEnd) {
            nextPoints.push({ x, y, color: this.color });
          }
        }
      }

      editor.undo();
      editor.paint(nextPoints);
    }
  }
}
