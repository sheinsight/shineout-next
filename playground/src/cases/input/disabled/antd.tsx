import { Input } from 'antd';
import { Space } from 'antd';

// antd 的 Space.Compact 没有 disabled，只能给每个 Input 单独设置；分隔符「-」没有保留
export default function Demo() {
  const style = { width: 300 };
  return (
    <div>
      <Space.Compact style={{ ...style, marginBottom: 24 }}>
        <Input disabled placeholder='first name' />
        <Input disabled placeholder='last name' />
      </Space.Compact>
      <Input disabled style={style} placeholder='disabled input' />
    </div>
  );
}
