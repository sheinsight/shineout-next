import { Form, Input, Rule } from 'shineout-v3';

const rule = Rule();

export default function Demo() {
  return (
    <Form style={{ maxWidth: 500 }} onSubmit={() => {}} throttle={0}>
      <Form.Item label='name' required>
        <Input name='name' title='name' rules={[rule.required()]} />
      </Form.Item>
      <Form.Item label='age' required>
        <Input name='age' rules={[rule.required('age required')]} />
      </Form.Item>
      <Form.Item label='address' required>
        <Input name='address' rules={[{ required: true, message: 'address required' }]} />
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
