import { stringToVar } from './string-to-var';

const cssvarFlag = '--';

export const cssvar = (str: string, value: string) => {
  return `var(${cssvarFlag}${stringToVar(str)},${value})`;
};
