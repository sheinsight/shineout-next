import { Input } from 'antd';

export default function Demo() {
  return (
    <Input.Password
      style={{ width: 300 }}
      defaultValue='12312312312321312321312'
      placeholder='input password'
      visibilityToggle
      allowClear
    />
  );
}
