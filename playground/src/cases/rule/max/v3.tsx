import { Form, Input, Rule } from 'shineout-v3';

const rule = Rule();

export default function Demo() {
  return (
    <Form style={{ maxWidth: 500 }} onSubmit={() => {}} throttle={0}>
      <Form.Item label='name' required>
        <Input name='name' title='name' rules={[rule.required(), rule.max(5)]} />
      </Form.Item>
      <Form.Item label='age' required>
        <Input.Number name='age' title='age' rules={[rule.required(), rule.max(100)]} />
      </Form.Item>
      <Form.Item label='address' required>
        <Input.Number name='address' title='address' rules={[rule.required(), { max: 3, message: 'address must be at most three characters' }]} />
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
