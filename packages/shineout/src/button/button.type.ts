import React from 'react';
import { ButtonProps as UiButtonProps } from '@sheinx/base';

export interface BaseButtonProps {
  children?: React.ReactNode;
  type?: UiButtonProps['type'];
}

export type ButtonProps = BaseButtonProps;
