/**
 * cn - initValidate
 *    --
 * en - initValidate
 *    --
 */
import { Form, Input, Button } from 'shineout';
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

        <Form.Item label=''>
          <Form.Submit>Submit</Form.Submit>
          <Form.Reset>Reset</Form.Reset>
          <Button
            onClick={() => {
              setV({ name: 'aelsssssllonnnnggggggg' });
            }}
          >
            Automatically verify modified fields after changing values
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};
