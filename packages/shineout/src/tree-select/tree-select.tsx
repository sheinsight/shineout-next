import React, { memo } from 'react';
import { TreeSelect as UnStyleTreeSelect } from '@sheinx/base';
import { KeygenResult } from '@sheinx/hooks';
import useFieldCommon from '../hooks/use-field-common';
import {
  useTagStyle,
  useTreeSelectStyle,
  useTreeStyle,
  useSelectStyle,
  useCheckboxStyle,
  usePopoverStyle,
  useSpinStyle,
  useInnerTitleStyle,
} from '@sheinx/shineout-style';
import { BaseTreeSelectProps, TreeSelectProps } from './tree-select.type';

const jssStyle = {
  tag: useTagStyle,
  spin: useSpinStyle,
  tree: useTreeStyle,
  select: useSelectStyle,
  checkbox: useCheckboxStyle,
  popover: usePopoverStyle,
  treeSelect: useTreeSelectStyle,
  innerTitle: useInnerTitleStyle,
};

const TreeSelectComponent = <DataItem, Value extends KeygenResult>(
  props: BaseTreeSelectProps<DataItem, Value>,
) => {
  return <UnStyleTreeSelect jssStyle={jssStyle} {...props} />;
};

const TreeSelect = <DataItem, Value extends KeygenResult>(
  props: TreeSelectProps<DataItem, Value>,
) => {
  return useFieldCommon(props, TreeSelectComponent<DataItem, Value>);
};

export default memo(TreeSelect) as typeof TreeSelect;
