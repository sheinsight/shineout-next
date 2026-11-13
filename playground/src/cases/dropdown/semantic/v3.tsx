import { Dropdown } from 'shineout-v3';

const data = [
  { content: 'Edit' },
  { content: 'Copy' },
  { content: 'Delete', disabled: true },
  { content: 'More', children: [{ content: 'Archive' }, { content: 'Export' }] },
];

export default function Demo() {
  return (
    <div style={{ display: 'flex', gap: 32 }}>
      <Dropdown data={data} placeholder='Actions' styles={{ list: { borderRadius: 8 }, item: { padding: '4px 12px' } }} />
      <Dropdown data={data} placeholder='Dynamic' styles={{ button: { borderRadius: 20 } }} />
    </div>
  );
}
