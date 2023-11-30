import React from 'react';
import { Select } from '@sheinx/base';
import {
  useSelectStyle,
  useInnerTitleStyle,
  useVirtualScrollStyle,
  useTagStyle,
  useCheckboxStyle,
  useRadioStyle,
  usePopoverStyle,
} from '@sheinx/shineout-style';
import { SelectProps } from './select.type';

const jssStyle = {
  tag: useTagStyle,
  select: useSelectStyle,
  innerTitle: useInnerTitleStyle,
  virtualScroll: useVirtualScrollStyle,
  popover: usePopoverStyle,
  checkbox: useCheckboxStyle,
  radio: useRadioStyle,
};
export default <DataItem, Value>(props: SelectProps<DataItem, Value>) => {
  return <Select jssStyle={jssStyle} {...props} />;
};
