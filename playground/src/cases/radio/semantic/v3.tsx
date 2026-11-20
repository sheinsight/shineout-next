import { Radio } from 'shineout-v3';

export default function Demo() {
  return (
    <Radio.Group
      keygen
      data={['Apple', 'Banana', 'Orange']}
      defaultValue='Apple'
      styles={{
        group: { gap: 16, padding: 12, background: '#fafafa', borderRadius: 8 },
        root: { padding: '4px 8px' },
        indicator: { marginRight: 8 },
        label: { fontWeight: 500 },
      }}
    />
  );
}
