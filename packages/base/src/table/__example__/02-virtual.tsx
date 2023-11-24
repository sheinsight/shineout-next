/**
 * cn - 虚拟列表
 *    --
 * en - virtual
 *    --
 */
import React from 'react';
import { Table } from '@sheinx/base';
import { useTableStyle, useRadioStyle, useCheckboxStyle } from '@sheinx/shineout-style';

const jssStyle = {
  table: useTableStyle,
  radio: useRadioStyle,
  checkbox: useCheckboxStyle,
};

let maxChild = 0;

const mockData = (i: number) => {
  const childNum = Math.floor(Math.random() * 100);
  const item = {
    id: i,
    name: `Edward King Edward King Edward King Edward King ${i}`,
    age: Math.floor(Math.random() * 100),
    address: `London, Park Lane no. ${i}`,
    sex: i % 2 === 0 ? 'man' : 'femail',
    height: Math.floor(Math.random() * 50),
    children: [] as any[],
  };
  if (maxChild < 10) {
    maxChild++;
    item.children = Array.from({ length: childNum }).map((_, j) => mockData(j));
  }
  return item;
};
// mock 1000 rows 学生数据
const data = Array(10000)
  .fill(0)
  .map((_, i) => ({
    ...mockData(i),
  }));

const columns = [
  // {
  //   type: 'checkbox',
  //   width: 20,
  // },
  // {
  //   type: 'expand',
  //   width: 20,
  //   render: () => () => {
  //     return <div style={{ padding: '12px' }}>123213</div>;
  //   },
  // },
  {
    title: 'ID2',
    render: 'id',
    width: 40,
  },
  {
    title: 'age2',
    render: (d) => <div style={{ background: '#ccc', height: d.height }}>{d.age}</div>,
    width: 40,
  },
  {
    title: 'age',
    render: 'age',
    width: 40,
    rowSpan: (data: any, nextData: any) => data.age === nextData.age,
    colSpan: (data: any) => {
      return data.age % 2 === 0 ? 2 : 1;
    },
  },
  {
    title: 'Name',
    render: 'name',
    width: 80,
  },
  {
    title: 'Age',
    render: 'age',
    width: 100,
  },
  {
    title: 'Address',
    render: 'address',
    width: 100,
  },
  {
    title: 'Sex',
    render: 'sex',
    width: 50,
    // fixed: 'right',
  },
];

export default () => {
  return (
    <div>
      <Table
        sticky={{ top: 180 }}
        // width={1200}
        style={{ height: '500px' }}
        keygen='id'
        fixed
        jssStyle={jssStyle}
        data={data}
        format={'id'}
        columns={columns}
      />
    </div>
  );
};
