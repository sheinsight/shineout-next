import { util } from '@sheinx/hooks';
import { isOne, isPercent } from './is';

const { devUseWarning } = util;

type RGB = string | number;
type HSL = string | number;

const CSS_INTEGER = '[-\\+]?\\d+%?';

// <http://www.w3.org/TR/css3-values/#number-value>
const CSS_NUMBER = '[-\\+]?\\d*\\.\\d+%?';

const CSS_UNIT = `(?:${CSS_NUMBER})|(?:${CSS_INTEGER})`;

const PERMISSIVE_MATCH3 = `[\\s|\\(]+(${CSS_UNIT})[,|\\s]+(${CSS_UNIT})[,|\\s]+(${CSS_UNIT})\\s*\\)?`;
const PERMISSIVE_MATCH4 = `[\\s|\\(]+(${CSS_UNIT})[,|\\s]+(${CSS_UNIT})[,|\\s]+(${CSS_UNIT})[,|\\s]+(${CSS_UNIT})\\s*\\)?`;

const { floor } = Math;

// all color RegExp
const MATCH = {
  CSS_UNIT: new RegExp(CSS_UNIT),
  rgb: new RegExp(`rgb${PERMISSIVE_MATCH3}`),
  rgba: new RegExp(`rgba${PERMISSIVE_MATCH4}`),
  hsl: new RegExp(`hsl${PERMISSIVE_MATCH3}`),
  hsla: new RegExp(`hsla${PERMISSIVE_MATCH4}`),
  hsv: new RegExp(`hsv${PERMISSIVE_MATCH3}`),
  hsva: new RegExp(`hsva${PERMISSIVE_MATCH4}`),
  hex3: /^#?([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})$/,
  hex6: /^#?([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})$/,
  hex4: /^#?([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})$/,
  hex8: /^#?([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})$/,
};

function parseIntFromHex(val: string) {
  return parseInt(val, 16);
}

function convertHexToDecimal(h: string) {
  return parseIntFromHex(h) / 255;
}

// string to rgba {}
const parse = (color: string) => {
  color = color.toLowerCase();
  let match;
  if ((match = MATCH.rgb.exec(color))) {
    return { r: match[1], g: match[2], b: match[3] };
  }
  if ((match = MATCH.rgba.exec(color))) {
    return { r: match[1], g: match[2], b: match[3], a: match[4] };
  }
  if ((match = MATCH.hex8.exec(color))) {
    return {
      r: parseIntFromHex(match[1]),
      g: parseIntFromHex(match[2]),
      b: parseIntFromHex(match[3]),
      a: convertHexToDecimal(match[4]),
    };
  }
  if ((match = MATCH.hex6.exec(color))) {
    return {
      r: parseIntFromHex(match[1]),
      g: parseIntFromHex(match[2]),
      b: parseIntFromHex(match[3]),
    };
  }
  if ((match = MATCH.hex4.exec(color))) {
    return {
      r: parseIntFromHex(`${match[1]}${match[1]}`),
      g: parseIntFromHex(`${match[2]}${match[2]}`),
      b: parseIntFromHex(`${match[3]}${match[3]}`),
      a: convertHexToDecimal(`${match[4]}${match[4]}`),
    };
  }
  if ((match = MATCH.hex3.exec(color))) {
    return {
      r: parseIntFromHex(`${match[1]}${match[1]}`),
      g: parseIntFromHex(`${match[2]}${match[2]}`),
      b: parseIntFromHex(`${match[3]}${match[3]}`),
    };
  }
  return false;
};

const toRGB = (input: string) => {
  if (!input || typeof input !== 'string') return '';
  const color = parse(input);
  if (!color) return '';
  return color.a
    ? `rgba(${color.r},${color.g},${color.b},${color.a})`
    : `rgb(${color.r},${color.g},${color.b})`;
};

const isString = (string: string) => {
  if (!string) {
    devUseWarning.error('the color is empty');
    return false;
  }

  if (typeof string !== 'string') {
    devUseWarning.error(`the color is get a ${typeof string}, expect string`);
    return false;
  }
  return true;
};

const dealPointZero = (string: number) => {
  const num = string.toFixed(1);
  const reg = /\.0*$/;
  if (reg.test(num)) return floor(Number(num));
  return num;
};

/**
 * parse Hex to int
 * @param {*} value Hex number
 */
const parseHex = (value: string) => parseInt(value, 16);

/**
 * format the hex array
 * @param {Array} array hex array
 */
const formatHexArray = (array: string[], length: number) => {
  if (length === 6) return [`${array[1]}`, `${array[2]}`, `${array[3]}`];
  if (length === 3)
    return [`${array[1]}${array[1]}`, `${array[2]}${array[2]}`, `${array[3]}${array[3]}`];
  if (length === 8) return [`${array[1]}`, `${array[2]}`, `${array[3]}`, `${array[4]}`];
  return [
    `${array[1]}${array[1]}`,
    `${array[2]}${array[2]}`,
    `${array[3]}${array[3]}`,
    `${array[4]}${array[4]}`,
  ];
};

const getRgb = (arr: string[], length: number) => {
  const array = formatHexArray(arr, length);
  return `rgb(${parseHex(array[0])}, ${parseHex(array[1])}, ${parseHex(array[2])})`;
};

const getRgba = (arr: string[], length: number) => {
  const array = formatHexArray(arr, length);
  return `rgba(${parseHex(array[0])}, ${parseHex(array[1])}, ${parseHex(array[2])}, ${dealPointZero(
    parseHex(array[3]) / 255,
  )})`;
};

const toBound01 = (val: number | string, max: number) => {
  if (isOne(val)) {
    val = '100%';
  }

  const processPercent = isPercent(val);
  val = Math.min(max, Math.max(0, parseInt(String(val), 10)));

  // Automatically convert percentage into number
  if (processPercent) {
    val = parseInt(String(val * max), 10) / 100;
  }

  // Handle floating point rounding errors
  if (Math.abs(val - max) < 0.000001) {
    return 1;
  }

  // Convert into [0, 1] range if it isn't already
  return (val % max) / parseInt(String(max), 10);
};

const hueToRgb = (p: number, q: number, t: number) => {
  if (t < 0) t += 1;
  if (t > 1) t -= 1;
  if (t < 1 / 6) return p + (q - p) * 6 * t;
  if (t < 1 / 2) return q;
  if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
  return p;
};

const translateHsl = (matchs: RegExpExecArray, a?: string | number) => {
  let [, h, s, l]: HSL[] = matchs;

  let r: RGB;
  let g: RGB;
  let b: RGB;

  h = toBound01(h, 360);
  s = toBound01(s, 100);
  l = toBound01(l, 100);

  if (s === 0) {
    r = l;
    g = l;
    b = l;
  } else {
    const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    const p = 2 * l - q;
    r = hueToRgb(p, q, h + 1 / 3);
    g = hueToRgb(p, q, h);
    b = hueToRgb(p, q, h - 1 / 3);
  }

  r = floor(r * 255);
  g = floor(g * 255);
  b = floor(b * 255);

  return a ? `rgba(${r}, ${g}, ${b}, ${a})` : `rgb(${r}, ${g}, ${b})`;
};

const isDarkRgb = (color: string) => {
  const matchs = MATCH.rgb.exec(color) || MATCH.rgba.exec(color);
  if (matchs) {
    const [, r, g, b]: RGB[] = matchs;
    return Number(r) * 0.299 + Number(g) * 0.578 + Number(b) * 0.114 < 192;
  }

  devUseWarning.error(`the string '${color}' is not a legal color`);
  return undefined;
};

const toHex = (rgb: number[], noAlpha: boolean, a: number) => {
  let [, r, g, b]: RGB[] = rgb;
  [, r, g, b] = rgb;

  let o;
  const calAlhpa = !noAlpha && a;
  r = floor(r).toString(16);
  g = floor(g).toString(16);
  b = floor(b).toString(16);

  if (r.length !== 2) r = `0${r}`;
  if (g.length !== 2) g = `0${g}`;
  if (b.length !== 2) b = `0${b}`;

  if (calAlhpa) o = floor(a * 255).toString(16);

  return calAlhpa ? `#${r}${g}${b}${o}` : `#${r}${g}${b}`;
};

// third parameter, to keep same with toHex
const toHsl = (rgb: number[], _: any, a: string) => {
  let [, r, g, b] = rgb;

  r = toBound01(r, 255);
  g = toBound01(g, 255);
  b = toBound01(b, 255);

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h: number;
  let s: number;
  let l = (max + min) / 2;

  if (max === min) {
    h = 0;
    s = 0; // achromatic
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
        h = 0;
        break;
    }

    h /= 6;
  }

  h = floor(h * 360);
  s = floor(s * 100);
  l = floor(l * 100);

  return a ? `hsla(${h}, ${s}, ${l}, ${a})` : `hsl(${h}, ${s}, ${l})`;
};
const rgbTranlate =
  (target: (rgb: (string | number)[], noAlpha?: boolean, a?: number | string) => string) =>
  (rgb: string, noAlpha?: boolean) => {
    if (!isString(rgb)) return '';
    let matchs;

    matchs = MATCH.rgb.exec(rgb);
    if (matchs) {
      return target(matchs, noAlpha);
    }

    matchs = MATCH.rgba.exec(rgb);
    if (matchs) {
      return target(matchs, noAlpha, Number(matchs[4]));
    }

    devUseWarning.error(`the string '${rgb}' is not a rgb color`);
    return '';
  };

export function hexToRgb(hex: string) {
  if (!isString(hex)) return '';

  let matchs: RegExpExecArray | null;

  matchs = MATCH.hex3.exec(hex);
  if (matchs) {
    return getRgb(matchs, 3);
  }

  matchs = MATCH.hex6.exec(hex);
  if (matchs) {
    return getRgb(matchs, 6);
  }

  matchs = MATCH.hex4.exec(hex);
  if (matchs) {
    return getRgba(matchs, 4);
  }

  matchs = MATCH.hex8.exec(hex);
  if (matchs) {
    return getRgba(matchs, 8);
  }

  devUseWarning.error(`the string '${hex}' is not a hex color`);
  return '';
}

export function hslToRgb(hsl: string) {
  if (!isString(hsl)) return '';

  let matchs: RegExpExecArray | null;

  matchs = MATCH.hsl.exec(hsl);
  if (matchs) {
    return translateHsl(matchs);
  }

  matchs = MATCH.hsla.exec(hsl);
  if (matchs) {
    return translateHsl(matchs, matchs[4]);
  }

  devUseWarning.error(`the string '${hsl}' is not a hsl color`);
  return '';
}
// @ts-ignore
export const rgbToHex = rgbTranlate(toHex);
// @ts-ignore
export const rgbTohsl = rgbTranlate(toHsl);

export function hexToHsl(hex: string) {
  const temp = hexToRgb(hex);
  if (!temp) return '';
  return rgbTohsl(temp);
}

export function hslToHex(hsl: string, noAlpha?: boolean) {
  const temp = hslToRgb(hsl);
  if (!temp) return '';
  return rgbToHex(temp, noAlpha);
}

// dark or light

export function judgeDark(color: string) {
  if (!isString(color)) return undefined;

  let rgbString = color;

  if (MATCH.hsl.test(color) || MATCH.hsla.test(color)) {
    rgbString = hslToRgb(color);
  }

  if (
    MATCH.hex3.test(color) ||
    MATCH.hex4.test(color) ||
    MATCH.hex6.test(color) ||
    MATCH.hex8.test(color)
  ) {
    rgbString = hexToRgb(color);
  }

  return isDarkRgb(rgbString);
}

export function isDark(color: string) {
  const result = judgeDark(color);
  if (result === undefined) return false;
  return result;
}

export function isLight(color: string) {
  const result = judgeDark(color);
  if (result === undefined) return false;
  return !result;
}

/**
 * get hsla h s l a
 * @param color hsl
 */
function getHSLA(color: string) {
  const hslReg = new RegExp(/hsla?\((\d{1,3}), (\d{1,3}), (\d{1,3})(, (\d{1,3}))?\)$/);
  hslReg.test(color);
  const h = RegExp.$1;
  const s = RegExp.$2;
  const l = RegExp.$3;
  const a = RegExp.$5.length ? RegExp.$5 : 1;
  return { h, s, l: parseInt(l, 10), a };
}

/**
 * darken color
 * @param color format rgb | rgba
 * @param value -100 ~ 100
 */
export function darken(color: string, value: string | number) {
  if (!color) return '';
  if (!value) value = 0;
  value = parseInt(String(value), 10);
  color = toRGB(color);
  const hsl = rgbTohsl(color);
  const { h, s, l, a } = getHSLA(hsl);
  return hslToRgb(`hsla(${h},${s}%,${l - value}%,${a})`);
}

/**
 * fade color
 * @param color format rgb
 * @param alpha 0-1
 */
export function fade(color: string, alpha = 1) {
  if (!color) return '';
  color = toRGB(color);
  const hsl = rgbTohsl(color);
  const { h, s, l } = getHSLA(hsl);
  return hslToRgb(`hsla(${h},${s}%,${l}%,${alpha})`);
}
