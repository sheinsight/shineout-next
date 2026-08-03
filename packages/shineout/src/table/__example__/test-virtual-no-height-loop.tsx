/**
 * cn - 【Bug复现】virtual 无固定高度死循环
 *    -- 复现：virtual=true 且未设置 height，父容器无固定高度，异步设置 data 后出现滚动条反复出现/消失的抖动
 * en - [Bug Repro] virtual scrollbar infinite loop without fixed height
 *    -- Repro: virtual=true without height prop, parent has no fixed height, async data causes scrollbar flickering
 */
import React, { useEffect } from 'react';
import { Table, TYPE } from 'shineout';

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

const baseRow = {
  time: '01:42',
  start: '2012-01-29',
  salary: 115777,
  country: 'China',
  office: 'Shanghai',
  office5: 'Beijing',
  height: 170,
  firstName: 'Test',
  lastName: 'User',
  position: 'Developer',
};

const data5: TableRowData[] = Array.from({ length: 5 }, (_, i) => ({
  ...baseRow,
  id: i + 1,
  firstName: `User${i + 1}`,
}));

const data50: TableRowData[] = Array.from({ length: 50 }, (_, i) => ({
  ...baseRow,
  id: i + 1,
  firstName: `User${i + 1}`,
}));

const columns: TableColumnItem[] = [
  { title: 'ID', render: 'id', width: 60 },
  { title: 'Name', render: (d) => `${d.firstName} ${d.lastName}` },
  { title: 'Country', render: 'country' },
  { title: 'Position', render: 'position' },
  { title: 'Office', render: 'office' },
];

export default () => {
  const [tableData1, setTableData1] = React.useState<TableRowData[]>([]);
  const [tableData2, setTableData2] = React.useState<TableRowData[]>([]);
  const [tableData3, setTableData3] = React.useState<TableRowData[]>([]);
  const [tableData4, setTableData4] = React.useState<TableRowData[]>(data5);

  useEffect(() => {
    const timer = setTimeout(() => {
      setTableData1(data50);
      setTableData2(data50);
      setTableData3(data50);
      setTableData4(data50);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div>
      <h3>场景1: 父容器无固定高度 (无 flex) — 应 fallback 全量渲染</h3>
      <div style={{ border: '2px solid red', padding: 8 }}>
        <p style={{ margin: '0 0 8px' }}>
          1 秒后加载数据，观察是否抖动（无限增长 / paddingTop 跳变）
        </p>
        <Table
          keygen='id'
          columns={columns}
          data={tableData1}
          virtual
        />
      </div>

      <h3 style={{marginTop: 20}}>场景2: 父容器 flex 无固定高度 — 应 fallback 全量渲染</h3>
      <div style={{ border: '2px solid blue', padding: 8, display: 'flex', flexDirection: 'column' }}>
        <p style={{ margin: '0 0 8px' }}>
          观察这里是否抖动
        </p>
        <Table
          keygen='id'
          columns={columns}
          data={tableData2}
          virtual
        />
      </div>

      <h3 style={{marginTop: 20}}>场景3: 父容器有固定高度 (对照组) — 应正常虚拟滚动</h3>
      <div style={{ border: '2px solid green', padding: 8, height: 400, display: 'flex', flexDirection: 'column' }}>
        <p style={{ margin: '0 0 8px' }}>
          这个应该正常不抖动，且有虚拟滚动
        </p>
        <Table
          keygen='id'
          columns={columns}
          data={tableData3}
          virtual
        />
      </div>

      <h3 style={{marginTop: 20}}>场景4: maxHeight + 初始5条 → 异步加载50条 — 虚拟列表必须正常工作</h3>
      <div style={{ border: '2px solid orange', padding: 8 }}>
        <p style={{ margin: '0 0 8px' }}>
          初始5条数据，1秒后变50条。虚拟列表应正常启用（有滚动条，DOM中只渲染约20行）
        </p>
        <Table
          keygen='id'
          columns={columns}
          data={tableData4}
          virtual
          style={{ maxHeight: 400 }}
        />
      </div>
    </div>
  );
};
