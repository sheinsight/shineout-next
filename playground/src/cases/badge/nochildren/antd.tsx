import { Badge } from 'antd';

export default function Demo() {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 42 }}>
      <Badge count={1} />
      <Badge count={100} overflowCount={99} color='#faad14' />
    </div>
  );
}
