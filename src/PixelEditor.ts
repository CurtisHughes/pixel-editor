import History from './History';
import PixelCollection from './PixelCollection';
import { Pixel, ToolFactory } from './types';

export default class PixelEditor {
  private context: CanvasRenderingContext2D;

  private previousPosition: Pixel = { x: -1, y: -1 };

  private pixels: PixelCollection = new PixelCollection(this.width);

  constructor(
    private canvas: HTMLCanvasElement,
    public width: number,
    public height: number,
    public toolFactory: ToolFactory,
    public history: History = new History(),
  ) {
    this.canvas.width = this.width;
    this.canvas.height = this.height;
    this.canvas.style.width = '100%';
    this.canvas.style.imageRendering = 'pixelated';
    this.canvas.addEventListener('mouseup', this.mouseup.bind(this));
    this.canvas.addEventListener('mousedown', this.mousedown.bind(this));
    this.canvas.addEventListener('mousemove', this.mousemove.bind(this));
    this.canvas.addEventListener('touchstart', this.touchstart.bind(this));
    this.canvas.addEventListener('touchmove', this.touchmove.bind(this));
    const context = canvas.getContext('2d');
    if (!context) {
      throw new Error('Unable to get get context from canvas');
    }
    this.context = context;
  }

  private mouseup(e: MouseEvent) {
    const position = this.mousePosition(e);
    this.toolFactory.getTool().handlePointerUp(position, this);
  }

  private mousedown(e: MouseEvent) {
    const position = this.mousePosition(e);
    this.toolFactory.getTool().handlePointerDown(position, this);
    this.previousPosition = { ...position };
  }

  private mousemove(e: MouseEvent) {
    const position = this.mousePosition(e);
    if (position.x !== this.previousPosition.x || position.y !== this.previousPosition.y) {
      this.previousPosition = { ...position };
      this.toolFactory.getTool().handlePointerMove(position, this);
    }
  }

  private touchstart(e: TouchEvent) {
    const position = this.touchPosition(e);
    this.toolFactory.getTool().handlePointerDown(position, this);
    this.previousPosition = { ...position };
  }

  private touchmove(e: TouchEvent) {
    const position = this.touchPosition(e);
    if (position.x !== this.previousPosition.x || position.y !== this.previousPosition.y) {
      this.previousPosition = { ...position };
      this.toolFactory.getTool().handlePointerMove(position, this);
    }
  }

  private touchPosition(event: TouchEvent): Pixel {
    event.preventDefault();
    const [touch] = event.touches;
    const rect = this.canvas.getBoundingClientRect();
    const x = ((Math.round(touch.clientX - rect.left) * this.canvas.width) / this.canvas.clientWidth) | 0; // tslint:disable-line
    const y = ((Math.round(touch.clientY - rect.top) * this.canvas.height) / this.canvas.clientHeight) | 0; // tslint:disable-line
    const color: string | undefined = this.pixels.get(x, y);
    return { x, y, color };
  }

  private mousePosition(event: MouseEvent): Pixel {
    const x = ((event.offsetX * this.canvas.width) / this.canvas.clientWidth) | 0; // tslint:disable-line
    const y = ((event.offsetY * this.canvas.height) / this.canvas.clientHeight) | 0; // tslint:disable-line
    const color: string | undefined = this.pixels.get(x, y);
    return { x, y, color };
  }

  private fill(pixels: Pixel[]) {
    for (const { x, y, color } of pixels) {
      if (color) {
        this.context.fillStyle = color;
        this.context.fillRect(x, y, 1, 1);
      } else {
        this.context.clearRect(x, y, 1, 1);
      }
      this.pixels.set({ x, y, color });
    }
  }

  public paint(pixels: Pixel[]) {
    const prev = pixels.map(({ x, y }) => ({ x, y, color: this.pixels.get(x, y) }));
    this.fill(pixels);
    this.history.push({ next: pixels, prev });
  }

  public clear() {
    const prev: Pixel[] = [];
    for (const { x, y } of this.pixels) {
      prev.push({ x, y, color: this.pixels.get(x, y) });
      this.context.clearRect(x, y, 1, 1);
    }
    this.history.push({ next: [], prev });
    this.pixels = new PixelCollection(this.width);
  }

  public undo() {
    const pixels = this.history.prev();
    if (pixels) {
      this.fill(pixels);
    }
  }

  public redo() {
    const pixels = this.history.next();
    if (pixels) {
      this.fill(pixels);
    }
  }
}
