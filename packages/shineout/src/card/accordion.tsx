import React from 'react';
import { CardAccordion } from '@sheinx/base';
import { useCardStyle } from '@sheinx/shineout-style';
import { CardAccordionProps } from './accordion.type';

const jssStyle = {
  card: useCardStyle,
};
export default (props: CardAccordionProps) => {
  return <CardAccordion jssStyle={jssStyle} {...props} />;
};
