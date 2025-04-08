/**
 * cn - 自定义拖拽样式
 *    -- 通过设置 [dragImageStyle](#dragImageStyle) 属性为处于拖拽中跟随鼠标的节点添加样式
 * en - Drag Style
 *    -- Set the [dragImageStyle](#dragImageStyle) property to add style to the node that follows the mouse during dragging
 */

import { useState } from 'react';
import { Tree, TYPE } from 'shineout';
import { createNestedArray } from './utils';

type TreeProps = TYPE.Tree.Props<DataItem, string[]>;

interface DataItem {
  id: string;
  children?: DataItem[];
}

export default () => {
  const [data, setData] = useState<TreeProps['data']>(createNestedArray([5, 2, 2]));

  const renderItem: TreeProps['renderItem'] = (node) => {
    return <span style={{ display: 'inline-block' }}>{`node ${node.id}`}</span>;
  };

  const handleDrag: TreeProps['onDrop'] = (data) => {
    setData(data);
  };

  return (
    <div>
      <Tree
        dragImageStyle={{ background: '#F1FAEB', border: '2px dashed #74D13D' }}
        line={false}
        data={data}
        keygen='id'
        renderItem={renderItem}
        onDrop={handleDrag}
      ></Tree>
    </div>
  );
};
