/**
 * cn - 外部滚动
 *    -- 设置 `virtualScrollContainer` 使虚拟列表由外部容器的滚动驱动，表格本身不产生内滚
 * en - External Scroll
 *    -- Set `virtualScrollContainer` to drive the virtual list by an external container's scroll event
 */
import React, { useRef, useState } from 'react';
import { Table, Switch, TYPE } from 'shineout';
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

const data: TableRowData[] = user.fetchSync(10000);

const columns: TableColumnItem[] = [
  { title: 'id', render: 'id', width: 80 },
  {
    title: 'Name',
    render: (d) => `${d.firstName} ${d.lastName}`,
    width: 160,
  },
  { title: 'Country', render: 'country', width: 120 },
  { title: 'Position', render: 'position' },
  { title: 'Office', render: 'office' },
  { title: 'Start Date', render: 'start', width: 140 },
];

const App: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [sticky, setSticky] = useState(false);

  return (
    <div>
      <div style={{ marginBottom: 16, display: 'flex', alignItems: 'center', gap: 8 }}>
        <span>Sticky Header:</span>
        <Switch value={sticky} onChange={setSticky} />
        <span style={{ marginLeft: 16 }}>
          下方容器高度为 500px，表格通过外部容器的滚动事件驱动虚拟列表渲染（共 10000 条数据）
        </span>
      </div>
      <div
        ref={containerRef}
        style={{
          height: 500,
          padding: 24,
          overflow: 'auto',
          border: '1px solid #e8e8e8',
          backgroundImage: 'linear-gradient(45deg, #f0f0f0 25%, transparent 25%, transparent 75%, #f0f0f0 75%), linear-gradient(45deg, #f0f0f0 25%, transparent 25%, transparent 75%, #f0f0f0 75%)',
          backgroundSize: '20px 20px',
          backgroundPosition: '0 0, 10px 10px',
          overscrollBehavior: 'none',
        }}
      >
        <Table
          keygen='id'
          bordered
          data={data}
          sticky={sticky}
          width={1400}
          rowsInView={20}
          columns={columns}
          virtualScrollContainer={() => containerRef.current}
        />
      </div>
    </div>
  );
};

export default App;
