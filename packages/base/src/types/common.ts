import { CSSProperties } from 'react';

export interface CommonType {
  status?: 'error';
  className?: string;
  style?: CSSProperties;
  size?: 'small' | 'large' | 'default';
}
