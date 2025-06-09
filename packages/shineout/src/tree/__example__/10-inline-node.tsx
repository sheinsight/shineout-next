/**
 * cn - 节点非占满一行
 *    -- 设置 `inlineNode` 属性可以让节点不占满整行（鼠标移动至节点上查看效果）。
 * en - Inline node
 *    -- Set the `inlineNode` property to make the node not occupy the entire row
 */

import { useState } from 'react';
import { Tree, Switch, TYPE } from 'shineout';
type TreeProps = TYPE.Tree.Props<DataItem, string[]>;

interface DataItem {
  id: string;
  children?: DataItem[];
}

export default () => {
  const [inlineNode, setInlineNode] = useState(true);
  const data = [
    {
      id: '0',
      children: [
        {
          id: '0-0',
          children: [
            {
              id: '0-0-0',
            },
            {
              id: '0-0-1',
              children: [
                {
                  id: '0-0-1-0',
                },
              ],
            },
          ],
        },
        {
          id: '0-1',
          children: [
            {
              id: '0-1-0',
            },
          ],
        },
      ],
    },
    {
      id: '1',
      children: [
        {
          id: '1-0',
          children: [
            {
              id: '1-0-0',
            },
            {
              id: '1-0-1',
              children: [
                {
                  id: '1-0-1-0',
                },
              ],
            },
          ],
        },
        {
          id: '1-1',
          children: [
            {
              id: '1-1-0',
            },
          ],
        },
      ],
    },
  ];

  const renderItem: TreeProps['renderItem'] = (node) => {
    return `node ${node.id}`;
  };

  return (
    <div>
      <Switch value={inlineNode} onChange={setInlineNode} style={{ marginBottom: 12 }} />
      <Tree inlineNode={inlineNode} data={data} keygen='id' renderItem={renderItem} />
    </div>
  );
};
