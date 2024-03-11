import React from 'react';

export interface CommonType {
  size?: 'small' | 'large' | 'default';
  className?: string;
  style?: React.CSSProperties;
}
