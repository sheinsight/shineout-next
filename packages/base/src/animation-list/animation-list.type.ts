import React from 'react';

type ListAnimationType = 'collapse' | 'fade' | 'scale-y';

export interface AnimationListProps extends React.HTMLAttributes<HTMLDivElement> {
  type: ListAnimationType | ListAnimationType[];
  duration: 'fast' | 'slow' | 'default';
  show: boolean;
  display?: string;
  children?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  onRef?: React.Ref<HTMLDivElement | null>;
  animation?: boolean;
  onAnimationAfterEnter?: () => void;
  dir?: 'ltr' | 'rtl';
}
