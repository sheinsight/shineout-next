import { Button, Message, Table } from 'shineout-v3';
import { renderActions, renderPrice, renderProduct, renderSkc, renderStock, renderTime } from './cells';
import { copyAndNotify, DATA, MESSAGE_DURATION, type RowData } from './shared';

const notify = (content: string) => Message.success(content, MESSAGE_DURATION);

const columns: any[] = [
  {
    title: '商品信息',
    width: 340,
    fixed: 'left',
    render: (d: RowData) =>
      renderProduct(d, (text) => (
        <Button size='small' mode='text' type='primary' onClick={() => copyAndNotify(text, notify)}>
          复制
        </Button>
      )),
  },
  { title: 'SKC', width: 300, render: renderSkc },
  { title: '销售价', width: 120, render: renderPrice },
  { title: '库存', width: 120, render: renderStock },
  { title: '更新时间', width: 180, render: renderTime },
  { title: '操作', width: 200, fixed: 'right', render: renderActions },
];

export default function Demo() {
  return <Table keygen='id' bordered width={1300} data={DATA} columns={columns} sticky={{ top: 0, css: true }} />;
}
