import { Input, Form } from 'shineout';
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
              (value, _, callback) => {
                if (!value) {
                  callback(new Error('name is required'));
                }
                if (value && value.length > 10) {
                  callback(new Error('name length must less than 10'));
                }
                callback(true);
              },
            ]}
            name={'name'}
            clearable
            placeholder='please input name'
          />
        </Form.Item>
        <Form.Item label='email'>
          <Input
            name={'email'}
            rules={[
              (value, _, callback) => {
                if (!value) {
                  callback(new Error('email is required'));
                }
                callback(true);
              },
            ]}
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
