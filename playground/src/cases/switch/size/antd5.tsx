import { Switch } from 'antd-v5';

export default function Demo() {
  return (
    <div style={{ display: 'flex', flexDirection: 'row', gap: 24, alignItems: 'center' }}>
      <Switch size='small' />
      <Switch />
    </div>
  );
}
