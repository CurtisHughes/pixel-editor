import History from './History';
import PixelCollection from './PixelCollection';
import { Pixel, Tool } from './types';

export default class PixelEditor {
  private _context: CanvasRenderingContext2D;

  private _previousPosition: Pixel = { x: -1, y: -1 };

  private _pixels: PixelCollection = new PixelCollection(this.width);

  constructor(
    private _canvas: HTMLCanvasElement,
    public readonly width: number,
    public readonly height: number,
    public tool: Tool,
    public history: History = new History(),
  ) {
    this._canvas.width = this.width;
    this._canvas.height = this.height;
    this._canvas.style.width = '100%';
    this._canvas.style.imageRendering = 'pixelated';
    this._canvas.addEventListener('mouseup', this.mouseup.bind(this));
    this._canvas.addEventListener('mousedown', this.mousedown.bind(this));
    this._canvas.addEventListener('mousemove', this.mousemove.bind(this));
    this._canvas.addEventListener('touchstart', this.touchstart.bind(this));
    this._canvas.addEventListener('touchmove', this.touchmove.bind(this));
    const context = this._canvas.getContext('2d');
    if (!context) {
      throw new Error('Unable to get get context from canvas');
    }
    this._context = context;
  }

  private mouseup(e: MouseEvent) {
    const position = this.mousePosition(e);
    this.tool.handlePointerUp(position, this);
  }

  private mousedown(e: MouseEvent) {
    const position = this.mousePosition(e);
    this.tool.handlePointerDown(position, this);
    this._previousPosition = { ...position };
  }

  private mousemove(e: MouseEvent) {
    const position = this.mousePosition(e);
    if (position.x !== this._previousPosition.x || position.y !== this._previousPosition.y) {
      this._previousPosition = { ...position };
      this.tool.handlePointerMove(position, this);
    }
  }

  private touchstart(e: TouchEvent) {
    const position = this.touchPosition(e);
    this.tool.handlePointerDown(position, this);
    this._previousPosition = { ...position };
  }

  private touchmove(e: TouchEvent) {
    const position = this.touchPosition(e);
    if (position.x !== this._previousPosition.x || position.y !== this._previousPosition.y) {
      this._previousPosition = { ...position };
      this.tool.handlePointerMove(position, this);
    }
  }

  private touchPosition(event: TouchEvent): Pixel {
    event.preventDefault();
    const [touch] = event.touches;
    const rect = this._canvas.getBoundingClientRect();
    const x = ((Math.round(touch.clientX - rect.left) * this._canvas.width) / this._canvas.clientWidth) | 0; // tslint:disable-line
    const y = ((Math.round(touch.clientY - rect.top) * this._canvas.height) / this._canvas.clientHeight) | 0; // tslint:disable-line
    const color: string | undefined = this._pixels.get(x, y);
    return { x, y, color };
  }

  private mousePosition(event: MouseEvent): Pixel {
    const x = ((event.offsetX * this._canvas.width) / this._canvas.clientWidth) | 0; // tslint:disable-line
    const y = ((event.offsetY * this._canvas.height) / this._canvas.clientHeight) | 0; // tslint:disable-line
    const color: string | undefined = this._pixels.get(x, y);
    return { x, y, color };
  }

  private fill(pixels: Pixel[]) {
    for (const { x, y, color } of pixels) {
      if (color) {
        this._context.fillStyle = color;
        this._context.fillRect(x, y, 1, 1);
      } else {
        this._context.clearRect(x, y, 1, 1);
      }
      this._pixels.set({ x, y, color });
    }
  }

  public get pixels(): Pixel[] {
    const pixels: Pixel[] = [];
    for (const { x, y } of this._pixels) {
      pixels.push({ x, y, color: this._pixels.get(x, y) });
    }
    return pixels;
  }

  public paint(pixels: Pixel[]) {
    const prev = pixels.map(({ x, y }) => ({ x, y, color: this._pixels.get(x, y) }));
    this.fill(pixels);
    this.history.push({ next: pixels, prev });
  }

  public clear() {
    const prev: Pixel[] = [];
    for (const { x, y } of this._pixels) {
      prev.push({ x, y, color: this._pixels.get(x, y) });
      this._context.clearRect(x, y, 1, 1);
    }
    this.history.push({ next: [], prev });
    this._pixels = new PixelCollection(this.width);
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
