/**
 * cn - 可拖拽
 *    -- 设置 [onDrop](#onDrop) 属性，可以拖拽节点
 *    -- 设置 [dragSibling](#dragSibling) 属性，将限制节点拖拽范围至兄弟节点之间
 * en - Drag
 *    -- Set the [onDrop](#onDrop) property to drag the node.
 *    -- Set the [dragSibling](#dragSibling) property to limit the node drag range to between sibling nodes
 */

import { useState } from 'react';
import { Tree, TYPE } from 'shineout';
import { createNestedArray } from './utils';

type TreeProps = TYPE.Tree.Props<DataItem, string[]>;

interface DataItem {
  id: string;
  children?: DataItem[];
}

const d: DataItem[] = createNestedArray([4, 1, 1]);

export default () => {
  const [data, setData] = useState(d);

  const renderItem: TreeProps['renderItem'] = (node) => {
    return <span style={{ display: 'inline-block' }}>{`node ${node.id}`}</span>;
  };

  const handleDrag: TreeProps['onDrop'] = (data) => {
    setData(data);
  };

  return (
    <div>
      <Tree
        line={false}
        data={data}
        onDragStart={(v) => console.log(v)}
        keygen='id'
        renderItem={renderItem}
        onDrop={handleDrag}
      ></Tree>
    </div>
  );
};
