import { Input, Form } from '@sheinx/ui';
import { useInputStyle, useFormStyle, useFormItemStyle } from '@sheinx/shineout-style';
import React from 'react';
export default () => {
  const inputStyle = useInputStyle();
  const formStyle = useFormStyle();
  const itemStyle = useFormItemStyle();
  return (
    <div>
      <Form
        inline
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
        <Form.Item required label={'Username'} jssStyle={itemStyle}>
          <Form.Field
            name={'name'}
            defaultValue={'spana'}
            rules={[
              (value, formValue, callback) => {
                if (value && value.length > 5) {
                  callback(new Error('长度不能大于5'));
                } else {
                  callback(true);
                }
              },
            ]}
            onChange={(v) => {
              console.log('input change', v);
            }}
          >
            <Input jssStyle={inputStyle} clearable placeholder='please input name' />
          </Form.Field>
        </Form.Item>
        <Form.Item label={'Email'} tip={'输入公司邮箱'} jssStyle={itemStyle}>
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
        </Form.Item>
        <button type={'submit'}>提交</button>
        <button type={'reset'}>重置</button>
      </Form>
    </div>
  );
};
