import { Form, FormField, FormItem, Input } from '@sheinx/base';
import {
  useFormItemStyle,
  useFormStyle,
  useInnerTitleStyle,
  useInputStyle,
} from '@sheinx/shineout-style';
import React from 'react';

export default () => {
  const jssStyle = {
    input: useInputStyle,
    form: useFormStyle,
    formItem: useFormItemStyle,
    innerTitle: useInnerTitleStyle,
  };
  return (
    <div>
      <Form
        inline
        jssStyle={jssStyle}
        defaultValue={{ email: 'zhangsan@qq.com' }}
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
        <FormItem required label={'Username'} jssStyle={jssStyle}>
          <FormField
            name={'name'}
            defaultValue={'zhangsan'}
            rules={[
              (value, formValue, callback, _prop) => {
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
            <Input jssStyle={jssStyle} clearable placeholder='please input name' />
          </FormField>
        </FormItem>
        <FormItem label={'Email'} tip={'输入公司邮箱'} jssStyle={jssStyle}>
          <FormField
            name={'email'}
            onChange={(v?: string) => {
              console.log('input change', v);
            }}
          >
            {({ value, onChange }) => (
              <Input
                value={value}
                onChange={onChange}
                jssStyle={jssStyle}
                clearable
                placeholder='please input email'
              />
            )}
          </FormField>
        </FormItem>
        <button type={'submit'}>提交</button>
        <button type={'reset'}>重置</button>
      </Form>
    </div>
  );
};
