import { CommonType } from '../common/type';
import type { SemanticClassNames, SemanticStyles } from '../common/use-semantic';

export type SpinModeType = 'vertical' | 'horizontal';

export type SpinNameType =
  | 'default'
  | 'chasing-dots'
  | 'cube-grid'
  | 'double-bounce'
  | 'fading-circle'
  | 'four-dots'
  | 'plane'
  | 'pulse'
  | 'ring'
  | 'scale-circle'
  | 'three-bounce'
  | 'wave'
  | 'chasing-ring';

/**
 * Spin Semantic DOM key 列表
 * - root:        最外层容器
 * - section:     加载区域（容器模式下的遮罩层）
 * - indicator:   动画指示器
 * - description: 提示文案
 *
 * @see /docs/rfc/0001-semantic-dom.md
 */
export type SpinSemanticKey = 'root' | 'section' | 'indicator' | 'description';

/**
 * 传入函数式 `classNames` 时的状态快照。
 *
 * @version 3.10.0
 */
export interface SpinClassNamesInfo {
  /**
   * @cn 当前是否在加载中
   * @en Whether currently in loading state
   */
  loading: boolean;
}

export interface SpinStyle {
  spin?: () => SpinClasses;
}

export interface SpinClasses {
  rootClass: string;
  spin: string;
  default: string;
  chasingDots: string;
  cubeGrid: string;
  doubleBounce: string;
  fadingCircle: string;
  scaleCircle: string;
  fade: string;
  fourDots: string;
  plane: string;
  pulse: string;
  ring: string;
  threeBounce: string;
  wave: string;
  chasingRing: string;

  dots: string;
  item: string;

  content: string;
  container: string;
  loading: string;
  tip: string;
  vertical: string;
  horizontal: string;
}

export interface renderItemProps {
  jssStyle: SpinStyle;
  index: number;
  color?: string;
  size?: number | string;
  itemSize?: number | string;
  style?: React.CSSProperties;
  itemClass?: string;
  itemStyle?: React.CSSProperties;
}

export interface BaseSpinProps {
  wrapperClass?: string;
  wrapperStyle?: React.CSSProperties;
  size?: number | string;
  color?: string;
  jssStyle?: SpinStyle;
  render?: any;
  style?: React.CSSProperties;
  count?: number;
  itemStyle?: React.CSSProperties;
  itemClass?: string;
  itemSize?: number | string;
  className?: string;
  uniqueClassName?: string;
}

export interface SpinProps extends Pick<CommonType, 'className' | 'style'> {
  jssStyle?: SpinStyle;
  /**
   * @en Tip className
   * @cn tip 文案上的 className
   */
  tipClassName?: string;
  /**
   * @en Spin has children
   * @cn 作为包裹元素使用
   */
  children?: React.ReactNode;
  /**
   * @en Custom tip
   * @cn 提示文案
   */
  tip?: string | React.ReactNode;
  /**
   * @en Size
   * @cn 尺寸
   * @default 40
   */
  size?: number | string;
  /**
   * @en Type
   * @cn 类型
   */
  name?: SpinNameType;
  /**
   * @en Color
   * @cn 颜色
   */
  color?: string;
  /**
   * @en Layout mode
   * @cn 布局模式
   * @default 'vertical'
   */
  mode?: SpinModeType;
  /**
   * @en Loading
   * @cn 是否为加载中
   * @default false
   */
  loading?: boolean;
  /**
   * @en
   * @cn 内部属性，是否忽略全局配置
   * @default false
   */
  ignoreConfig?: boolean;

  /**
   * @en Semantic DOM classNames for internal nodes (root / section / indicator / description).
   *     Accepts a static string or a function receiving a state snapshot.
   * @cn 语义化 DOM 类名，可精准定制内部节点（root / section / indicator / description）。
   *     值可为静态字符串或接收状态快照的函数。
   * @version 3.10.0
   */
  classNames?: SemanticClassNames<SpinSemanticKey, SpinClassNamesInfo>;

  /**
   * @en Semantic DOM inline styles for internal nodes (root / section / indicator / description).
   * @cn 语义化 DOM 内联样式，可精准定制内部节点（root / section / indicator / description）。
   * @version 3.10.0
   */
  styles?: SemanticStyles<SpinSemanticKey>;
}
