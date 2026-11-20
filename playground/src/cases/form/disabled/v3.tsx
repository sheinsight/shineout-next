import { Form, Input, Textarea } from 'shineout-v3';

export default function Demo() {
  return (
    <Form disabled>
      <Form.Item label='Email'>
        <Input name='email' clearable />
      </Form.Item>
      <Form.Item label='Password'>
        <Input name='password' type='password' clearable />
      </Form.Item>
      <Form.Item label='Name'>
        <Input.Group style={{ width: 300 }} disabled>
          <Input name='firstName' placeholder='First Name' clearable />
          -
          <Input name='lastName' placeholder='Last Name' clearable />
        </Input.Group>
      </Form.Item>
      <Form.Item label='address'>
        <Textarea rows={2} name='address' defaultValue='xxx' />
      </Form.Item>
      <Form.Item label='' style={{ marginTop: 32, marginBottom: 0 }}>
        <Form.Submit loading>Submit</Form.Submit>
        <Form.Reset>Reset</Form.Reset>
      </Form.Item>
    </Form>
  );
}
