import { Pixel, Color } from './types';

export default class PixelCollection {
  private pixels: { [i: number]: Color | undefined } = {};

  constructor(public width: number) {}

  public set({ x, y, color }: Pixel) {
    const index = this.getIndex(x, y);
    if (color) {
      this.pixels[index] = color;
    } else {
      delete this.pixels[index];
    }
  }

  public get(x: number, y: number) {
    const index = this.getIndex(x, y);
    return this.pixels[index];
  }

  private getIndex(x: number, y: number) {
    return x + y * this.width;
  }

  private getPixel(index: number) {
    const x = index % this.width;
    const y = Math.floor(index / this.width);
    return { x, y, color: this.pixels[index] };
  }

  *[Symbol.iterator]() {
    const keys = Object.keys(this.pixels);

    for (const index of keys) {
      yield this.getPixel(Number(index));
    }
  }
}
