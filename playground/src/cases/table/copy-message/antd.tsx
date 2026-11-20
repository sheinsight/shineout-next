import { Button, Table, message } from 'antd';
import { renderActions, renderPrice, renderProduct, renderSkc, renderStock, renderTime } from './cells';
import { copyAndNotify, DATA, MESSAGE_DURATION, type RowData } from './shared';

const notify = (content: string) => message.success(content, MESSAGE_DURATION);

const columns: any[] = [
  {
    title: '商品信息',
    width: 340,
    fixed: 'left',
    render: (_: unknown, d: RowData) =>
      renderProduct(d, (text) => (
        <Button size='small' type='link' onClick={() => copyAndNotify(text, notify)}>
          复制
        </Button>
      )),
  },
  { title: 'SKC', width: 300, render: (_: unknown, d: RowData) => renderSkc(d) },
  { title: '销售价', width: 120, render: (_: unknown, d: RowData) => renderPrice(d) },
  { title: '库存', width: 120, render: (_: unknown, d: RowData) => renderStock(d) },
  { title: '更新时间', width: 180, render: (_: unknown, d: RowData) => renderTime(d) },
  { title: '操作', width: 200, fixed: 'right', render: () => renderActions() },
];

// antd 的 Table 默认每页 10 行，必须关掉分页，才和其它库渲染同样多的行
export default function Demo() {
  return (
    <Table
      rowKey='id'
      bordered
      pagination={false}
      dataSource={DATA}
      columns={columns}
      scroll={{ x: 1300 }}
      sticky
    />
  );
}
