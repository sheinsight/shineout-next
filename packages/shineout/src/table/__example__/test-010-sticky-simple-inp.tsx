/**
 * cn - Sticky Simple Table INP 对照
 *    -- Tabs 切换不同的 Table，对比 sticky 模式下 simple vs virtual 渲染路径的 INP 差异
 *    -- Tab1 使用 sticky（优化后走 simple 路径）
 *    -- Tab2 使用 sticky + rowsInView 强制 virtual 路径
 *    -- 来回切换 Tabs 观察 Chrome DevTools Performance 面板的 INP
 * en - Sticky Simple Table INP comparison
 *    -- Compare INP between simple and virtual rendering paths under sticky mode
 */
import React, { useState } from 'react';
import { Table, Tabs, TYPE } from 'shineout';
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

const data: TableRowData[] = user.fetchSync(100);

const columns: TableColumnItem[] = [
  { title: 'id', render: 'id', width: 80 },
  {
    title: 'Name',
    fixed: 'left',
    render: (d) => `${d.firstName} ${d.lastName}`,
    width: 160,
  },
  { title: 'Country', render: 'country', width: 200 },
  { title: 'Position', render: 'position' },
  { title: 'Office', render: 'office' },
  { title: 'Start Date', render: 'start', width: 140 },
  {
    title: 'Salary($)',
    align: 'right',
    width: 120,
    render: (d) => `${d.salary.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1,')}`,
  },
];

const paginationConfig = {
  pageSize: 100,
  layout: ['links', 'list'] as ('links' | 'list')[],
};

const stickyConfig = { top: 0, css: true };

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string | number>('simple');

  return (
    <div>
      <div style={{ padding: '8px 0', marginBottom: 8, fontSize: 13, color: '#666' }}>
        切换 Tab 后观察 Chrome DevTools → Performance 面板的 INP 指标。
        Tab1 走 sticky simple 路径（优化后），Tab2 走 sticky + virtual 路径（对照组）。
      </div>
      <Tabs active={activeTab} onChange={setActiveTab}>
        <Tabs.Panel id='simple' tab='Sticky Simple（优化后）'>
          <Table
            keygen='id'
            data={data}
            width={1500}
            columns={columns}
            sticky={stickyConfig}
            pagination={paginationConfig}
            bordered
          />
        </Tabs.Panel>
        <Tabs.Panel id='virtual' tab='Sticky + Virtual（对照组）'>
          <Table
            keygen='id'
            data={data}
            width={1500}
            columns={columns}
            sticky={stickyConfig}
            fixed='y'
            style={{ height: '80vh' }}
            rowsInView={20}
            pagination={paginationConfig}
            bordered
          />
        </Tabs.Panel>
        <Tabs.Panel id='simple2' tab='Sticky Simple 2（另一个表）'>
          <Table
            keygen='id'
            data={data}
            width={1500}
            columns={columns}
            sticky={stickyConfig}
            pagination={paginationConfig}
            bordered
          />
        </Tabs.Panel>
      </Tabs>
    </div>
  );
};

export default App;
