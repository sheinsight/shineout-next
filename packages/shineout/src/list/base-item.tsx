import React from 'react';
import { ListBaseItem } from '@sheinx/base';

import { useListStyle, useImageStyle } from '@sheinx/shineout-style';

import { ListBaseItemProps } from './base-item.type';

const jssStyle = {
  list: useListStyle,
  image: useImageStyle,
};
export default (props: ListBaseItemProps) => {
  return <ListBaseItem jssStyle={jssStyle} {...props} />;
};
