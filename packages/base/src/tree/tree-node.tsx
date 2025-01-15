import React from 'react';
import TreeSimpleNode from './tree-simple-node';
import TreeVirtualNode from './tree-virtual-node';
import { TreeNodeProps } from './tree-node.type';
import { KeygenResult } from '@sheinx/hooks';

const TreeNode = <DataItem, Value extends KeygenResult[]>(
  props: TreeNodeProps<DataItem, Value>,
) => {
  const { virtual } = props;

  if (virtual) {
    return <TreeVirtualNode {...props} />;
  }

  return <TreeSimpleNode {...props} />;
};

export default TreeNode;