/**
 * cn - 联动校验
 *    --
 * en - 联动校验
 *    --
 */
import { Form, Input } from 'shineout';
import React from 'react';

export default () => {
  const [v, setV] = React.useState({});
  return (
    <div>
      <Form
        value={v}
        onSubmit={(v) => {
          console.log('form submit', v);
        }}
        onChange={(v) => {
          setV(v);
          console.log('form change', v);
        }}
        onReset={() => {
          console.log('form reset');
        }}
      >
        <Form.Item label='password'>
          <Input.Password
            bind={['repeat']}
            rules={[
              (value, _, callback, _prop) => {
                if (!value) {
                  callback(new Error('password is required'));
                }
                if (value && value.length > 10) {
                  callback(new Error('password length must less than 10'));
                }
                callback(true);
              },
            ]}
            name={'password'}
            clearable
            placeholder='please input password'
          />
        </Form.Item>
        <Form.Item label='repeat'>
          <Input.Password
            name={'repeat'}
            rules={[
              (value, formValue, callback, _prop) => {
                if (!value) {
                  callback(new Error('repeat is required'));
                }
                if (value && value !== formValue.password) {
                  callback(new Error('两次输入不一致'));
                }
                callback(true);
              },
            ]}
            clearable
            placeholder='please input password again'
          />
        </Form.Item>

        <button type={'submit'}>提交</button>
        <button type={'reset'}>重置</button>
      </Form>
    </div>
  );
};
