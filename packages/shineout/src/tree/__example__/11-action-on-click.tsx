/**
 * cn - 点击行为
 *    -- 设置 `actionOnClick` 设置点击节点的行为，可以是 'expand', 'check' 或者两者都有。
 * en - Action on click
 *    -- Set `actionOnClick` to control the behavior when clicking a node, it can be 'expand', 'check', or both.
 */

import { useState } from 'react';
import { Tree, Form, Checkbox, TYPE } from 'shineout';
type TreeProps = TYPE.Tree.Props<DataItem, string[]>;

interface DataItem {
  id: string;
  children?: DataItem[];
}

export default () => {
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

  const [config, setConfig] = useState<{ actionOnClick: TreeProps['actionOnClick'] }>({
    actionOnClick: ['check'],
  });
  const [value, setValue] = useState<TreeProps['value']>([]);

  return (
    <>
      <Form value={config} onChange={setConfig}>
        <Form.Item label='配置点击行为:' labelWidth='7em' labelAlign='left'>
          <Checkbox.Group name='actionOnClick' keygen data={['check', 'expand']} />
        </Form.Item>
      </Form>
      <Tree
        data={data}
        keygen='id'
        renderItem={renderItem}
        value={value}
        onChange={setValue}
        actionOnClick={config.actionOnClick}
      />
    </>
  );
};
