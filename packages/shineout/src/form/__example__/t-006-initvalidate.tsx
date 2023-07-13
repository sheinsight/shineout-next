/**
 * cn - initValidate
 *    --
 * en - initValidate
 *    --
 */
import { Form, Input } from 'shineout';
import React from 'react';

export default () => {
  const [v, setV] = React.useState({});
  return (
    <div>
      <Form
        initValidate
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
        <Form.Item label='name'>
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
        <Form.Item label='email'>
          <Input
            name={'email'}
            rules={[{ required: true, message: 'email is required' }]}
            clearable
            placeholder='please input email'
          />
        </Form.Item>

        <button type={'submit'}>提交</button>
        <button type={'reset'}>重置</button>
        <button
          type={'button'}
          onClick={() => {
            setV({ name: 'aelsssssllonnnnggggggg' });
          }}
        >
          改值后自动校验修改的字段
        </button>
      </Form>
    </div>
  );
};
