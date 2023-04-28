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
        defaultValue={{ name: 'spana' }}
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
        <Input
          name={'name'}
          jssStyle={inputStyle}
          onChange={(v) => {
            console.log('input change', v);
          }}
          clearable
          placeholder='please input name'
        />
        <button type={'submit'}>提交</button>
        <button type={'reset'}>重置</button>
      </Form>
    </div>
  );
};
