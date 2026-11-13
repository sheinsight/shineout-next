import { Collapse } from 'antd';
import { ArrowIcon, TEXT } from '../_shared/content';

const items = [
    {
      key: '0',
      label: 'This is panel header 1',
      children: TEXT,
      style: { background: '#F4F5F8' },
      styles: { body: { background: '#FFFFFF' } },
    },
    {
      key: '1',
      label: 'This is panel header 2',
      children: TEXT,
      style: { background: '#F4F5F8' },
      styles: { body: { background: '#FFFFFF' } },
    },
    {
      key: '2',
      label: 'This is panel header 3',
      children: TEXT, collapsible: 'disabled' as const,
      style: { background: '#F4F5F8' },
      styles: { body: { background: '#FFFFFF' } },
    },
  ];

// antd 的 expandIcon 是函数，不会自动旋转，展开时手动转 90 度
export default function Demo() {
  return (
    <Collapse
      defaultActiveKey={['1']}
      style={{ maxWidth: 1180 }}
      expandIcon={({ isActive }) => (
        <span style={{ display: 'inline-flex', transform: isActive ? 'rotate(90deg)' : undefined }}>
          <ArrowIcon />
        </span>
      )}
      items={items}
    />
  );
}
