/**
 * cn - 可展开受控
 *    -- 受控,当传入一个expandKeys时,展开会变成受控的,需要自行在column里面的onClick去处理
 * en -
 *    -- When an expandKeys is provided, the expansion becomes controlled and needs to be processed by the onClick in the column
 */
import React, { useState } from 'react';
import { Table, Checkbox, TYPE } from 'shineout';
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

const data: TableRowData[] = user.fetchSync(5);

const App: React.FC = () => {
  const [expandKeys, setExpandKeys] = useState([1]);

  const columns: TableColumnItem[] = [
    { title: 'id', render: 'id', width: 50 },
    {
      type: 'expand',
      onClick: (d, isExpand) => {
        if (isExpand) setExpandKeys([...expandKeys, d.id]);
        else setExpandKeys(expandKeys.filter((k) => k !== d.id));
      },
      render: (d) => {
        if (d.id > 5) return undefined;
        return () => (
          <div style={{ padding: '8px 12px', wordBreak: 'break-all' }}>{JSON.stringify(d)}</div>
        );
      },
    },
    { title: 'Name', render: (d) => `${d.firstName} ${d.lastName}` },
    { title: 'Office', render: 'office' },
    { title: 'Start Date', render: 'start' },
    {
      title: 'Salary($)',
      align: 'right',
      render: (d) => `${d.salary.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1,')}`,
    },
  ];

  return (
    <div>
      <Checkbox.Group
        style={{ marginBottom: 24 }}
        keygen='id'
        value={expandKeys}
        onChange={setExpandKeys}
      >
        {[1, 2, 3, 4, 5].map((d) => (
          <Checkbox key={d} htmlValue={d}>{`展开第 ${d} 行`}</Checkbox>
        ))}
      </Checkbox.Group>

      <Table
        expandKeys={expandKeys}
        data={data}
        keygen='id'
        style={{ height: 300 }}
        columns={columns}
      />
    </div>
  );
};

export default App;
