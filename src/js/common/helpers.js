// Helpers
export default function uuid(len) {
    let length = len || 6;
    let charCodes = [];
    let string = '';

    for (let i = 0; i < 10; i++) {
        charCodes.push(48 + i);
        charCodes.push(97 + i);
    }
    for (let i = 0; i < 16; i++) {
        charCodes.push(107 + i);
    }

    for (let i = 0; i < length; i++) {
        let charIndex = Math.floor(Math.random() * charCodes.length);
        string = string + String.fromCharCode(charCodes[charIndex]);
    }

    return string;
}