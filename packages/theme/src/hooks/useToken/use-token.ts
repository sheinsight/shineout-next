import { useTokenProps, Token } from './use-token.type';
const { figma } = require('../../token/figma.js');

const useToken = (props?: useTokenProps) => {
  const { token: tokenProps } = props || {};
  // 后期会从 figma 中获取全部 token
  const unLockedToken = figma.filter((i: any) => i.locked === false);

  const token: Partial<Token> = {};
  unLockedToken.forEach((i: { name: keyof Token; value: string }) => {
    token[i.name] = i.value;
  });
  if (tokenProps) {
    return {
      token: {
        ...token,
        ...tokenProps,
      },
    };
  }

  return {
    token,
  };
};

export default useToken;
