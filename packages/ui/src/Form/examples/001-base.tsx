import { Input, Form } from '@shined/ui';
import { useInputStyle } from '@shined/shineout-style';
import React from 'react';
import { useFormStyle } from '@shined/shineout-style';
export default () => {
  const inputStyle = useInputStyle();
  const formStyle = useFormStyle();
  return (
    <div>
      <Form
        jssStyle={formStyle}
        defaultValue={{ email: 'spana@qq.com' }}
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
        <Form.Field
          name={'name'}
          defaultValue={'spana'}
          onChange={(v) => {
            console.log('input change', v);
          }}
        >
          <Input jssStyle={inputStyle} clearable placeholder='please input name' />
        </Form.Field>
        <Form.Field
          name={'email'}
          onChange={(v?: string) => {
            console.log('input change', v);
          }}
        >
          {({ value, onChange }) => (
            <Input
              value={value}
              onChange={onChange}
              jssStyle={inputStyle}
              clearable
              placeholder='please input email'
            />
          )}
        </Form.Field>
        <button type={'submit'}>提交</button>
        <button type={'reset'}>重置</button>
      </Form>
    </div>
  );
};
