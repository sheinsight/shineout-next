import React from 'react';
import { CardGroupItem } from '@sheinx/base';
import { useCardGroupStyle, useCheckboxStyle } from '@sheinx/shineout-style';
import type { CardGroupItemProps } from './item.type';

const jssStyle = {
  cardGroup: useCardGroupStyle,
  checkbox: useCheckboxStyle,
};
export default <V,>(props: CardGroupItemProps<V>) => {
  return <CardGroupItem jssStyle={jssStyle} {...props} />;
};
