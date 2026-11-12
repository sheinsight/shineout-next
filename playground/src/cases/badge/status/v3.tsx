import { Badge } from 'shineout-v3';

const row = { display: 'flex', alignItems: 'center', gap: 24 } as const;

export default function Demo() {
  return (
    <div>
      <div style={{ ...row, marginBottom: 32 }}>
        <Badge dot status='default' />
        <Badge dot status='processing' />
        <Badge dot status='error' />
        <Badge dot status='warning' />
        <Badge dot status='success' />
      </div>
      <div style={row}>
        <Badge dot status='default' text='Default' />
        <Badge dot status='processing' text='Processing' />
        <Badge dot status='error' text='Error' />
        <Badge dot status='warning' text='Warning' />
        <Badge dot status='success' text='Success' />
      </div>
    </div>
  );
}
