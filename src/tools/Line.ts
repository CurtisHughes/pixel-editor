import { Pixel, Tool } from '../types';
import PixelEditor from '../PixelEditor';
import { getLine } from '../utils';

export default class Line implements Tool {
  private startPosition: Pixel = { x: -1, y: -1 };

  private dragging = false;

  constructor(private color?: string) {}

  public handlePointerUp() {
    this.dragging = false;
  }

  public handlePointerDown({ x, y }: Pixel, editor: PixelEditor) {
    this.dragging = true;
    this.startPosition = { x, y };
    editor.set([{ x, y, color: this.color }]);
  }

  public handlePointerMove({ x, y }: Pixel, editor: PixelEditor) {
    if (this.dragging) {
      const line = getLine(this.startPosition.x, this.startPosition.y, x, y, this.color);
      editor.undo();
      editor.set(line);
    }
  }
}
