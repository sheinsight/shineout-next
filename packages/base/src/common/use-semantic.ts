import classnames from 'classnames';
import type { CSSProperties, FC } from 'react';

/**
 * 函数式 className 的返回值类型（字符串或 undefined）。
 * 返回 undefined 等同于不追加任何 class（classnames 会忽略 falsy 值）。
 */
export type SemanticClassValue = string | undefined;

/**
 * Semantic DOM className 映射类型。
 *
 * - `Info = void`（默认）：value 为纯字符串，向后兼容现有用法。
 * - `Info = <状态接口>`：value 可以是字符串，也可以是接收状态快照 `info` 并返回字符串的函数。
 *   函数在每次渲染时由 `useSemantic` 内部自动调用。
 *
 * 示例（Popover 函数式用法）：
 * ```tsx
 * <Popover
 *   classNames={{
 *     root: ({ open }) => open ? 'my-pop my-pop--open' : 'my-pop',
 *     arrow: 'my-arrow',          // 纯字符串仍然有效
 *   }}
 * />
 * ```
 */
export type SemanticClassNames<K extends string, Info = void> = Partial<
  Record<
    K,
    Info extends void ? string : string | ((info: Info) => SemanticClassValue)
  >
>;

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
  /** 引入版本号，可选，显示为 chip 例 "3.10.0" */
  version?: string;
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
 * 静态 classNames 用法：
 * ```tsx
 * const [semClass, semStyle] = useSemantic<PopoverSemanticKey>(
 *   props.classNames,
 *   props.styles,
 *   config.popover,
 * );
 * ```
 *
 * 函数式 classNames 用法（传入第 4 个参数 `info`）：
 * ```tsx
 * const [semClass, semStyle] = useSemantic<PopoverSemanticKey, PopoverClassNamesInfo>(
 *   props.classNames,
 *   props.styles,
 *   config.popover,
 *   { open, position, type },   // 每次渲染时注入的状态快照
 * );
 *
 * // classNames 中传函数时，info 会自动传给函数：
 * <Popover classNames={{ root: ({ open }) => open ? 'is-open' : '' }} />
 * ```
 */
export function useSemantic<K extends string, Info = void>(
  userClassNames?: SemanticClassNames<K, Info>,
  userStyles?: SemanticStyles<K>,
  globalConfig?: SemanticGlobalConfig<K>,
  info?: Info,
): [SemanticClassFn<K>, SemanticStyleFn<K>] {
  const semClass: SemanticClassFn<K> = (key, internalClass) => {
    const globalClass = globalConfig?.classNames?.[key];
    // userClassNames 的 value 可能是字符串，也可能是 (info) => string 的函数
    const rawUser = userClassNames?.[key];
    // 显式注解为 SemanticClassValue，确保传给 classnames 的值不含函数类型
    const resolvedUser: SemanticClassValue =
      typeof rawUser === 'function'
        ? (rawUser as (info: Info) => SemanticClassValue)(info as Info)
        : (rawUser as string | undefined);
    return classnames(internalClass, globalClass, resolvedUser);
  };

  const semStyle: SemanticStyleFn<K> = (key) => {
    const g = globalConfig?.styles?.[key];
    const u = userStyles?.[key];
    if (!g && !u) return undefined;
    return { ...g, ...u };
  };

  return [semClass, semStyle];
}
