import { Button, Dropdown } from 'antd';

const items = [
  { key: 'edit', label: 'Edit' },
  { key: 'copy', label: 'Copy' },
  { key: 'delete', label: 'Delete', disabled: true },
  { key: 'more', label: 'More', children: [{ key: 'a', label: 'Archive' }, { key: 'e', label: 'Export' }] },
];

// 节点对应：list ↔ menu；item ↔ item；button 在 antd 里是外面自己写的 Button，直接给它 style
export default function Demo() {
  return (
    <div style={{ display: 'flex', gap: 32 }}>
      <Dropdown menu={{ items }} styles={{ menu: { borderRadius: 8 }, item: { padding: '4px 12px' } }}>
        <Button>Actions</Button>
      </Dropdown>
      <Dropdown menu={{ items }}>
        <Button style={{ borderRadius: 20 }}>Dynamic</Button>
      </Dropdown>
    </div>
  );
}
