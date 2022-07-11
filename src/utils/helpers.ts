import Vector from '../lib/Vector';
import Vertex from '../lib/Vertex';

/**
 * generate a unique ID of specified length
 * @param {number} length length of id
 */
export const uid = (length: number = 6): string => {
  const charCodes = [];
  let string = '';

  for (let i = 0; i < 10; i++) {
    charCodes.push(48 + i);
    charCodes.push(97 + i);
  }
  for (let i = 0; i < 16; i++) {
    charCodes.push(107 + i);
  }

  for (let i = 0; i < length; i++) {
    const charIndex = Math.floor(Math.random() * charCodes.length);
    string += String.fromCharCode(charCodes[charIndex]);
  }

  return string;
};

/**
 * create a copy of a primitive
 * @param {object|array} obj
 */
export const clone = (obj: {} | any[]) => {
  if (typeof obj === 'object') {
    return { ...obj };
  }
  if (Array.isArray(obj)) {
    return obj.slice();
  }
  return obj;
};

/**
 * By Ken Fyrstenberg Nilsen
 *
 * drawImageProp(context, image [, x, y, width, height [,offsetX, offsetY]])
 *
 * If image and context are only arguments rectangle will equal canvas
 */
export function drawImageProp(
  ctx: CanvasRenderingContext2D,
  img: HTMLImageElement,
  xpos?: number,
  ypos?: number,
  width?: undefined,
  height?: undefined,
  offX = 0.5,
  offY = 0.5
) {
  const x = xpos || 0;
  const y = ypos || 0;
  const w = width || ctx.canvas.width;
  const h = height || ctx.canvas.height;
  let offsetX = offX || 0;
  let offsetY = offY || 0;

  // keep bounds [0.0, 1.0]
  if (offsetX < 0) offsetX = 0;
  if (offsetY < 0) offsetY = 0;
  if (offsetX > 1) offsetX = 1;
  if (offsetY > 1) offsetY = 1;

  const iw = img.width;
  const ih = img.height;
  const r = Math.min(w / iw, h / ih);

  let nw = iw * r;
  // new prop. width

  let nh = ih * r;
  // new prop. height

  let cx: number;
  let cy: number;
  let cw: number;
  let ch: number;
  let ar = 1;

  // decide which gap to fill
  if (nw < w) ar = w / nw;
  if (Math.abs(ar - 1) < 1e-14 && nh < h) ar = h / nh; // updated
  nw *= ar;
  nh *= ar;

  // calc source rectangle
  cw = iw / (nw / w);
  ch = ih / (nh / h);

  cx = (iw - cw) * offsetX;
  cy = (ih - ch) * offsetY;

  // make sure source rectangle is valid
  if (cx < 0) cx = 0;
  if (cy < 0) cy = 0;
  if (cw > iw) cw = iw;
  if (ch > ih) ch = ih;

  // fill image in dest. rectangle
  ctx.drawImage(img, cx, cy, cw, ch, x, y, w, h);
}

/**
 * Capitalises the first letter of a string
 * @param string
 * @returns
 */
export const capitalise = (string: string) =>
  string.charAt(0).toUpperCase() + string.slice(1);

export const normalise = (val: number, max: number, min = 0) =>
  (val - min) / (max - min);

export const vectorFromVertices = (vertices: [Vertex, Vertex]): Vector =>
  new Vector([
    vertices[1].x - vertices[0].x,
    vertices[1].y - vertices[0].y,
    vertices[1].z - vertices[0].z,
  ]);

export const wait = async (duration: number) =>
  new Promise<void>((resolve) => {
    window.setTimeout(() => {
      resolve();
    }, duration);
  });
