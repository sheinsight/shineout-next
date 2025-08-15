import React, { memo } from 'react';
import { Cascader as UnStyledCascader } from '@sheinx/base';
import { useCascaderStyle, useCommonStyle } from '@sheinx/shineout-style';
import { KeygenResult } from '@sheinx/hooks';
import { CascaderProps } from './cascader.type';
import useFieldCommon from '../hooks/use-field-common';
import {
  useSelectStyle,
  useInnerTitleStyle,
  useTagStyle,
  useCheckboxStyle,
  useRadioStyle,
  usePopoverStyle,
  useSpinStyle,
} from '@sheinx/shineout-style';

const jssStyle = {
  cascader: useCascaderStyle,
  tag: useTagStyle,
  select: useSelectStyle,
  innerTitle: useInnerTitleStyle,
  popover: usePopoverStyle,
  checkbox: useCheckboxStyle,
  radio: useRadioStyle,
  spin: useSpinStyle,
  common: useCommonStyle,
};

const Cascader = <DataItem, Value extends KeygenResult[]>(
  props: CascaderProps<DataItem, Value>,
) => {
  return <UnStyledCascader {...props} jssStyle={jssStyle} />;
};

Cascader.displayName = 'ShineoutCascader';

export default memo(
  <DataItem, Value extends KeygenResult[]>(props: CascaderProps<DataItem, Value>) => {
    return useFieldCommon(props, Cascader<DataItem, Value>, 'array');
  },
) as typeof Cascader;
