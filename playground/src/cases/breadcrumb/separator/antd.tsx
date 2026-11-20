import { Breadcrumb } from 'antd';
import { toAntdItems } from '../_shared/data';

const items = toAntdItems([{ title: 'Home', url: '/' }, { title: 'Self' }]);

export default function Demo() {
  return (
    <div>
      <Breadcrumb items={items} separator='/' style={{ marginBottom: 24 }} />
      <Breadcrumb items={items} separator={<span>{'>'}</span>} />
    </div>
  );
}
