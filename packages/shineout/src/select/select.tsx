import React from 'react';
import { Select } from '@sheinx/base';
import { useSelectStyle } from '@sheinx/shineout-style';
import { SelectProps } from './select.type';

const jssStyle = {
  select: useSelectStyle,
};
export default (props: SelectProps) => {
  return <Select jssStyle={jssStyle} {...props} />;
};
