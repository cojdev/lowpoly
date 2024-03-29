import { HSLColour } from '../utils/types';

/**
 * Convert hsl to rgb
 * @param hue hue (hsl if array)
 * @param sat saturation
 * @param lum luminosity
 * @returns {array}
 */
export const hslToRgb = (
  hue: HSLColour | number,
  sat?: number,
  lum?: number
): number[] => {
  let h: number;
  let s: number;
  let l: number;

  if (Array.isArray(hue)) {
    [h, s, l] = hue;
  } else {
    h = hue;
    s = sat;
    l = lum;
  }

  h /= 360;
  s /= 100;
  l /= 100;

  let rgb = [];
  let c = 0;
  let x = 0;
  let m = 0;

  c = (1 - Math.abs(2 * l - 1)) * s;

  const h1 = h * 6;

  x = c * (1 - Math.abs((h1 % 2) - 1));

  if (h1 >= 0 && h1 <= 1) {
    rgb = [c, x, 0];
  } else if (h1 >= 1 && h1 <= 2) {
    rgb = [x, c, 0];
  } else if (h1 >= 2 && h1 <= 3) {
    rgb = [0, c, x];
  } else if (h1 >= 3 && h1 <= 4) {
    rgb = [0, x, c];
  } else if (h1 >= 4 && h1 <= 5) {
    rgb = [x, 0, c];
  } else if (h1 >= 5 && h1 <= 6) {
    rgb = [c, 0, x];
  } else {
    rgb = [0, 0, 0];
  }

  m = l - c / 2;

  rgb = rgb.map((item) => Math.floor((item + m) * 255));

  // console.log(rgb);
  return rgb;
};

/**
 * Convert rgb to hexadecimal
 */
export const rgbToHex = (
  red: number | number[],
  green: number,
  blue: number
) => {
  let r;
  let g;
  let b;

  if (Array.isArray(red)) {
    [r, g, b] = red;
  } else {
    r = red;
    g = green;
    b = blue;
  }

  const toHex = (x: number) => {
    const hex = x.toString(16);
    return hex.length === 1 ? `0${hex}` : hex;
  };

  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
};

/**
 * Convert hexadecimal colour to RGB
 * @param {string} hex 3 or 6 digit hexadecimal colour value
 * @returns {array}
 */
export const hexToRgb = (hex: string): number[] => {
  const formattedHex = hex.replace('#', '');

  switch (formattedHex.length) {
    case 3: {
      const ret = formattedHex
        .split('')
        .map((item: any) => parseInt(item + item, 16));
      return ret;
    }

    case 6: {
      const ret = formattedHex
        .match(/.{2}/g)
        .map((item: string) => parseInt(item, 16));
      return ret;
    }

    default:
      return [0, 0, 0];
  }
};

/**
 * Convert hexadecimal string to hue, saturation and luminosity
 * @param hex hexadecimal colour string; hash optional
 */
export const hexToHsl = (hex: string) => {
  const formattedHex = hex.replace('#', '');

  let rgb: number[];

  switch (formattedHex.length) {
    case 3:
      rgb = formattedHex
        .split('')
        .map((item: any) => parseInt(item + item, 16));
      break;
    case 6:
      rgb = formattedHex
        .match(/.{2}/g)
        .map((item: string) => parseInt(item, 16));
      break;
    default:
      return [];
  }
  const r = rgb[0] / 255;
  const g = rgb[1] / 255;
  const b = rgb[2] / 255;
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);

  let h;
  let s;
  let l = (max + min) / 2;

  if (max === min) {
    h = 0;
    s = 0;
  } else {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0);
        break;
      case g:
        h = (b - r) / d + 2;
        break;
      case b:
        h = (r - g) / d + 4;
        break;
      default:
        return [];
    }
    h /= 6;
  }

  h = Math.floor(h * 360);
  s = Math.floor(s * 100);
  l = Math.floor(l * 100);

  return [h, s, l];
};

/**
 * Convert hue, saturation and luminosity to hexadecimal
 * @param {number | array} hue hue (hsl if array)
 * @param {number} sat saturation
 * @param {number} lum luminosity
 * @returns {string}
 */
export const hslToHex = (
  hue: [number, number, number] | number,
  sat?: number,
  lum?: number
): string => {
  let h: number;
  let s: number;
  let l: number;

  if (Array.isArray(hue)) {
    [h, s, l] = hue;
  } else {
    h = hue;
    s = sat;
    l = lum;
  }

  const [r, g, b] = hslToRgb(h, s, l);

  return rgbToHex(r, g, b);
};

export const hslToCss = (h: number, s: number, l: number) =>
  `hsl(${h},${s}%,${l}%)`;

/**
 * Generate a random colour
 * @param {boolean} bright generate a bright saturated colour
 * @returns {string}
 */
export const getRandomHex = (bright: boolean = false): string => {
  if (bright) {
    return hslToHex(Math.floor(Math.random() * 360), 85, 53);
  }
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
};
