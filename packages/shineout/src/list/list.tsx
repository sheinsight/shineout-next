import React from 'react';
import { List } from '@sheinx/base';

import {
  useListStyle,
  usePaginationStyle,
  useButtonStyle,
  useInputStyle,
  useCheckboxStyle,
  useEmptyStyle,
  useSpinStyle,
  useImageStyle,
  useSelectStyle,
} from '@sheinx/shineout-style';

import { ListProps } from './list.type';

const jssStyle = {
  list: useListStyle,
  pagination: usePaginationStyle,
  button: useButtonStyle,
  input: useInputStyle,
  checkbox: useCheckboxStyle,
  empty: useEmptyStyle,
  spin: useSpinStyle,
  image: useImageStyle,
  select: useSelectStyle,
};
export default <DataItem, Value extends any[]>(props: ListProps<DataItem, Value>) => {
  return <List jssStyle={jssStyle} {...props} />;
};
