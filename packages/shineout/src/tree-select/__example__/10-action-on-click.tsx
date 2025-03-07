/**
 * cn - 节点点击行为
 *    -- 设置 `actionOnClick` 属性可以在点击节点时触发相应的行为
 *    -- 属性说明：`check` 选中复选框，`expand` 展开/收起节点
 * en - Action on click
 *    -- Set the `actionOnClick` property to trigger the corresponding behavior when clicking the node
 *    -- Property description: `check` check the checkbox, `expand` expand/collapse the node
 */
import React, { useState } from 'react';
import { TreeSelect, Form, Checkbox, TYPE } from 'shineout';

type TreeSelectProps = TYPE.TreeSelect.Props<DataItem, string>;

interface DataItem {
  id: string;
  title: string;
  children?: DataItem[];
}

const data: DataItem[] = [
  {
    id: '1',
    title: '1',
    children: [
      {
        id: '1-1',
        title: '1-1',
        children: [
          { id: '1-1-1', title: '1-1-1' },
          { id: '1-1-2', title: '1-1-2' },
        ],
      },
      { id: '1-2', title: '1-2' },
    ],
  },
  {
    id: '2',
    title: '2',
    children: [
      { id: '2-1', title: '2-1' },
      { id: '2-2', title: '2-2' },
    ],
  },
  { id: '3', title: '3', children: [{ id: '3-1', title: '3-1' }] },
];

export default () => {
  const [value, setValue] = useState<TreeSelectProps['value']>();
  const [config, setConfig] = useState<{ actionOnClick: TreeSelectProps['actionOnClick'] }>({
      actionOnClick: ['check'],
    });

  const handleChange: TreeSelectProps['onChange'] = (v) => {
    setValue(v);
  };

  return (
    <>
      <Form value={config} onChange={setConfig}>
        <Form.Item label='配置点击行为:' labelWidth='7em' labelAlign='left'>
          <Checkbox.Group name='actionOnClick' keygen data={['check', 'expand']} />
        </Form.Item>
      </Form>
      <TreeSelect
        keygen='id'
        multiple
        value={value}
        onChange={handleChange}
        width={300}
        data={data}
        compressed
        renderItem={(node) => `node ${node.title}`}
        clearable
        actionOnClick={config.actionOnClick}
        placeholder='Please select content'
      />
    </>
  );
};
