import { Button, Form, Input } from 'antd-v5';

// antd 的字段要写在 Form.Item 的 name 上，输入组件本身不带 name；布局默认就是 label 在左（labelCol），这里与 Shineout 的 labelWidth 不同
export default function Demo() {
  return (
    <Form initialValues={{ name: 'zhangsan', email: 'zhangsan@qq.com' }} onFinish={() => {}} labelCol={{ flex: '100px' }} wrapperCol={{ flex: 1 }}>
      <Form.Item label='Name' name='name'>
        <Input placeholder='please input name' allowClear />
      </Form.Item>
      <Form.Item label='Password' name='password'>
        <Input placeholder='please input password' allowClear />
      </Form.Item>
      <Form.Item label='Email' name='email'>
        <Input placeholder='please input email' allowClear />
      </Form.Item>
      <Form.Item label='Address' name='address'>
        <Input.TextArea placeholder='please enter' />
      </Form.Item>
      <Form.Item label=' ' colon={false} style={{ marginTop: 32, marginBottom: 0 }}>
        <Button type='primary' htmlType='submit'>Submit</Button>
        <Button htmlType='reset' style={{ marginInlineStart: 8 }}>Reset</Button>
      </Form.Item>
    </Form>
  );
}
