import React from 'react';

export interface ButtonGroupProps {
  size?: 'small' | 'large' | 'default';
  outline?: boolean;
  type?: 'default' | 'primary' | 'secondary' | 'danger' | 'warning' | 'success' | 'link';
  children: React.ReactNode;
}
