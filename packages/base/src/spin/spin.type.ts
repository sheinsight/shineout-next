import { CommonType } from '../common/type';

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

export interface SpinStyle {
  spin?: () => SpinClasses;
}

export interface SpinClasses {
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
}
