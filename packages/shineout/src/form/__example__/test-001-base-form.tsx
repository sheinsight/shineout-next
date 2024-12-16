/**
 * cn - 调试用基础 Form
 *    -- 调试用的，在这个例子基础上随便改吧
 * en - Test Form
 *    -- Test Form
 */
import { Form, Input } from 'shineout';

export default () => {
  return (
    <Form onSubmit={(v) => console.log(v)}>
      <Input name='name' trim></Input>

      <Form.Submit>Submit</Form.Submit>
      <Form.Reset>Reset</Form.Reset>
    </Form>
  );
};
