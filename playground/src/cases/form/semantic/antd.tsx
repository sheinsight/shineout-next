import { Form, Input } from 'antd';

// 节点对应：root / label 同名；Shineout 的 tip ↔ antd 的 extra
// Form.Item 在 antd 6.7.0 里没有 styles，Shineout 示例里第二项单独设置标签颜色的写法没有对应，省略
export default function Demo() {
  return (
    <Form
      styles={{
        root: { border: '2px solid #1890ff', borderRadius: 8, padding: 24 },
        label: { fontWeight: 600, color: '#1890ff' },
        extra: { color: '#999', fontSize: 12 },
      }}
      labelCol={{ flex: '80px' }}
      wrapperCol={{ flex: 1 }}
    >
      <Form.Item label='Name' extra='Please enter your real name' required>
        <Input placeholder='Enter your name' />
      </Form.Item>
      <Form.Item label='Email' extra='We will not share your email'>
        <Input placeholder='Enter your email' />
      </Form.Item>
    </Form>
  );
}
