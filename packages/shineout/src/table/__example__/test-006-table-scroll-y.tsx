/**
 * cn - big-row-span-data
 *    -- scroll-y-debug
 * en - scroll-y-debug
 *    -- scroll-y-debug
 */
import React from 'react';
import { Table, TYPE } from 'shineout';
import bigRowSpanData from './test-big-row-span';
// import TreeSelectExample from '../../tree-select/__example__/01-base';

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
export const transformSampleClothesRow = (rowSelected: any[]) => {
  return rowSelected.reduce((result: any[], item: any) => {
    const { designNo, realGoodsList = [], id: sampleClothesId } = item;
    const realGoods = realGoodsList.map((realGood) => {
      const { id, realGoodNo, realGoodState } = realGood;
      return {
        sampleClothesId: sampleClothesId as unknown as string,
        id: id as unknown as string,
        designNo: designNo as unknown as string,
        realGoodNo: realGoodNo || '',
        realGoodState,
      };
    });
    return result.concat(realGoods);
  }, []);
};

const newList = transformSampleClothesRow(bigRowSpanData);

// console.log({newList,list})

const columns: TableColumnItem[] = [
  {
    title: '设计款号',
    // render: 'designNo',
    render: (_, index) => {
      if (index === 39) {
        return <div style={{ height: 39 * 30, background: '#f00' }}></div>;
      }
      return index;
    },
    width: 120,
    rowSpan: (a, b) => a.sampleClothesId === b.sampleClothesId,
  },
  {
    title: '样衣码',
    render: (_, index) => index,
    // render: () => <TreeSelectExample />,
    width: 120,
  },
  { title: '当前样衣状态', render: 'lastName', width: 120 },
  {
    title: 'Start Date',
    width: 120,
    render: 'start',
  },

  {
    title: '是否移交拍摄',
    type: 'checkbox',
    minWidth: 100,
    fixed: 'right',
    render: (_, __, checkInstance) => {
      return (
        <>
          {checkInstance}
          <span style={{ marginLeft: 6 }}>{'是'}</span>
        </>
      );
    },
  },
];

const App: React.FC = () => (
  <Table
    virtual
    rowsInView={5}
    bordered
    height={360}
    data={[...newList]}
    keygen='id'
    columns={columns}
  />
);

export default App;
