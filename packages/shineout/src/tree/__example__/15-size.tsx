/**
 * cn - 尺寸
 *    -- 设置 `size` 属性，设置组件的尺寸
 * en - Size
 *    -- Set the `size` property to set the size of the component
 */
import React from 'react';
import { Form, Radio, Switch, Tree, TYPE } from 'shineout';
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

  const [size, setSize] = React.useState<'small' | 'default' | 'large'>('small');
  const [line, setLine] = React.useState(false);
  const [checkbox, setCheckbox] = React.useState(false);

  return (
    <div>
      <Form inline style={{ marginBottom: 12 }} colon>
        <Form.Item label='Size'>
          <Radio.Group
            keygen
            data={['small', 'default', 'large']}
            value={size}
            onChange={setSize}
          />
        </Form.Item>
        <Form.Item label='Line'>
          <Switch size='small' value={line} onChange={setLine} style={{ marginTop: 8 }} />
        </Form.Item>
        <Form.Item label='Checkbox'>
          <Switch size='small' value={checkbox} onChange={setCheckbox} style={{ marginTop: 8 }} />
        </Form.Item>
      </Form>
      <Tree
        data={data}
        keygen='id'
        renderItem={renderItem}
        size={size}
        defaultExpandAll
        line={line}
        value={checkbox ? [] : undefined}
        onChange={checkbox ? (v) => console.log(v) : undefined}
      />
    </div>
  );
};
