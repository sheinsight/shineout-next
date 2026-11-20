import { Button, DatePicker, Input, Select, Space } from 'antd-v5';

const style = { width: 300, marginBottom: 24 };
const OPTIONS = [{ value: 'Option1' }, { value: 'Option2' }];
const selectStyle = { width: 100, flex: 'none' } as const;

// Input.Group 里的文字（http:// / .com）↔ antd 的 Space.Addon（addonBefore / addonAfter 在 antd 6 已废弃）；整体用 Space.Compact 拼接
export default function Demo() {
  return (
    <div>
      <Space.Compact style={style}>
        <Space.Addon>http://</Space.Addon>
        <Input placeholder='please enter' />
      </Space.Compact>
      <Space.Compact style={style}>
        <Input placeholder='please enter' />
        <Space.Addon>.com</Space.Addon>
      </Space.Compact>
      <Space.Compact style={style}>
        <Space.Addon>http://</Space.Addon>
        <Input placeholder='please enter' />
        <Space.Addon>.com</Space.Addon>
      </Space.Compact>
      <Space.Compact style={style}>
        <Input placeholder='please enter' />
        <Input style={{ width: 30, flex: 'none', textAlign: 'center', pointerEvents: 'none' }} placeholder='-' disabled />
        <Input placeholder='please enter' />
      </Space.Compact>
      <Space.Compact style={style}>
        <Select style={selectStyle} options={OPTIONS} defaultValue='Option1' />
        <Input placeholder='please enter' />
      </Space.Compact>
      <Space.Compact style={style}>
        <Select style={selectStyle} options={OPTIONS} defaultValue='Option1' />
        <DatePicker placeholder='please select' style={{ flex: 1 }} />
      </Space.Compact>
      <Space.Compact style={style}>
        <Select style={selectStyle} options={OPTIONS} defaultValue='Option1' />
        <Input placeholder='please enter' />
        <Button type='primary'>Search</Button>
      </Space.Compact>
      <h3 style={{ marginBottom: 12, fontSize: 16 }}>Other Size</h3>
      <Space.Compact style={style} size='small'>
        <Space.Addon>http://</Space.Addon>
        <Input placeholder='email' />
        <Space.Addon>.com</Space.Addon>
      </Space.Compact>
      <Space.Compact style={{ width: 300 }} size='large'>
        <Space.Addon>http://</Space.Addon>
        <Input placeholder='email' />
        <Space.Addon>.com</Space.Addon>
      </Space.Compact>
    </div>
  );
}
