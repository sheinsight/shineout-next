import { CommonType } from '../common/type';

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
export interface SpinClasses {
  default: string;
  chasingDots: string;
  cubeGrid: string;

  dots: string;
  item: string;
}

export interface renderItemProps {
  jssStyle?: {
    spin: SpinClasses;
  };
  index: number;
  color?: string;
  style?: React.CSSProperties;
  itemStyle?: React.CSSProperties;
}

export interface BaseSpinProps {
  wrapperClass?: string;
  wrapperStyle?: React.CSSProperties;
  size?: number | string;
  color?: string;
  jssStyle?: {
    spin: SpinClasses;
  };
  render?: any;
  style?: React.CSSProperties;
  count?: number;
  itemStyle?: React.CSSProperties;
  itemClass?: string;
  itemSize?: number | string;
  className?: string;
}

export interface SpinProps extends Pick<CommonType, 'className' | 'style'> {
  jssStyle?: {
    spin: SpinClasses;
  };
  size?: number | string;
  name?: SpinNameType;
  color?: string;
}
