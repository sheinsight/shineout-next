import { Switch } from 'antd';

export default function Demo() {
  return (
    <div style={{ display: 'flex', flexDirection: 'row', gap: 24, alignItems: 'center' }}>
      <Switch loading checked />
      <Switch loading />
    </div>
  );
}
