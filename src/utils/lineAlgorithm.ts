/* 
  https://en.wikipedia.org/wiki/Bresenham%27s_line_algorithm
  https://github.com/madbence/node-bresenham/blob/master/index.js
*/
import { Pixel } from '../types';

export const lineAlgorithm = (x0: number, y0: number, x1: number, y1: number, color: string) => {
  const arr: Pixel[] = [];
  const fn = (x: number, y: number) => arr.push({ x, y, color });
  const dx = x1 - x0;
  const dy = y1 - y0;
  const adx = Math.abs(dx);
  const ady = Math.abs(dy);
  let eps = 0;
  const sx = dx > 0 ? 1 : -1;
  const sy = dy > 0 ? 1 : -1;
  if (adx > ady) {
    for (let x = x0, y = y0; sx < 0 ? x >= x1 : x <= x1; x += sx) {
      fn(x, y);
      eps += ady;
      /* tslint:disable-next-line */
      if (eps << 1 >= adx) {
        y += sy;
        eps -= adx;
      }
    }
  } else {
    for (let x = x0, y = y0; sy < 0 ? y >= y1 : y <= y1; y += sy) {
      fn(x, y);
      eps += adx;
      /* tslint:disable-next-line */
      if (eps << 1 >= ady) {
        x += sx;
        eps -= ady;
      }
    }
  }
  return arr;
};
