import { List } from 'shineout-v3';

const data = ['Apple', 'Banana', 'Cherry', 'Date', 'Elderberry'];

export default function Demo() {
  return (
    <List
      keygen={(d: string) => d}
      data={data}
      bordered
      renderItem={(d: string) => d}
      footer='Total: 5 items'
      styles={{
        root: { borderRadius: 8 },
        item: { padding: '12px 16px' },
        footer: { padding: '8px 16px', color: '#999', borderTop: '1px solid #f0f0f0' },
      }}
    />
  );
}
