import { Breadcrumb, message } from 'antd-v5';
import { makeBaseData, toAntdItems } from '../_shared/data';

const notify = (text: string) => message.info(text);
const items = toAntdItems(makeBaseData(notify));

export default function Demo() {
  return <Breadcrumb items={items} />;
}
