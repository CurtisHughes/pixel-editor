import { Delta, Pixel, Tool } from '../types';
import PixelEditor from '../PixelEditor';
import { lineAlgorithm } from '../utils';

export default class Pencil implements Tool {
  private dragging = false;

  private prevPoint!: Pixel;

  constructor(private color?: string) {}

  public handlePointerDown({ x, y }: Pixel, editor: PixelEditor) {
    this.dragging = true;
    this.prevPoint = { x, y };
    editor.paint([{ x, y, color: this.color }]);
  }

  public handlePointerMove({ x, y }: Pixel, editor: PixelEditor) {
    if (this.dragging) {
      const line = lineAlgorithm(this.prevPoint.x, this.prevPoint.y, x, y, this.color);
      editor.paint(line);
      editor.history.squash();
      this.prevPoint = { x, y };
    }
  }

  public handlePointerUp(): Delta | undefined {
    this.dragging = false;
    return undefined;
  }
}
