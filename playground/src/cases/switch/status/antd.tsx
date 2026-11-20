import { Switch } from 'antd';

export default function Demo() {
  return (
    <div style={{ display: 'flex', flexDirection: 'row', gap: 24, alignItems: 'center' }}>
      <Switch checked disabled />
      <Switch checked={false} disabled />
    </div>
  );
}
