import { Form, Input, Rule } from 'shineout-v2';

const rule = Rule();

export default function Demo() {
  return (
    <Form style={{ maxWidth: 500 }} onSubmit={() => {}} throttle={0}>
      <Form.Item label='email' required>
        <Input name='email' rules={[rule.required(), rule.email('email is invalid')]} />
      </Form.Item>
      <Form.Item label='age' required>
        <Input name='age' rules={[rule.required(), rule.integer('Please enter a valid age')]} />
      </Form.Item>
      <Form.Item label='price' required>
        <Input name='price' rules={[rule.required(), rule.number('Please enter a valid price')]} />
      </Form.Item>
      <Form.Item label='url' required>
        <Input name='url' rules={[rule.required(), rule.url('The url is not valid')]} />
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
