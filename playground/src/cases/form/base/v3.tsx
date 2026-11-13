import { Form, Input, Textarea } from 'shineout-v3';

export default function Demo() {
  return (
    <Form defaultValue={{ name: 'zhangsan', email: 'zhangsan@qq.com' }} onSubmit={() => {}}>
      <Form.Item label='Name'>
        <Input name='name' placeholder='please input name' clearable />
      </Form.Item>
      <Form.Item label='Password'>
        <Input name='password' placeholder='please input password' clearable />
      </Form.Item>
      <Form.Item label='Email'>
        <Input name='email' placeholder='please input email' clearable />
      </Form.Item>
      <Form.Item label='Address'>
        <Textarea name='address' placeholder='please enter' />
      </Form.Item>
      <Form.Item label='' style={{ marginTop: 32, marginBottom: 0 }}>
        <Form.Submit>Submit</Form.Submit>
        <Form.Reset>Reset</Form.Reset>
      </Form.Item>
    </Form>
  );
}
