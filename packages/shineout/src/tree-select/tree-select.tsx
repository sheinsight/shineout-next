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
};
export default (props: TreeSelectProps) => {
  return <TreeSelect jssStyle={jssStyle} {...props} />;
};
