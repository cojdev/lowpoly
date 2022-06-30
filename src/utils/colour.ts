/**
 * Convert hsl to rgb
 * @param {number | array} h hue (hsl if array)
 * @param {number} s saturation
 * @param {number} l luminosity
 * @returns {array}
 */
export const hslToRgb = (hue, sat = null, lum = null) => {
  let h = hue;
  let s = sat;
  let l = lum;

  if (Array.isArray(hue)) [h, s, l] = hue;

  let rgb = [];
  let c = 0;
  let x = 0;
  let m = 0;

  c = (1 - Math.abs(2 * l - 1)) * s;

  const h1 = h / 60;

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
 * @param {array<number>|number} r red, green and blue array or red component
 * @param {number} g green component
 * @param {number} b blue component
 * @returns {string}
 */
// export const rgbToHex = (r, g, b) => {
//   if (Array.isArray(r)) {
//     g = r[1];
//     b = r[2];
//     r = r[0];
//   }

//   let ret = '#';
//   const components = rgb.map((item) => {
//     let ret = item.toString(16);
//     if (ret.length === 1) {
//       ret = `0${ret}`;
//     }
//     return ret;
//   });
//   ret += components.join('');
//   return ret;
// };

/**
 * Generate a random colour
 * @param {boolean} bright generate a bright saturated colour
 * @returns {string}
 */
export const getRandomHex = (bright = false) => {
  if (bright) {
    return hslToHex(Math.floor(Math.random() * 360), 85, 53);
  }
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
};

/**
 * Convert hexadecimal colour to RGB
 * @param {string} hex 3 or 6 digit hexadecimal colour value
 * @returns {array}
 */
export function hexToRgb(hex) {
  hex = hex.replace('#', '');

  switch (hex.length) {
    case 3: {
      const ret = hex.split('').map((item) => parseInt(item + item, 16));
      return ret;
    }

    case 6: {
      const ret = hex.match(/.{2}/g).map((item) => parseInt(item, 16));
      return ret;
    }

    default:
      return [0, 0, 0];
  }
}

/**
 * Convert hexadecimal string to hue, saturation and luminosity
 * @param {string} hex hexadecimal colour string; hash optional
 */
export function hexToHsl(hex) {
  hex = hex.replace('#', '');

  let rgb;

  switch (hex.length) {
    case 3:
      rgb = hex.split('').map((item) => parseInt(item + item, 16));
      break;
    case 6:
      rgb = hex.match(/.{2}/g).map((item) => parseInt(item, 16));
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
}

/**
 * Convert hue, saturation and luminosity to hexadecimal
 * @param {number | array} h hue (hsl if array)
 * @param {number} s saturation
 * @param {number} l luminosity
 * @returns {string}
 */
export function hslToHex(h, s, l) {
  if (Array.isArray(h)) {
    s = h[1];
    l = h[2];
    h = h[0];
  }

  h /= 360;
  s /= 100;
  l /= 100;

  let r;
  let g;
  let b;

  if (s === 0) {
    r = g = b = l; // achromatic
  } else {
    const hue2rgb = (p, q, t) => {
      if (t < 0) t += 1;
      if (t > 1) t -= 1;
      if (t < 1 / 6) return p + (q - p) * 6 * t;
      if (t < 1 / 2) return q;
      if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
      return p;
    };
    const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    const p = 2 * l - q;
    r = hue2rgb(p, q, h + 1 / 3);
    g = hue2rgb(p, q, h);
    b = hue2rgb(p, q, h - 1 / 3);
  }
  const toHex = (x) => {
    const hex = Math.round(x * 255).toString(16);
    return hex.length === 1 ? `0${hex}` : hex;
  };
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}

// export function cssToHsl(css) {
//   //
// }

export function hslToCss(h, s, l) {
  return `hsl(${h},${s}%,${l}%)`;
}
