import { Switch } from 'antd';

export default function Demo() {
  return (
    <Switch
      defaultChecked
      checkedChildren='On'
      unCheckedChildren='Off'
      styles={{
        root: { borderRadius: 4 },
        indicator: { borderRadius: 4 },
        content: { fontSize: 12, fontWeight: 500 },
      }}
    />
  );
}
