import React from 'react';
import { CardBody } from '@sheinx/base';
import { useCardStyle } from '@sheinx/shineout-style';
import { CardBodyProps } from './body.type';

const jssStyle = {
  card: useCardStyle,
};
export default (props: CardBodyProps) => {
  return <CardBody jssStyle={jssStyle} {...props} />;
};
