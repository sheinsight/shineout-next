/**
 * cn - 行内元素点击
 *    -- 设置 `rowClickAttr`，可以使行内元素的点击事件触发 `onRowClick`
 * en - Base
 *    -- Set the `rowClickAttr` to trigger an `onRowClick` event for an element
 */
import React, { useState } from 'react';
import { Table, Radio, Gap, Link, TYPE } from 'shineout';
import { user } from '@sheinx/mock';

interface TableRowData {
  id: number;
  time: string;
  start: string;
  height: number;
  salary: number;
  office: string;
  country: string;
  office5: string;
  position: string;
  lastName: string;
  firstName: string;
}

type TableColumnItem = TYPE.Table.ColumnItem<TableRowData>;

const dataList = user.fetchSync(4);

const columns: TableColumnItem[] = [
  { title: 'id', render: 'id', width: 50 },
  { title: 'Name', render: (d) => `${d.firstName} ${d.lastName}` },
  { title: 'Country', render: 'country' },
  { title: 'Position', render: 'position' },
  {
    title: 'Operation',
    render: () => (
      <Gap>
        <Link data-info size='small'>
          <span data-info>info</span>
        </Link>
        &nbsp;
        <Link data-call type='primary' size='small'>
          <span data-call>call</span>
        </Link>
      </Gap>
    ),
  },
];

const App: React.FC = () => {
  const [count, setCount] = useState(0);
  const [attrs, setAttrs] = useState(['*']);

  const handleClick = () => setCount(count + 1);

  const handleChange = (v: string[]) => setAttrs(v);

  return (
    <div>
      <Table
        rowClickAttr={attrs}
        onRowClick={handleClick}
        keygen='id'
        columns={columns}
        data={dataList}
      />
      <div style={{ marginTop: 12, fontSize: 14, lineHeight: '22px' }}>
        <span>rowClickAttr：</span>
        <Radio.Group
          keygen
          value={attrs}
          onChange={handleChange}
          data={['data-info', 'data-call', '*']}
          style={{ display: 'inline-block', verticalAlign: 'middle' }}
        />
      </div>
      <div style={{ fontSize: 14 }}>
        <span>onRowClick call count： </span>
        <span>{count}</span>
      </div>
    </div>
  );
};
export default App;
