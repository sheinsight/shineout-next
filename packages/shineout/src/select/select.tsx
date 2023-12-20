import React from 'react';
import { Select as BaseSelect } from '@sheinx/base';
import {
  useSelectStyle,
  useInnerTitleStyle,
  useVirtualScrollStyle,
  useTagStyle,
  useCheckboxStyle,
  useRadioStyle,
  usePopoverStyle,
  useTreeStyle,
} from '@sheinx/shineout-style';
import { SelectProps, SelectPropsA, SelectPropsB } from './select.type';

const jssStyle = {
  tag: useTagStyle,
  select: useSelectStyle,
  innerTitle: useInnerTitleStyle,
  virtualScroll: useVirtualScrollStyle,
  popover: usePopoverStyle,
  checkbox: useCheckboxStyle,
  radio: useRadioStyle,
  tree: useTreeStyle,
};

function Select<DataItem, Value>(props: SelectPropsA<DataItem, Value>): JSX.Element;
function Select<DataItem, Value>(props: SelectPropsB<DataItem, Value>): JSX.Element;
function Select<DataItem, Value>(props: SelectProps<DataItem, Value>) {
  return <BaseSelect jssStyle={jssStyle} {...props} />;
}

export default Select;
