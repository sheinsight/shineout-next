import { Input, InputNumber, Space } from 'antd';

export default function Demo() {
  const style = { marginBottom: 24, width: '100%' };
  return (
    <div style={{ width: 300 }}>
      <Space.Compact style={style}>
        <Space.Addon>min</Space.Addon>
        <InputNumber style={{ width: '100%' }} placeholder='100' min={100} />
      </Space.Compact>
      <Space.Compact style={style}>
        <Space.Addon>max</Space.Addon>
        <InputNumber style={{ width: '100%' }} placeholder='200' max={200} />
      </Space.Compact>
      <Space.Compact style={style}>
        <Space.Addon>maxLength</Space.Addon>
        <Input placeholder='5' maxLength={5} />
      </Space.Compact>
    </div>
  );
}
