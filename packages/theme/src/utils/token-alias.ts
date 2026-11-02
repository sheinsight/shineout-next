import { getConfig } from '../config';
import { replaceNonAlphanumeric } from './css-var';

// 别名链的最大层数，超出视为配置错误
const MAX_DEPTH = 5;

/**
 * token 的值可以直接写成另一个 token 的名称（如 'Neutral-fill-1'），
 * 解析为对该 token 的 css 变量引用，并以被引用 token 的实际值作为回退：
 * 'Neutral-fill-1' => var(--soui-neutral-fill-1,#FFFFFF)
 *
 * - 不是 token 名称的值（如 '#FFFFFF'、'transparent'）原样返回
 * - lookup 返回非字符串（含 Object.prototype 上的属性）视为不是 token 名称
 * - 别名链循环或超过 MAX_DEPTH 层时无法解析，原样返回并在开发环境告警
 */
export const resolveTokenAlias = (
  value: string,
  lookup: (name: string) => string | undefined,
): string => {
  const chain: string[] = [];
  let current = value;
  let target = lookup(current);

  while (typeof target === 'string') {
    if (chain.includes(current) || chain.length >= MAX_DEPTH) {
      if (process.env.NODE_ENV !== 'production') {
        console.warn(`[shineout] token alias "${value}" is circular or nested too deep, skipped.`);
      }
      return value;
    }
    chain.push(current);
    current = target;
    target = lookup(current);
  }

  if (!chain.length) return value;

  const { prefix } = getConfig();
  return chain.reduceRight(
    (fallback, name) => `var(--${prefix}-${replaceNonAlphanumeric(name)},${fallback})`,
    current,
  );
};
