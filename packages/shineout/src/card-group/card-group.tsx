import React from 'react';
import { CardGroup } from '@sheinx/base';
import { useCardGroupStyle, useCheckboxStyle } from '@sheinx/shineout-style';
import { CardGroupProps } from './card-group.type';

const jssStyle = {
  cardGroup: useCardGroupStyle,
  checkbox: useCheckboxStyle,
};
export default (props: CardGroupProps) => {
  return <CardGroup jssStyle={jssStyle} {...props} />;
};
