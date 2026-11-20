import { Button, Form, Input } from 'antd';

export default function Demo() {
  return (
    <Form layout='inline'>
      <Form.Item label='Email' name='email'>
        <Input placeholder='Email' allowClear />
      </Form.Item>
      <Form.Item label='Password' name='password'>
        <Input.Password placeholder='Password' allowClear />
      </Form.Item>
      <Form.Item>
        <Button type='primary' htmlType='submit'>Submit</Button>
      </Form.Item>
    </Form>
  );
}
