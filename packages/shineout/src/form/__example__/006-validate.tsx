/**
 * cn - 校验
 *    --
 * en - validate
 *    --
 */

import { Form, Input, Rule } from 'shineout';

const rules = Rule();
export default () => {
  return (
    <div>
      <Form
        rules={{ email: [rules.required('email is required'), rules.email('email is not valid')] }}
        onSubmit={(v) => {
          console.log('form submit', v);
        }}
        onChange={(v) => {
          console.log('form change', v);
        }}
        onReset={() => {
          console.log('form reset');
        }}
      >
        <Form.Item label='name' required>
          <Input
            rules={[
              rules.required('name is required'),
              rules.max(10, 'name length must less than 10'),
            ]}
            name={'name'}
            clearable
            placeholder='please input name'
          />
        </Form.Item>
        <Form.Item label='email' required>
          <Input
            name={'email'}
            rules={[rules.required('email is required'), rules.email('email is not valid')]}
            clearable
            placeholder='please input email'
          />
        </Form.Item>

        <Form.Item label=''>
          <button type={'submit'}>提交</button>
          <button type={'reset'}>重置</button>
        </Form.Item>
      </Form>
    </div>
  );
};
