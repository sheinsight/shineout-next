import React from 'react';
import { TreeSelect } from '@sheinx/base';
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
import { TreeSelectProps } from './tree-select.type';

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
export default <DataItem, Value>(props: TreeSelectProps<DataItem, Value>) => {
  return <TreeSelect jssStyle={jssStyle} {...props} />;
};
