/**
 * cn - virtual=lazy
 *    -- virtual=lazy 在Table滚动期间不触发rerender
 * en - virtual=lazy
 *    -- virtual=lazy does not trigger rerender during Table scrolling
 */
import React, { useState } from 'react';
import { Input, Table, TYPE, Button } from 'shineout';
import { user } from '@sheinx/mock';
import TreeSelectExample from '../../tree-select/__example__/10-virtual';

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
  [k: string]: any;
}

type TableColumnItem = TYPE.Table.ColumnItem<TableRowData>;

const data: TableRowData[] = user.fetchSync(1000);

const CacheTable = () => {
  const [inputValue, setInputValue] = useState<string | undefined>('');

  const columns: TableColumnItem[] = [
    {
      type: 'checkbox',
      width: 80,
    },
    { title: 'id', render: 'id', width: 80 },
    {
      title: 'Name',
      fixed: 'left',
      render: (d) => (
        <div
          id={`name_${d.id}`}
          style={{ height: d.height }}
        >
          {`${d.firstName} ${d.lastName}`}

          <Button type="primary">test</Button>

          {/* <TreeSelectExample /> */}
        </div>
      ),
      width: 160,
    },
    { title: 'Country', render: 'country' },
    { title: 'Position', render: 'position' },

    // @ts-ignore mock 100 more columns
    ...Array.from({ length: 100 }, (_, i) => ({
      title: `Office${i}`,
      render: 'office',
      width: 100,
    })),

    {
      title: 'Office',
      render: () => (
        <div>
          <Input
            value={inputValue}
            onChange={(v) => {
              console.log('input onChange: >>', v);
              setInputValue(v);
            }}
          />
          <Button type="primary">test</Button>

          <TreeSelectExample />
        </div>
      ),
    },
    {
      title: 'Start Date',
      render: () => (
        <div>
          inputValue: {inputValue}
          {/* <Button mode='text'>test2</Button>
          <TreeSelectExample /> */}
        </div>
      ),
      fixed: 'right',
      width: 140,
    },
  ];

  return <Table
      keygen='id'
      bordered
      data={data}
      virtual="lazy"
      width={columns.reduce((a, b) => a + ((b.width || 100) as number), 0)}
      rowsInView={5}
      columns={columns}
      style={{ height: 500 }}
    />
}

const NoCacheTable = () => {

  const [inputValue, setInputValue] = useState<string | undefined>('');

  const columns: TableColumnItem[] = [
    {
      type: 'checkbox',
      width: 80,
    },
    { title: 'id', render: 'id', width: 80 },
    {
      title: 'Name',
      fixed: 'left',
      render: (d) => (
        <div
          id={`name_${d.id}`}
          style={{ height: d.height }}
        >
          {`${d.firstName} ${d.lastName}`}
          <Button type="warning">test</Button>
        </div>
      ),
      width: 160,
    },
    { title: 'Country', render: 'country' },
    { title: 'Position', render: 'position' },
    // @ts-ignore mock 100 more columns
    ...Array.from({ length: 100 }, (_, i) => ({
      title: `Office${i}`,
      render: 'office',
      width: 100,
    })),

    {
      title: 'Office',
      render: () => (
        <div>
          <Input
            value={inputValue}
            onChange={(v) => {
              console.log('======================');
              console.log('input onChange: >>', v);
              console.log('======================');
              setInputValue(v);
            }}
          />
          <Button type="primary">test</Button>

          <TreeSelectExample />
        </div>
      ),
    },
    {
      title: 'Start Date',
      render: () => (
        <div>
          inputValue: {inputValue}
          {/* <Button mode='text'>test2</Button>
          <TreeSelectExample /> */}
        </div>
      ),
      fixed: 'right',
      width: 140,
    },
  ];

  return <Table
      keygen='id'
      bordered
      data={data}
      virtual
      width={columns.reduce((a, b) => a + ((b.width || 100) as number), 0)}
      rowsInView={10}
      columns={columns}
      style={{ height: 500 }}
    />

}
const App: React.FC = () => {
  return (
    <div style={{ width: '100%', display: 'flex' }}>
      <div style={{flex: 1, minWidth: 0}}>
        <h2>CacheTable</h2>
        <CacheTable />
      </div>
      <div style={{flex: 1, minWidth: 0}}>
        <h2>NoCacheTable</h2>
        <NoCacheTable />
      </div>
    </div>
  );
};

export default App;
