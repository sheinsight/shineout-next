/**
 * cn - 自定义拖拽样式
 *    -- 通过设置 `dragImageStyle` 属性为处于拖拽中跟随鼠标的节点添加样式
 * en - Drag Style
 *    -- Set the `dragImageStyle` property to add style to the node that follows the mouse during dragging
 */

import { useState } from 'react';
import { Tree } from 'shineout';
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
      <Tree
        dragImageStyle={{ background: 'pink', border: '2px dashed red' }}
        line={false}
        data={data}
        keygen='id'
        renderItem={renderItem}
        onDrop={handleDrag}
      ></Tree>
    </div>
  );
};
