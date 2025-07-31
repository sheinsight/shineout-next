import React from 'react';
import { Select as BaseSelect } from '@sheinx/base';
import useFieldCommon from '../hooks/use-field-common';
import {
  useSelectStyle,
  useInnerTitleStyle,
  useTagStyle,
  useCheckboxStyle,
  useRadioStyle,
  usePopoverStyle,
  useTreeStyle,
  useSpinStyle,
  useCommonStyle,
} from '@sheinx/shineout-style';
import { SelectProps, SelectPropsA, SelectPropsB } from './select.type';

const jssStyle = {
  tag: useTagStyle,
  select: useSelectStyle,
  innerTitle: useInnerTitleStyle,
  popover: usePopoverStyle,
  checkbox: useCheckboxStyle,
  radio: useRadioStyle,
  tree: useTreeStyle,
  spin: useSpinStyle,
  common: useCommonStyle,
};

function Select<DataItem, Value>(props: SelectProps<DataItem, Value>) {
  return <BaseSelect jssStyle={jssStyle} {...props} />;
}

function SelectComponent<DataItem, Value>(props: SelectPropsA<DataItem, Value>): JSX.Element;
function SelectComponent<DataItem, Value>(props: SelectPropsB<DataItem, Value>): JSX.Element;
function SelectComponent<DataItem, Value>(props: SelectProps<DataItem, Value>) {
  return useFieldCommon(props, Select<DataItem, Value>, 'array');
}

export default SelectComponent;
