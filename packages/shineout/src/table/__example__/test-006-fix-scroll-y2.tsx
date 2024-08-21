/**
 * cn - 合并行的虚拟滚动2
 *    -- 修复表格滚动
 * en - fix-table-scroll2
 *    -- fix table scroll
 */
import React, { useEffect, useState } from 'react';
import { Button, Form, Input, Table, Tag, TYPE } from 'shineout';
import cls from 'classnames';
import testData from './test-data';

function t(v){
  return v
}

function orderRow(a: any, b: any) {
  return a.orderId === b.orderId;
}


type TableColumnItem = TYPE.Table.ColumnItem<any>;

const data = testData
const columns: TableColumnItem[] = [
  {
    type: 'checkbox',
    rowSpan: orderRow,
    fixed: 'left',
  },
  {
    title: '序号',
    width: 100,
    render: (row, index) => index + 1,
  },
  {
    title: t('履约提醒'),
    width: 200,
    rowSpan: orderRow,
    fixed: 'left',
    render: (row) => (
      <div className='pr-2 relative'>
        <strong style={{color: 'red'}}>{row.skcName}</strong>
        <p>建议预约2024-07-03 09:26:16前上门取件</p>
        <p>要求实际2024-07-03 11:56:16前完成取件</p>
      </div>
    ),
    keygen: '履约提醒',
    group: `${t('基本信息')} (${t('订单数')}: ${86 ?? 0})`,
    groupKeygen: t('基本信息'),
  },
  {
    title: (
      <div className='flex justify-between'>
        <span>{t('订单基本信息')}</span>
      </div>
    ),
    rowSpan: orderRow,
    width: 200,
    render: (row: any) => {
      return <div>
        <div style={{backgroundImage: `url("${row?.goods?.imgPath}")`, width: 100, height: 122}}></div>
        <Tag type="info">入库结算</Tag>
      </div>
    },
    keygen: t('订单基本信息'),
    group: `${t('基本信息')} (${t('订单数')}: ${86 ?? 0})`,
    groupKeygen: t('基本信息'),
  },
  {
    title: 'SKU',
    width: 180,
    render: (row) => 'SKU',
    group: t('商品信息'),
  },
  {
    title: t('属性集'),
    width: 180,
    render: 'suffixZh',
    group: t('商品信息'),
    ellipsis: {
      rows: 2,
    },
  },
  {
    title: t('单价'),
    width: 180,
    group: t('商品信息'),
    render: (row) => [row.currencyCode, row.supplyPrice].filter(Boolean).join(' '),
    keygen: t('单价'),
  },
  {
    title: t('发票状态'),
    width: 180,
    render: (row) => (
      <span
        className={cls({ ['text-danger cursor-pointer']: [0, 4, 6].includes(row.billState!) })}
      >
        {row.billStateName}
      </span>
    ),
    group: t('商品信息'),
  },
  {
    title: t('保质期(天)'),
    width: 180,
    render: (row) =>
      row?.lifeDays ? <span>{row.lifeDays}</span> : row.isSummary ? '-' : t('无保质期信息'),
    group: t('商品信息'),
  },
  {
    title: t('生产批次号信息'),
    width: 180,
    render: (row) => {
      return (
        <a
          className='underline text-primary'
        >
          {row?.orderProductDetailID ? t('查看明细') : t('请填写')}
        </a>
      );
    },
    group: t('商品信息'),
  },
  {
    title: t('订单标签'),
    rowSpan: orderRow,
    width: 120,
    render: () => '订单标签',
    group: t('履约信息'),
  },
  {
    title: t('下单信息'),
    rowSpan: orderRow,
    render: () => t('下单信息'),
    width: 1000,
    group: t('履约信息'),
  },
  {
    title: '下单数量',
    width: 150,
    render: (row) => '下单数量',
    group: t('履约信息'),
  },
];


const App: React.FC = () => {
const [table, setTable] = useState<any>();

const [state, setState] = useState({
  index: 25,
});

const handleScroll = () => {
  if (table)
    table.scrollToIndex(state.index - 1, () => {
      const el: HTMLElement = document.querySelector(`#name_${state.index}`)!;
      if (el) {
        el.style.color = 'red';
      }
    });
};

const handleIndexChange = ({ index }: { index: number }) => {
  setState({ index });
};

useEffect(() => {
  setTimeout(handleScroll);
}, [state]);

return (
  <div>
    <Form style={{ marginBottom: 24 }} defaultValue={state} inline onSubmit={handleIndexChange}>
      <Input.Number min={1} max={10000} width={100} name='index' />
      <Button type='primary' htmlType='submit'>
        Scroll
      </Button>
      <strong>表格数据总条数：{data.length}</strong>
    </Form>

    <div style={{height: 400}}>
      <Table
        tableRef={(t) => setTable(t)}
        bordered
        height="100%"
        data={data}
        keygen={(item, index:number) => `${item.id}-${index}`}
        columns={columns}
        width={columns.reduce((a, b) => a + (b.width as number), 50)}
        virtual
      />
    </div>
  </div>
);
};

// 加起来
function sum(arr){
  return arr.reduce((a, b) => a + b, 0)
}

export default App;
