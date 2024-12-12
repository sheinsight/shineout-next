/**
 * cn - 特殊合并行数据
 *    -- 修复表格滚动
 * en - fix-table-scroll2
 *    -- fix table scroll
 */
import React, { useEffect, useState } from 'react';
import { Button, Form, Input, Table, TYPE } from 'shineout';
import testData from './test-data-online';

function t(v) {
  return v;
}

type OrderRowItem = any;

function orderRow(a: OrderRowItem, b: OrderRowItem, mergeSummary = false) {
  return mergeSummary
    ? a.orderId === b.orderId
    : a.orderId === b.orderId && !a.isSummary && !b.isSummary;
}

type TableColumnItem = TYPE.Table.ColumnItem<any>;

// 取第10条到第23条
const data = testData;
const specIndex = data.findIndex((item) => item.sellerOrderNo === 'PB2411200000029');
const columns: TableColumnItem[] = [
  {
    type: 'checkbox',
    rowSpan: (a, b) => orderRow(a, b, true),
    // fixed: isPartiallyStockToShein ? undefined : 'left',
  },
  {
    title: t('履约提醒'),
    width: 245,
    rowSpan: (a, b) => orderRow(a, b, true),
    fixed: 'left',
    // hidden: isPartiallyStockToShein,
    render: (row, index) => index,
    keygen: t('履约提醒'),
    group: `${t('基本信息')} (${t('订单数')}: ${testData.length ?? 0})`,
    groupKeygen: t('基本信息'),
  },
  {
    title: '订单基本信息',
    width: 230,
    fixed: 'left',
    rowSpan: (a, b) => orderRow(a, b, true),
    render: (row) => (
      <div style={{ background: '#ccc', borderRadius: 8, height: 300 }}>{row.sellerOrderNo}</div>
    ),
    keygen: t('订单基本信息'),
    group: `${t('基本信息')} (${t('订单数')}:${testData.length ?? 0})`,
    groupKeygen: t('基本信息'),
  },
  {
    title: 'SKU',
    width: 180,
    render: 'sellerOrderNo',
    group: t('商品信息'),
    colSpan: (row) => (row.isSummary ? 2 : 1),
  },
  {
    title: t('属性集'),
    render: 'suffixZh',
    group: t('商品信息'),
    width: 90,
  },
  {
    title: '单价',
    group: t('商品信息'),
    render: (row) => {
      // if (row.isSummary) {
      //   return '';
      // }
      // return [row.currencyCode, row.supplyPrice].filter(Boolean).join(' ');
      return '单价';
    },
    // hidden: isPartiallyStockToShein,
    keygen: t('单价'),
    width: 100,
  },
  {
    title: '保质期(天)',
    render: (row) => '保质期(天)',
    group: t('商品信息'),
    // hidden: showShelfLifeInfo === BOOLEAN_TYPE.FALSE,
  },
  {
    title: '生产批次号信息',
    render: (row) => '生产批次号信息',
    group: t('商品信息'),
    // hidden: showShelfLifeInfo === BOOLEAN_TYPE.FALSE,
  },
  {
    title: t('订单标签'),
    rowSpan: orderRow,
    width: 200,
    render: (row) => (
      <div style={{ display: 'grid', gap: '2px 12px', gridTemplateColumns: 'repeat(1, 1fr)' }}>
        <div className="items-start" style={{ gridColumn: 'span 1' }}>
          <span className="text-neutral-6">
            平台收货仓库<span className="px-1">:</span>
          </span>
          <span className="flex-1 break-all inline-block">佛山仓</span>
        </div>
        <div className="items-start" style={{ gridColumn: 'span 1' }}>
          <span className="text-neutral-6">
            下单时间<span className="px-1">:</span>
          </span>
          <span className="flex-1 break-all inline-block">2024-11-06 06:29:21</span>
        </div>
        <div className="items-start" style={{ gridColumn: 'span 1' }}>
          <span className="text-neutral-6">
            当前耗时<span className="px-1">:</span>
          </span>
          <span className="flex-1 break-all inline-block">726</span>
        </div>
      </div>
    ),
    // hidden: isPartiallyStockToShein,
    group: t('履约信息'),
  },
  {
    title: t('下单信息'),
    sorter: 'allocateTime',
    rowSpan: orderRow,
    render: '下单信息',
    width: 160,
    group: t('履约信息'),
  },
  {
    // title: isPartiallyStockToShein ? t('下单数量') : t('下单/需求数量'),
    // headerTip: isPartiallyStockToShein
    //   ? t('下单数量：代表该订单履约实际需求数量，若订单存在发货拆单，下单数为子单的要求数量')
    //   : {
    //       tip: (
    //         <div className='p-2'>
    //           <div>
    //             {t(
    //               '需求数量：代表该订单履约原始需求数量，若订单存在发货拆单，需求数为母单的要求数量',
    //             )}
    //           </div>
    //           <div>
    //             {t(
    //               '下单数量：代表该订单履约实际需求数量，若订单存在发货拆单，下单数为子单的要求数量',
    //             )}
    //           </div>
    //         </div>
    //       ),
    //     },
    width: 150,
    render: (row) => '下单数量',
    group: t('履约信息'),
  },
  {
    title: t('发货信息'),
    rowSpan: orderRow,
    width: 160,
    render: (row) => '发货信息',
    group: t('履约信息'),
  },
  {
    title: t('送货/正品/次品/上架'),
    width: 140,
    render: (row) => '送货/正品/次品/上架',
    group: t('履约信息'),
    // headerTip: {
    //   tip: <SkuCountHeadTip />,
    // },
  },
  {
    title: t('送仓预约信息'),
    width: 120,
    rowSpan: orderRow,
    render: (row) => {
      // if (!US_WAREHOUSE_IDS.includes(row.storageId || 0)) {
      //   return '-';
      // }
      // // 订单状态是待发货/已退货/已作废的，该列展示为-；
      // if (
      //   [ORDER_STATUS.ORDERED, ORDER_STATUS.RETURNED, ORDER_STATUS.VOIDED].includes(row.state)
      // ) {
      //   return '-';
      // }
      // // 订单状态是已送货的，发货订单表的预约单号为空的
      // if ([ORDER_STATUS.SHIPPING].includes(row.state) && !row.reservationInfo.reservationNo) {
      //   return t('未预约');
      // }
      // // 订单状态是已收货/已完成/已上架 发货订单表的预约单号空
      // if (
      //   [ORDER_STATUS.RECEIVED, ORDER_STATUS.COMPLETED, ORDER_STATUS.ON_SHELVES].includes(
      //     row.state,
      //   ) &&
      //   !row.reservationInfo.reservationNo
      // ) {
      //   return t('无预约直接送仓');
      // }
      // // “已送货/已收货/已完成/已上架”，发货订单表的预约单号有值的
      // if (
      //   [
      //     ORDER_STATUS.SHIPPING,
      //     ORDER_STATUS.RECEIVED,
      //     ORDER_STATUS.COMPLETED,
      //     ORDER_STATUS.ON_SHELVES,
      //   ].includes(row.state) &&
      //   row.reservationInfo.reservationNo
      // ) {
      //   return (
      //     <div>
      //       <div>
      //         <span>{t('预约单号')}：</span>
      //         {row.reservationInfo.reservationNo}
      //       </div>
      //       <div>
      //         <Tag color='warning'>{row.reservationInfo.reservationStatusName}</Tag>
      //       </div>
      //     </div>
      //   );
      // }
      return '送仓预约信息';
    },
    group: t('履约信息'),
    // hidden: isAllowEditDeliveryNum,
  },
  {
    title: t('有无风险'),
    width: 100,
    // headerTip: t('灯亮起表示该SKC存在风险，请点击跳转至商品质量优化列表查看具体风险。'),
    // hidden: isPartiallyStockToShein,
    rowSpan: orderRow,
    render: (row) => '有无风险',
    group: t('质量信息'),
  },
  {
    title: t('售前异常'),
    // hidden: isPartiallyStockToShein,
    rowSpan: orderRow,
    render: (row) => '售前异常',
    group: t('质量信息'),
  },
  {
    title: t('质检结果'),
    width: 120,
    rowSpan: orderRow,
    render: (row) => '质检结果',
    group: t('质量信息'),
    // hidden: isPartiallyStockToShein,
  },
  {
    title: t('退货信息'),
    sorter: 'returnTime',
    rowSpan: orderRow,
    render: (row) => '退货信息',
    width: 135,
    group: t('质量信息'),
    // hidden: isPartiallyStockToShein,
  },
  {
    title: t('申诉状态'),
    rowSpan: orderRow,
    render: (row) => '申诉状态',
    width: 120,
    // hidden: simplifiedPlatformCategory !== BOOLEAN_TYPE.TRUE,
  },
  {
    title: t('复议状态'),
    rowSpan: orderRow,
    render: (row) => '复议状态',
    width: 120,
    // hidden: !hasReconsiderPermission,
  },
  {
    title: t('可售天数'),
    // hidden: isPartiallyStockToShein || orderType !== ORDER_TYPE.STOCKING_UP,
    // headerTip: {
    //   tip: (
    //     <div className='p-2 w-[350px]'>
    //       <div>{t('1、可售天数 =（在途数量+库存数量）/近7天日均销量*预测系数；')}</div>
    //       <div>
    //         {t(
    //           '2、为了更准确计算可售天数，加入预测系数参与修正，预测系数是通过大数据统计多国销量情况实时变化，无固定数值提供。',
    //         )}
    //       </div>
    //     </div>
    //   ),
    // },
    render: (row) => {
      // if (
      //   typeof row?.skuExt?.inventoryAbleSaleDays === 'number' &&
      //   row?.skuExt?.inventoryAbleSaleDays !== -1
      // ) {
      //   return row?.skuExt?.inventoryAbleSaleDays;
      // }
      return '可售天数';
    },
    width: 120,
    group: t('其他信息'),
  },
  {
    title: t('商家库存'),
    render: () => '商家库存',
    width: 180,
    group: t('其他信息'),
    // hidden: isPartiallyStockToShein,
  },
  {
    title: t('库位'),
    sorter: 'location',
    rowSpan: orderRow,
    render: () => '库位',
    group: t('其他信息'),
    // ellipsis: {
    //   rows: 2,
    // },
    // hidden: isPartiallyStockToShein,
    width: 120,
  },
  {
    title: t('溯源信息'),
    width: 130,
    rowSpan: orderRow,
    // hidden: isTracingSupplier === BOOLEAN_TYPE.FALSE,
    render: (row) => '溯源信息',
    group: t('其他信息'),
  },
  {
    title: t('备注'),
    rowSpan: orderRow,
    render: 'remark',
    group: t('其他信息'),
    // ellipsis: { rows: 3 },
    width: 150,
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

        <strong>specIndex: {specIndex}</strong>
      </Form>

      <div style={{ height: 500 }}>
        <Table
          tableRef={(t) => setTable(t)}
          height='100%'
          style={{ width: '100%' }}
          data={data}
          keygen={(item, index: number) => `${item.orderId}-${index}`}
          columns={columns}
          width={3480}
          rowHeight={120}
          hover={false}
          virtual
          bordered
          rowsInView={20}
        />
      </div>
    </div>
  );
};

export default App;
