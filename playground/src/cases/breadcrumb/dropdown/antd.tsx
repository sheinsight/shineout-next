import { Breadcrumb, message } from 'antd';
import { makeDropdownData, toAntdItems } from '../_shared/data';

const notify = (text: string) => message.info(text);
const items = toAntdItems(makeDropdownData(notify));

export default function Demo() {
  return <Breadcrumb items={items} />;
}
