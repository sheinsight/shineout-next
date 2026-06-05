import classnames from 'classnames';
import type { CSSProperties } from 'react';

export type SemanticClassNames<K extends string> = Partial<Record<K, string>>;
export type SemanticStyles<K extends string> = Partial<Record<K, CSSProperties>>;

export type SemanticAccessor<K extends string> = (
  key: K,
  internalClass?: string | (string | false | undefined)[],
) => { className: string; style: CSSProperties | undefined };

/**
 * Semantic DOM 工具 hook：把用户传入的 classNames / styles 与组件内部的 JSS class
 * 合并，返回一个按 key 取值的访问器。
 *
 * 内部 class 排在前，用户 class 排在后，自然获得更高的样式优先级。
 *
 * @see /docs/rfc/0001-semantic-dom.md
 */
export function useSemantic<K extends string>(
  userClassNames?: SemanticClassNames<K>,
  userStyles?: SemanticStyles<K>,
): SemanticAccessor<K> {
  return (key, internalClass) => ({
    className: classnames(internalClass, userClassNames?.[key]),
    style: userStyles?.[key],
  });
}
