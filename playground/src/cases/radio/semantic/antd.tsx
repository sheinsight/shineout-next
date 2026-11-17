import { Radio } from 'antd';

export default function Demo() {
  return (
    <Radio.Group
      options={['Apple', 'Banana', 'Orange']}
      defaultValue='Apple'
      styles={{
        root: { gap: 16, padding: 12, background: '#fafafa', borderRadius: 8 },
        item: { padding: '4px 8px' },
        itemIcon: { marginRight: 8 },
        itemLabel: { fontWeight: 500 },
      }}
    />
  );
}
