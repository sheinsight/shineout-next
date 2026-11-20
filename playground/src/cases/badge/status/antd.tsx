import { Badge } from 'antd';

const row = { display: 'flex', alignItems: 'center', gap: 24 } as const;

export default function Demo() {
  return (
    <div>
      <div style={{ ...row, marginBottom: 32 }}>
        <Badge status='default' />
        <Badge status='processing' />
        <Badge status='error' />
        <Badge status='warning' />
        <Badge status='success' />
      </div>
      <div style={row}>
        <Badge status='default' text='Default' />
        <Badge status='processing' text='Processing' />
        <Badge status='error' text='Error' />
        <Badge status='warning' text='Warning' />
        <Badge status='success' text='Success' />
      </div>
    </div>
  );
}
