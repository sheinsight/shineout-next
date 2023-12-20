/**
 * cn - 可拖拽
 *    -- 设置 `onDrop` 属性，可以拖拽节点
 *    -- 设置 `dragSibling` 属性，将限制节点拖拽范围至兄弟节点之间
 * en - Drag
 *    -- Set the `onDrop` property to drag the node.
 *    -- Set the `dragSibling` property to limit the node drag range to between sibling nodes.
 */

import { useState } from 'react';
import { Tree } from '../../../dist/cjs';
import { createNestedArray } from './utils';

export default () => {
  const [data, setData] = useState(createNestedArray([5, 2, 2]));

  const renderItem = (node: any) => {
    return <span>{`node ${node.id}`}</span>;
  };

  const handleDrag = (data) => {
    setData(data);
  };

  return (
    <div>
      <Tree line={false} data={data} keygen='id' renderItem={renderItem} onDrop={handleDrag}></Tree>
    </div>
  );
};
