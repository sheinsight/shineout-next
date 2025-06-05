/**
 * cn - 过滤数据（本地）
 *    -- 设置`onFilter`属性且返回内容为函数时，会根据返回的过滤函数对本地数据进行过滤
 *    -- 如果`onFilter`不返回函数，可根据输入内容自行进行远程查询数据
 * en - Filter data (local)
 *    -- Set the `onFilter` property and return the content as a function, the local data will be filtered according to the returned filter function
 */
import React, { useState } from 'react';
import { Form, Switch, TreeSelect, TYPE } from 'shineout';

interface DataItem {
  id: string;
  title: string;
  children?: DataItem[];
}

type TreeSelectProps = TYPE.TreeSelect.Props<DataItem, string>;

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
  const [value, setValue] = useState<TreeSelectProps['value']>('');
  const [highlight, setHighlight] = useState(true);

  const handleFilter = (text: string) => (d: DataItem) => `node ${d.title}`.indexOf(text) > -1;

  const handleChange: TreeSelectProps['onChange'] = (v) => {
    setValue(v);
  };

  return (
    <div>
      <Form>
        <Form.Item label='高亮关键字' labelWidth={72}>
          <Switch value={highlight} onChange={setHighlight} />
        </Form.Item>
      </Form>

      <TreeSelect
        width={300}
        multiple
        onFilter={handleFilter}
        mode={1}
        value={value}
        onChange={handleChange}
        clearable
        keygen='id'
        renderItem={(node) => `node ${node?.title}`}
        data={data}
        placeholder='Please select content'
        highlight={highlight}
      />
    </div>
  );
};
