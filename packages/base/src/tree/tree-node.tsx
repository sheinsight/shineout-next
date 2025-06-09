import React from 'react';
import TreeSimpleNode from './tree-simple-node';
import TreeVirtualNode from './tree-virtual-node';
import { TreeNodeProps } from './tree-node.type';
import { KeygenResult } from '@sheinx/hooks';

const TreeNode = <DataItem, Value extends KeygenResult[]>(
  props: TreeNodeProps<DataItem, Value>,
) => {
  // TODO: 外部没有传递 virtual 属性的用法，考虑删除
  const { virtual } = props;

  if (virtual) {
    return <TreeVirtualNode {...props} level={1} />;
  }

  return <TreeSimpleNode {...props} />;
};

export default TreeNode;
