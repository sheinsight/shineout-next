import Token from '../../token/token';
import { replaceNonAlphanumeric } from '../../utils/css-var';
import { getConfig } from '../../config';
import { useTokenProps, ColorToken, BaseToken } from './use-token.type';
const { figma } = require('../../token/figma.js');

const useToken = (props?: useTokenProps) => {
  const { token: tokenProps } = props || {};
  const { prefix } = getConfig();

  // 后期会从 figma 中获取全部 token
  const unLockedToken = figma.filter((i: any) => i.locked === false);

  const colorToken: Partial<ColorToken> = {};
  unLockedToken.forEach((i: { name: keyof ColorToken; value: string; token: string }) => {
    const k = `var(--${prefix}-${replaceNonAlphanumeric(i.token)},${i.value})`;
    colorToken[i.name] = k;
  });
  if (tokenProps) {
    return {
      token: {
        ...colorToken,
        ...tokenProps,
      },
    };
  }

  const baseToken: { [token: string]: string } = {};

  Object.keys(Token).forEach((key: string) => {
    const k = key.replace(/-/g, '_').toLocaleLowerCase();
    if (/^\d/.test(k)) {
      return;
    }
    const token = `var(--${prefix}-${replaceNonAlphanumeric(key)})`;
    baseToken[k] = token;
  });

  const token = Object.assign({}, colorToken, baseToken) as Partial<ColorToken & BaseToken>;

  return {
    token,
  };
};

export default useToken;
