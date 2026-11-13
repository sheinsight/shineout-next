import { Form, Input, Rule } from 'shineout-v3';

const rules = Rule();

export default function Demo() {
  return (
    <Form style={{ maxWidth: 500 }}>
      <Form.Item label='Email' tip='Email or nickname or phonenumber' required>
        <Input name='email' clearable rules={[rules.required('Please input your email')]} />
      </Form.Item>
      <Form.Item label='Password' tip='Use at least one letter, one numeral, and seven characters.' style={{ marginBottom: 0 }} required>
        <Input name='password' type='password' clearable rules={[rules.required('Please input your password')]} />
      </Form.Item>
    </Form>
  );
}
