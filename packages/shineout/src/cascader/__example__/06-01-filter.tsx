/**
 * cn - 过滤数据（本地）
 *    -- 设置`onFilter`属性且返回内容为函数时，会根据返回的过滤函数对本地数据进行过滤
 * en - Filter data (local)
 *    -- Set the `onFilter` property and return the content as a function, the local data will be filtered according to the returned filter function
 */
import React from 'react';
import { Cascader, Form, Switch, TYPE } from 'shineout';

type CascaderProps = TYPE.Cascader.Props<DataItem, string[]>;

interface DataItem {
  value: string;
  children?: DataItem[];
}

const data: DataItem[] = [
  {
    value: 'jiangsu',
    children: [
      {
        value: 'nanjing',
        children: [
          {
            value: 'jiangning',
          },
          {
            value: 'gulou',
          },
        ],
      },
    ],
  },
  {
    value: 'anhui',
    children: [
      {
        value: 'hefei',
        children: [
          {
            value: 'feidong',
          },
        ],
      },
    ],
  },
];

export default () => {
  const handleFilter: CascaderProps['onFilter'] = (text) => (d) => d.value.indexOf(text) >= 0;

  const renderItem: CascaderProps['renderItem'] = (n) => `${n.value}`;
  const [highlight, setHighlight] = React.useState(true);

  return (
    <div>
      <Form>
        <Form.Item label='高亮关键字' labelWidth={72}>
          <Switch value={highlight} onChange={setHighlight} />
        </Form.Item>
      </Form>
      <div style={{ display: 'flex', gap: 32 }}>
        <Cascader
          width={300}
          placeholder='Please select city'
          data={data}
          keygen='value'
          onFilter={handleFilter}
          renderItem={renderItem}
          highlight={highlight}
        />

        <Cascader
          mode={3}
          width={300}
          placeholder='Please select city'
          data={data}
          keygen='value'
          onFilter={handleFilter}
          renderItem={renderItem}
          highlight={highlight}
        />
      </div>
    </div>
  );
};
