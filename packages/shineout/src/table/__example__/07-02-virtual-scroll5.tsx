/**
 * cn -
 *    -- 当遇到渲染性能问题时，可设置 `virtual="lazy"` 属性为一个函数，返回值为 false 时，表示该单元格不需要更新，
 * en -
 *    -- When encountering rendering performance issues, you can set the `virtual="lazy"` property to a function. If the return value is false, it means that the cell does not need to be updated.
 */
import React, { useState } from 'react';
import { Input, Table, TYPE } from 'shineout';
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

const data: TableRowData[] = user.fetchSync(1000);

const App: React.FC = () => {
  const [inputValue, setInputValue] = useState<string | undefined>();

  const columns: TableColumnItem[] = [
    { title: 'id', render: 'id', width: 80 },
    {
      title: 'Name',
      fixed: 'left',
      render: (d) => (
        <div id={`name_${d.id}`} style={{ height: d.height }}>
          {`${d.firstName} ${d.lastName}`}
        </div>
      ),
      width: 160,
    },
    {
      title: 'Country',
      //  style: { background: 'red' },
      render: (d) => (
        <div>
          {d.country}
          <Input value={inputValue} onChange={setInputValue} width={100} />
        </div>
      ),
    },
    { title: 'Position', render: 'position' },
    { title: 'Office', render: 'office' },
    { title: 'Start Date', render: 'start', width: 140 },
  ];

  return (
    <div>
      <Table
        keygen='id'
        bordered
        data={data}
        virtual="lazy"
        width={1400}
        columns={columns}
        style={{ height: 500 }}
      />
    </div>
  );
};

export default App;
