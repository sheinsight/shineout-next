import React from 'react';
import { Card } from '@sheinx/base';
import { useCardStyle } from '@sheinx/shineout-style';
import { CardProps } from './card.type';

const jssStyle = {
  card: useCardStyle,
};
export default (props: CardProps) => {
  return <Card jssStyle={jssStyle} {...props} />;
};
