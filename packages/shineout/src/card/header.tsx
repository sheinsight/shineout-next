import React from 'react';
import { CardHeader } from '@sheinx/base';
import { useCardStyle } from '@sheinx/shineout-style';
import { CardHeaderProps } from './header.type';

const jssStyle = {
  card: useCardStyle,
};
export default (props: CardHeaderProps) => {
  return <CardHeader jssStyle={jssStyle} {...props} />;
};
