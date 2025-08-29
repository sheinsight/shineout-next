import React, { memo } from 'react';
import { TreeSelect as UnStyleTreeSelect, TreeSelectValueType } from '@sheinx/base';
import useFieldCommon from '../hooks/use-field-common';
import {
  useCheckboxStyle,
  useCommonStyle,
  useInnerTitleStyle,
  usePopoverStyle,
  useSelectStyle,
  useSpinStyle,
  useTagStyle,
  useTreeSelectStyle,
  useTreeStyle,
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
  common: useCommonStyle,
};

const TreeSelectComponent = <DataItem, Value extends TreeSelectValueType>(
  props: BaseTreeSelectProps<DataItem, Value>,
) => {
  return <UnStyleTreeSelect jssStyle={jssStyle} {...props} />;
};

TreeSelectComponent.displayName = 'ShineoutTreeSelect';

const TreeSelect = <DataItem, Value extends TreeSelectValueType>(
  props: TreeSelectProps<DataItem, Value>,
) => {
  return useFieldCommon(props, TreeSelectComponent<DataItem, Value>, 'array');
};

export default memo(TreeSelect) as typeof TreeSelect;
