import { Pixel } from './types';

export default class PixelCollection {
  private pixels: { [i: number]: string | undefined } = {};

  constructor(public width: number) {}

  public set({ x, y, color }: Pixel) {
    const index = this.getIndex(x, y);
    this.pixels[index] = color;
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
