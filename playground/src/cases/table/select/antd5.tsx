import { useState } from 'react';
import { Table } from 'antd-v5';
import { useBenchState } from '../../../core/define';
import { fullName, makePeople, type Person } from '../_shared/data';

const DATA = makePeople(20);

const columns = [
  { title: 'id', dataIndex: 'id', width: 60 },
  { title: 'Name', render: (_: unknown, d: Person) => fullName(d), width: 160 },
  { title: 'Position', dataIndex: 'position' },
  { title: 'Office', dataIndex: 'office' },
];

export default function Demo() {
  const [selected, setSelected] = useState<Person[]>([DATA[2]]);
  useBenchState({ selected: selected.length });
  return (
    <div>
      <Table
        dataSource={DATA}
        rowKey='id'
        columns={columns}
        pagination={false}
        scroll={{ y: 300 }}
        rowSelection={{ selectedRowKeys: selected.map((v) => v.id), onChange: (_, rows) => setSelected(rows) }}
      />
      <div style={{ marginTop: 24, fontSize: 14 }}>{`selected rows: [${selected.map((v) => v.id).join(', ')}]`}</div>
    </div>
  );
}
