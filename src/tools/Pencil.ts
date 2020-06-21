import { Pixel, Tool } from '../types';
import PixelEditor from '../PixelEditor';
import { getLine } from '../utils';

export default class Pencil implements Tool {
  private dragging = false;

  private prevPoint!: Pixel;

  constructor(private color?: string) {}

  public handlePointerUp() {
    this.dragging = false;
  }

  public handlePointerDown({ x, y }: Pixel, editor: PixelEditor) {
    this.dragging = true;
    this.prevPoint = { x, y };
    editor.set([{ x, y, color: this.color }]);
  }

  public handlePointerMove({ x, y }: Pixel, editor: PixelEditor) {
    if (this.dragging) {
      const line = getLine(this.prevPoint.x, this.prevPoint.y, x, y, this.color);
      editor.set(line);
      editor.history.squash();
      this.prevPoint = { x, y };
    }
  }
}
