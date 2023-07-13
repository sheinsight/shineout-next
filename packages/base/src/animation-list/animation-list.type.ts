import React from 'react';

type ListAnimationType = 'collapse' | 'fade' | 'scale-y';

export interface AnimationListClass {
  'animation-240': string;
  'animation-360': string;
  'animation-480': string;
  'fade-animation-240': string;
  'fade-animation-360': string;
  'fade-animation-480': string;
  show: string;
  fade: string;
  collapse: string;
  'scale-y': string;
}
export interface AnimationListProps {
  type: ListAnimationType | ListAnimationType[];
  duration: 'fast' | 'slow' | 'default';
  show: boolean;
  display?: string;
  children?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  jssStyle: AnimationListClass;
}
