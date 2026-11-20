import { Form, Input } from 'antd';

export default function Demo() {
  return (
    <Form style={{ maxWidth: 500 }} labelCol={{ flex: '100px' }} wrapperCol={{ flex: 1 }}>
      <Form.Item label='Email' name='email' extra='Email or nickname or phonenumber' rules={[{ required: true, message: 'Please input your email' }]}>
        <Input allowClear />
      </Form.Item>
      <Form.Item label='Password' name='password' extra='Use at least one letter, one numeral, and seven characters.' style={{ marginBottom: 0 }} rules={[{ required: true, message: 'Please input your password' }]}>
        <Input.Password allowClear />
      </Form.Item>
    </Form>
  );
}
