import { Transfer } from 'shineout-v3';

const data = Array.from({ length: 8 }, (_, i) => ({ id: i + 1, name: `Item ${i + 1}` }));

export default function Demo() {
  return (
    <Transfer
      data={data}
      keygen='id'
      format='id'
      renderItem='name'
      defaultValue={[5, 6]}
      titles={['Source', 'Target']}
      styles={{
        root: { borderRadius: 8 },
        header: { background: '#f0f7ff', padding: '8px 12px' },
        list: { padding: 4 },
        item: { borderRadius: 4 },
        operations: { padding: '0 16px' },
      }}
    />
  );
}
