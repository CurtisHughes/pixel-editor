import { Tool, Color, Point } from '../types';
import PixelEditor from '../PixelEditor';
import { getLineWithColor } from '../utils';

export default class Pencil implements Tool {
  private dragging = false;

  private prevPosition!: Point;

  constructor(private color?: Color) {}

  public handlePointerUp() {
    this.dragging = false;
  }

  public handlePointerDown(position: Point, editor: PixelEditor) {
    this.dragging = true;
    this.prevPosition = position;
    editor.set([{ x: position.x, y: position.y, color: this.color }]);
  }

  public handlePointerMove(position: Point, editor: PixelEditor) {
    if (this.dragging) {
      const line = getLineWithColor(this.prevPosition.x, this.prevPosition.y, position.x, position.y, this.color);
      this.prevPosition = position;
      editor.set(line);
      editor.history.squash();
    }
  }
}
