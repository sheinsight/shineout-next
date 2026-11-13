import { Descriptions } from 'shineout-v3';
import { semantic } from '../_shared/data';

export default function Demo() {
  return (
    <Descriptions
      title='User Info'
      extra='Detail'
      items={semantic}
      border
      column={3}
      styles={{
        root: { borderRadius: 8 },
        header: { marginBottom: 12 },
        title: { fontSize: 16, fontWeight: 600 },
        extra: { color: '#1890ff', cursor: 'pointer' },
        table: { width: '100%' },
        label: { fontWeight: 500, color: '#666' },
        value: { color: '#333' },
      }}
    />
  );
}
