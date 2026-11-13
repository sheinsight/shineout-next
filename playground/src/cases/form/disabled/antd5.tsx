import { Button, Form, Input, Space } from 'antd-v5';

export default function Demo() {
  return (
    <Form disabled labelCol={{ flex: '100px' }} wrapperCol={{ flex: 1 }}>
      <Form.Item label='Email' name='email'>
        <Input allowClear />
      </Form.Item>
      <Form.Item label='Password' name='password'>
        <Input.Password allowClear />
      </Form.Item>
      <Form.Item label='Name'>
        <Space.Compact style={{ width: 300 }}>
          <Form.Item name='firstName' noStyle>
            <Input placeholder='First Name' allowClear />
          </Form.Item>
          <Form.Item name='lastName' noStyle>
            <Input placeholder='Last Name' allowClear />
          </Form.Item>
        </Space.Compact>
      </Form.Item>
      <Form.Item label='address' name='address' initialValue='xxx'>
        <Input.TextArea rows={2} />
      </Form.Item>
      <Form.Item label=' ' colon={false} style={{ marginTop: 32, marginBottom: 0 }}>
        <Button type='primary' htmlType='submit' loading>Submit</Button>
        <Button htmlType='reset' style={{ marginInlineStart: 8 }}>Reset</Button>
      </Form.Item>
    </Form>
  );
}
