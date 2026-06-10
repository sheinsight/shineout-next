import classnames from 'classnames';
import type { CSSProperties, FC } from 'react';

export type SemanticClassNames<K extends string> = Partial<Record<K, string>>;
export type SemanticStyles<K extends string> = Partial<Record<K, CSSProperties>>;

/**
 * Semantic DOM 一个 key 的元数据。供文档站 Semantic tab 等场景展示。
 */
export interface SemanticKeyMeta<K extends string = string> {
  /** 语义 key 名称，如 'root' / 'arrow' / 'content' */
  key: K;
  /** 中文说明 */
  cn: string;
  /** 英文说明 */
  en: string;
}

/**
 * 组件 Semantic DOM 元数据。
 * 由 `packages/<chunkModule>/src/<comp>/<comp>.semantic.tsx` 导出，
 * 文档站构建脚本自动检测并接入 chunk。
 */
export interface SemanticSchema<K extends string = string> {
  /** key 列表（中英说明） */
  keys: SemanticKeyMeta<K>[];
  /**
   * 渲染该组件并把所有 semantic 节点都激活的演示组件。
   * 文档站 Semantic tab 左侧渲染它，右侧按 keys 列表交互。
   */
  demo: FC;
}

/**
 * 全局兜底配置形态（来自 setConfig({ <component>: { classNames, styles } })）。
 * 字段为可选；当组件 prop 未传时回退到全局值。
 */
export interface SemanticGlobalConfig<K extends string> {
  classNames?: SemanticClassNames<K>;
  styles?: SemanticStyles<K>;
}

/**
 * 按 semantic key 取 className：合并内部 JSS class + 全局兜底 class + 用户传入 class。
 *
 * - 拼接顺序：内部 → 全局 → 用户（CSS 后出胜出 + 用户期望"我传的最大"）
 * - 第二个参数 `internalClass` 是组件自己的 JSS class（可以是字符串、数组、含 false/undefined）
 *
 * 示例：
 * ```tsx
 * <div className={semClass('arrow', [popoverStyle?.arrow, props.arrowClass])} />
 * ```
 */
export type SemanticClassFn<K extends string> = (
  key: K,
  internalClass?: string | (string | false | undefined)[],
) => string;

/**
 * 按 semantic key 取 style：浅合并全局兜底 style + 用户传入 style。
 *
 * - 合并顺序：全局 → 用户（用户胜出）
 * - 仅当任一方传了对应 key 时返回对象；否则返回 undefined（React 会忽略）
 * - **不合并组件内部计算出的 style**（如 root 节点的 containerStyle）——这部分应由组件
 *   自己显式合并：`style={{ ...containerStyle, ...semStyle('root') }}`，谁覆盖谁一目了然。
 *
 * 示例：
 * ```tsx
 * <div style={semStyle('arrow')} />
 * <div style={{ ...containerStyle, ...semStyle('root') }} />
 * ```
 */
export type SemanticStyleFn<K extends string> = (key: K) => CSSProperties | undefined;

/**
 * Semantic DOM 工具 hook：返回 `[semClass, semStyle]` 两个独立函数，让 className 与
 * style 在 JSX 上各管各的，**杜绝 spread 时的隐式覆盖问题**。
 *
 * 优先级（高→低）：组件 prop > 全局 setConfig > 组件内部默认。
 *
 * 设计参考：业界主流组件库（如 antd v6 Card 的 moduleClass / moduleStyle）也采用
 * "className 与 style 两个独立函数" 的模式，避免 spread 模糊化覆盖关系。
 *
 * @see /docs/rfc/0001-semantic-dom.md
 *
 * 用法：
 * ```tsx
 * const [semClass, semStyle] = useSemantic<PopoverSemanticKey>(
 *   props.classNames,
 *   props.styles,
 *   config.popover,
 * );
 *
 * <div
 *   className={semClass('root', [popoverStyle?.rootClass, popoverStyle?.wrapper])}
 *   style={{ ...containerStyle, ...semStyle('root') }}
 * >
 *   <div className={semClass('arrow', popoverStyle?.arrow)} style={semStyle('arrow')} />
 * </div>
 * ```
 */
export function useSemantic<K extends string>(
  userClassNames?: SemanticClassNames<K>,
  userStyles?: SemanticStyles<K>,
  globalConfig?: SemanticGlobalConfig<K>,
): [SemanticClassFn<K>, SemanticStyleFn<K>] {
  const semClass: SemanticClassFn<K> = (key, internalClass) =>
    classnames(internalClass, globalConfig?.classNames?.[key], userClassNames?.[key]);

  const semStyle: SemanticStyleFn<K> = (key) => {
    const g = globalConfig?.styles?.[key];
    const u = userStyles?.[key];
    if (!g && !u) return undefined;
    return { ...g, ...u };
  };

  return [semClass, semStyle];
}
