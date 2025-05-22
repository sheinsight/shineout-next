/**
 * cn - 尺寸
 *    -- 设置 `size` 属性，设置组件的尺寸
 * en - Size
 *    -- Set the `size` property to set the size of the component
 */
import React from 'react';
import { Radio, Switch, Tree, TYPE } from 'shineout';
type TreeProps = TYPE.Tree.Props<DataItem, string[]>;

interface DataItem {
  id: string;
  children?: DataItem[];
}

export default () => {
  const data: DataItem[] = [
    {
      id: '0',
      children: [
        {
          id: '0-0',
          children: [
            {
              id: '0-0-0',
              children: [
                {
                  id: '0-0-0-0',
                },
                {
                  id: '0-0-0-1',
                },
              ],
            },
            {
              id: '0-0-1',
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

  const [size, setSize] = React.useState<'small' | 'default' | 'large'>('large');

  return (
    <div>
      <div style={{ marginBottom: 12 }}>
        <Radio.Group keygen data={['small', 'default', 'large']} value={size} onChange={setSize} />
      </div>
      <Tree data={data} keygen='id' line={false} renderItem={renderItem} size={size} defaultExpandAll

      value={[]}
      onChange={(v) => console.log(v)}
      />
    </div>
  );
};
