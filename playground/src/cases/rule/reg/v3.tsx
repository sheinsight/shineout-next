import { Form, Input, Rule } from 'shineout-v3';

const rule = Rule();

export default function Demo() {
  return (
    <Form style={{ maxWidth: 500 }} onSubmit={() => {}} throttle={0}>
      <Form.Item label='tel' required>
        <Input name='tel' rules={[rule.required(), rule.regExp('^[\\d\\s ().-]+$', 'Please enter a valid tel')]} />
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
