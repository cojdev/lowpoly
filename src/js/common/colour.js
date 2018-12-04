export const hslToRgb = (h, s, l) => {

    let rgb = [],
        c = 0,
        x = 0,
        m = 0;

    c = (1 - Math.abs(2 * l - 1)) * s;

    let h1 = h / 60;

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

    rgb = rgb.map(item => Math.floor((item + m) * 255));

    // console.log(rgb);

    return rgb;
}

export const rgbToHex = (arr) => {
    let ret = '#';
    let components = arr.map(item => {
        let ret = item.toString(16);
        if (ret.length === 1) {
            ret = '0' + ret;
        }
        return ret;
    });
    ret = ret + components.join('');
    return ret;
}

export const getRandom = (bright) => {
    let val;

    if (bright) {
        val = rgbToHex(hslToRgb(Math.floor(Math.random() * 360), .95, .6));
    } else {
        val = '#';
        let chars = '1234567890ABCDEF'.split('');

        for (let i = 0; i < 6; i++) {
            val += chars[Math.floor(Math.random() * chars.length)];
        }
    }

    return val;
}

/**
 * Convert hex colour to RGB
 * @param {string} hex Colour is 3 or 6 digit hexadecimal
 * @returns {array}
 */
export function hexToRgb(hex) {
    hex = hex.replace('#', '');

    switch (hex.length) {
        case 3:
            {
                let ret = hex.split('').map(item => parseInt(item + item, 16));
                return ret;
            }

        case 6:
            {
                let ret = hex.match(/.{2}/g).map(item => parseInt(item, 16));
                return ret;
            }

        default:
            return;
    }
}

export function hexToHsl(hex) {
    hex = hex.replace('#', '');

    let result;
    
    switch (hex.length) {
        case 3:
            result = hex.split('').map(item => parseInt(item + item, 16));
            break;
        case 6:
            result = hex.match(/.{2}/g).map(item => parseInt(item, 16));
            break;
        default:
            return;
    }
    const r = result[0] / 255,
        g = result[1] / 255,
        b = result[2] / 255;

    const max = Math.max(r, g, b),
        min = Math.min(r, g, b);

    let h, s, l = (max + min) / 2;

    if (max === min) {
        h = s = 0; // achromatic
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
        }
        h = h / 6;
    }

    h = Math.floor(h * 360);
    s = Math.floor(s * 100);
    l = Math.floor(l * 100);

    return [h,s,l];
}

export function hslToHex(hsl) {
    const h = hsl[0] / 360,
        s = hsl[1] / 100,
        l = hsl[2] / 100;

    let r, g, b;

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
    const toHex = x => {
        const hex = Math.round(x * 255).toString(16);
        return hex.length === 1 ? '0' + hex : hex;
    };
    return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}

export function cssToHsl(css) {
    //
}