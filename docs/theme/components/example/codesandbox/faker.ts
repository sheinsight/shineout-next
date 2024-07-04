import dayjs from 'dayjs';
import { city, country, firstNames, lastNames, position } from './faker-data';

export {
  city, country, firstNames, lastNames, position
}

export function pickNumber(ma = 65555, mi = 0, fixed = 2) {
  let max = ma;
  let min = mi;
  if (typeof max === 'string') max = parseInt(max, 10);
  if (typeof min === 'string') min = parseInt(min, 10);

  const num = Math.random() * (max - min) + min;
  return parseFloat(num.toFixed(fixed));
}

export function pickInteger(...args: any[]) {
  return Math.round(pickNumber(...args));
}

export function random(max: number) {
  return Math.ceil(Math.random() * max);
}

export function pickDate(fmt = 'yyyy-MM-dd', offset = 10000000000) {
  const date = Date.now() - random(offset);
  return dayjs(date).format(fmt);
}

export function one(items: any[]) {
  return items[Math.floor(Math.random() * items.length)];
}

export function pick(items: any[], max = 1, min?: number) {
  let length = max;
  if (min) {
    length = pickInteger(max, min);
  }

  const buffer = [];
  while (length > 0) {
    buffer.push(one(items));
    length -= 1;
  }

  return buffer;
}

export function pickUnique(items: any[], max = 1, min?: number) {
  let length = max;
  // eslint-disable-next-line
  if (max > items.length) max = items.length;
  if (min) length = pickInteger(max, min);
  const nums = Array.from({ length: items.length }, (_v, k) => k);
  const buffer = [];

  for (let i = 0; i < length; i++) {
    const r = pickInteger(nums.length);
    const j = nums.splice(r, 1)[0];
    buffer.push(items[j]);
  }

  return buffer;
}

export function shuffle(deck: any[]) {
  const randomizedDeck = [];
  const array = deck.slice();
  while (array.length !== 0) {
    const rIndex = Math.floor(array.length * Math.random());
    randomizedDeck.push(array[rIndex]);
    array.splice(rIndex, 1);
  }
  return randomizedDeck;
}