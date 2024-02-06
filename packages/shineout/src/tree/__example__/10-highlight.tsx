/**
 * cn - 点击高亮
 *    -- 设置 `highlight` 属性后在点击节点时高亮
 * en - Highlight
 *    -- Set the `highlight` property to highlight the node when clicked.
 */

import { Tree } from 'shineout';
import { createNestedArray } from './utils';

export default () => {
  const data = createNestedArray([5, 1, 1]);

  const renderItem = (node: any) => {
    return <span style={{ display: 'inline-block' }}>{`node ${node.id}`}</span>;
  };

  return (
    <div>
      <Tree line={false} highlight data={data} keygen='id' renderItem={renderItem}></Tree>
    </div>
  );
};
