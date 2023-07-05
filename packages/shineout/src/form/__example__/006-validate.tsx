/**
 * cn - 校验
 *    --
 * en - validate
 *    --
 */

import { Form, Input } from 'shineout';

export default () => {
  return (
    <div>
      <Form
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
              { required: true, message: 'name is required' },
              { max: 10, message: 'name length must less than 10' },
            ]}
            name={'name'}
            clearable
            placeholder='please input name'
          />
        </Form.Item>
        <Form.Item label='email' required>
          <Input
            name={'email'}
            rules={[
              (value, _, callback, _prop) => {
                if (!value) {
                  callback(new Error('email is required'));
                }
                // 校验email 类型
                if (value && !/^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/.test(value)) {
                  callback(new Error('email is not valid'));
                }
                callback(true);
              },
            ]}
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
