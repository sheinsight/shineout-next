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

interface SpinStyle {
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
}

export interface SpinProps extends Pick<CommonType, 'className' | 'style'> {
  jssStyle?: SpinStyle;
  children?: React.ReactNode;
  tip?: string | React.ReactNode;
  size?: number | string;
  name?: SpinNameType;
  color?: string;
  mode?: SpinModeType;
  loading?: boolean;
}
