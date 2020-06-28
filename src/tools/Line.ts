import { Tool, Color, Point } from '../types';
import PixelEditor from '../PixelEditor';
import { getLineWithColor } from '../utils';

export default class Line implements Tool {
  private startPosition: Point = { x: -1, y: -1 };

  private dragging = false;

  constructor(private color?: Color) {}

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
      const line = getLineWithColor(this.startPosition.x, this.startPosition.y, position.x, position.y, this.color);
      editor.undo();
      editor.set(line);
    }
  }
}
