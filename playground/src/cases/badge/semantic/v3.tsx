import { Badge } from 'shineout-v3';

const box = <div style={{ width: 40, height: 40, background: '#eee', borderRadius: 4 }} />;

export default function Demo() {
  return (
    <div style={{ display: 'flex', gap: 32 }}>
      <Badge count={5} styles={{ badge: { background: '#1890ff', boxShadow: '0 0 0 2px #fff' } }}>
        {box}
      </Badge>
      <Badge dot classNames={{ root: 'my-badge', badge: 'my-dot' }} styles={{ badge: { background: '#52c41a' } }}>
        {box}
      </Badge>
      <Badge count={99} styles={{ badge: { background: '#ff4d4f', borderRadius: 10 } }} />
    </div>
  );
}
