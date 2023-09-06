import { CSSProperties } from 'react';

export interface CommonType {
  status?: 'error';
  className?: string;
  style?: CSSProperties;
  /**
   * @en There are three built-in size: small、default、large.
   * @cn 不同尺寸
   * @override union
   * @default 'default'
   */
  size?: 'small' | 'large' | 'default';
}
