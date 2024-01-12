import React from 'react';
import { CardJssStyle } from './card.type';
import { CommonType } from '../common/type';

export interface CardClasses {
  wrapper: string;
  wrapperShadow: string;
  wrapperHover: string;
  header: string;
  body: string;
  footer: string;
}

export interface CardBodyProps extends Pick<CommonType, 'className' | 'style'> {
  jssStyle?: CardJssStyle;
  children?: React.ReactNode;
}
