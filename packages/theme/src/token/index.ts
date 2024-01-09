import { cssvar } from '../utils/css-var';

const { figma, compile } = require('./figma.js');

export interface Token {
  name: string;
  type: string;
  value: string;
  describe: string;
}

const Tokens: any = {};

compile(figma).forEach((item: any) => {
  Tokens[item.token] = {
    type: item.type,
    name: item.name,
    value: item.value,
    describe: item.describe,
  };
});

export const tokenToVars = <T extends object>(
  componentToken: T,
  tokens?: { [key: string]: Token },
): T => {
  const token: {
    [key in keyof T]?: string;
  } = {};
  const TOKEN = tokens || Tokens;
  const SIZE = TOKEN['Size'].value;

  Object.keys(componentToken).forEach((key) => {
    const Key = key as keyof T & string;
    const tokenKey = componentToken[Key] as keyof typeof TOKEN & string;
    token[Key] = cssvar(tokenKey, TOKEN[tokenKey]?.value || tokenKey, key, SIZE);
  });

  return token as T;
};

export default Tokens;
