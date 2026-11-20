import { Breadcrumb, message } from 'antd-v5';
import { makeBaseData, toAntdItems } from '../_shared/data';

const notify = (text: string) => message.info(text);
const items = toAntdItems(makeBaseData(notify));

export default function Demo() {
  return (
    <div>
      <Breadcrumb items={items} style={{ fontSize: 12 }} />
      <Breadcrumb items={items} style={{ fontSize: 14, marginTop: 24 }} />
      <Breadcrumb items={items} style={{ fontSize: 16, marginTop: 24 }} />
    </div>
  );
}
