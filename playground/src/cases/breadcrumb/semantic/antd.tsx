import { Breadcrumb } from 'antd';
import { toAntdItems } from '../_shared/data';

const data = [
  { title: 'Home', url: '#' },
  [
    { title: 'Products', url: '#' },
    { title: 'Services', url: '#' },
    { title: 'Solutions', url: '#' },
  ],
  { title: 'Category', url: '#' },
  { title: 'Detail' },
];
const items = toAntdItems(data);

// antd 6 只有 root / item / separator，Shineout 的 content / dropdown / dropdownItem 没有对应节点，
// 这里只放 antd 有的节点，不做强行对应
export default function Demo() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <Breadcrumb
        items={items}
        classNames={{ root: 'my-breadcrumb' }}
        styles={{ separator: { margin: '0 8px', color: '#999' } }}
      />
      <Breadcrumb
        items={items}
        styles={{
          root: { padding: '8px 16px', background: '#f5f5f5', borderRadius: 4 },
          item: { fontSize: 14 },
        }}
      />
    </div>
  );
}
