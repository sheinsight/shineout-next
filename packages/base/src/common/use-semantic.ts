import classnames from 'classnames';
import type { CSSProperties } from 'react';

export type SemanticClassNames<K extends string> = Partial<Record<K, string>>;
export type SemanticStyles<K extends string> = Partial<Record<K, CSSProperties>>;

export type SemanticAccessor<K extends string> = (
  key: K,
  internalClass?: string | (string | false | undefined)[],
) => { className: string; style: CSSProperties | undefined };

/**
 * 全局兜底配置形态（来自 setConfig({ <component>: { classNames, styles } })）。
 * 字段为可选；当组件 prop 未传时回退到全局值。
 */
export interface SemanticGlobalConfig<K extends string> {
  classNames?: SemanticClassNames<K>;
  styles?: SemanticStyles<K>;
}

/**
 * Semantic DOM 工具 hook：把用户传入的 classNames / styles、全局兜底配置与组件内部的
 * JSS class 合并，返回一个按 key 取值的访问器。
 *
 * 优先级（高→低）：组件 prop > 全局 setConfig > 组件内部默认（即仅内部 class）。
 *
 * 拼接顺序：内部 class → 全局 class → 用户 class。
 * 越靠后越胜出，符合 CSS 后出胜出 + 用户期望"我传的最大"的直觉。
 *
 * styles 用浅合并，逐 key 覆盖；不递归合并嵌套对象。
 *
 * @see /docs/rfc/0001-semantic-dom.md
 */
export function useSemantic<K extends string>(
  userClassNames?: SemanticClassNames<K>,
  userStyles?: SemanticStyles<K>,
  globalConfig?: SemanticGlobalConfig<K>,
): SemanticAccessor<K> {
  return (key, internalClass) => ({
    className: classnames(
      internalClass,
      globalConfig?.classNames?.[key],
      userClassNames?.[key],
    ),
    style:
      globalConfig?.styles?.[key] || userStyles?.[key]
        ? { ...globalConfig?.styles?.[key], ...userStyles?.[key] }
        : undefined,
  });
}
