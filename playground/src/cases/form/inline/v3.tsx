import { Form, Input } from 'shineout-v3';

export default function Demo() {
  return (
    <Form inline>
      <Form.Item label='Email' labelWidth={65}>
        <Input name='email' placeholder='Email' clearable />
      </Form.Item>
      <Form.Item label='Password' labelWidth={65}>
        <Input name='password' placeholder='Password' type='password' clearable />
      </Form.Item>
      <Form.Submit>Submit</Form.Submit>
    </Form>
  );
}
