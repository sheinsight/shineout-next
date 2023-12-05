import React from 'react';
import { List } from '@sheinx/base';
import { useListStyle } from '@sheinx/shineout-style';
import { ListProps } from './list.type';

const jssStyle = {
  list: useListStyle,
};
export default (props: ListProps) => {
  return <List jssStyle={jssStyle} {...props} />;
};
