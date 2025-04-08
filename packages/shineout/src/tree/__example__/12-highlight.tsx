/**
 * cn - 点击高亮
 *    -- 设置 `highlight` 属性后在点击节点时高亮
 * en - Highlight
 *    -- Set the `highlight` property to highlight the node when clicked
 */

import { Tree, TYPE } from 'shineout';
import { createNestedArray } from './utils';

type TreeProps = TYPE.Tree.Props<DataItem, string[]>;

interface DataItem {
  id: string;
  children?: DataItem[];
}

export default () => {
  const data: DataItem[] = createNestedArray([5, 1, 1]);

  const renderItem: TreeProps['renderItem'] = (node) => `node ${node.id}`;

  return (
    <Tree line={false} highlight data={data} keygen='id' renderItem={renderItem} />
  );
};
