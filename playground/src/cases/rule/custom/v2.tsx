import { Form, Input, Rule } from 'shineout-v2';

const rule = Rule({
  tel: (value: string, _formData: unknown, callback: (r: true | Error) => void) => {
    if (!value) return callback(new Error('Please enter your phone number'));
    if (!/^[0-9\s ().-]+$/.test(value)) return callback(new Error('Please enter a valid phone number'));
    return callback(true);
  },
});

export default function Demo() {
  return (
    <Form style={{ maxWidth: 500 }} onSubmit={() => {}} throttle={0}>
      <Form.Item label='tel' required>
        <Input name='tel' rules={[rule.tel]} />
      </Form.Item>
      <Form.Item label=''>
        <span data-bench='submit'>
          <Form.Submit>Submit</Form.Submit>
        </span>
        <span data-bench='reset'>
          <Form.Reset>Reset</Form.Reset>
        </span>
      </Form.Item>
    </Form>
  );
}
