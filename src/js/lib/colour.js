export const hslToRgb = (h, s, l) => {

    let rgb = [], c = 0, x = 0, m = 0;

    c = (1 - Math.abs(2 * l - 1)) * s;

    var h1 = h/60;

    x = c * (1 - Math.abs((h1 % 2) - 1));

    if (h1 >= 0 && h1 <= 1) {
        rgb = [c,x,0];
    }
    else if (h1 >= 1 && h1 <= 2) {
        rgb = [x,c,0];
    }
    else if (h1 >= 2 && h1 <= 3) {
        rgb = [0,c,x];
    }
    else if (h1 >= 3 && h1 <= 4) {
        rgb = [0,x,c];
    }
    else if (h1 >= 4 && h1 <= 5) {
        rgb = [x,0,c];
    }
    else if (h1 >= 5 && h1 <= 6) {
        rgb = [c,0,x];
    }
    else {
        rgb = [0,0,0];
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
    // console.table(components);
    ret = ret + components.join('');
        // console.log(ret);
    return ret;
}
            
export const getRandom = (bright) => {
    let val;

    if (bright) {
        val = rgbToHex(hslToRgb(Math.floor(Math.random() * 360), 1, .6));
    }
    else {
        val = '#';
        let chars = '1234567890ABCDEF'.split('');
        for (let i = 0; i < 6; i++) {
            val += chars[Math.floor(Math.random() * chars.length)];
        }
    }

    return val;
}