import React from 'react';
import { CardFooter } from '@sheinx/base';
import { useCardStyle } from '@sheinx/shineout-style';
import { CardFooterProps } from './footer.type';

const jssStyle = {
  card: useCardStyle,
};
export default (props: CardFooterProps) => {
  return <CardFooter jssStyle={jssStyle} {...props} />;
};
