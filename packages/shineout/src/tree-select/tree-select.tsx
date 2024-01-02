import React from 'react';
import { TreeSelect } from '@sheinx/base';
import { useTreeSelectStyle } from '@sheinx/shineout-style';
import { TreeSelectProps } from './tree-select.type';

const jssStyle = {
  treeSelect: useTreeSelectStyle,
};
export default (props: TreeSelectProps) => {
  return <TreeSelect jssStyle={jssStyle} {...props} />;
};
