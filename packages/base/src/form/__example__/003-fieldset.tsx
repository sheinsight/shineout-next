import { Form, FormField, FormFieldSet, FormItem, Input } from '@sheinx/base';
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
        <FormItem jssStyle={jssStyle} label={'Email'} tip={'输入公司邮箱'}>
          <FormFieldSet
            name={'super'}
            rules={[
              (value: any, formValue, callback, _) => {
                console.log('supervalidate', value);
                if (value && value.email && value.email.length > 5) {
                  callback(new Error('长度不能大于5'));
                } else {
                  callback(true);
                }
              },
            ]}
          >
            <FormField
              name={'email'}
              rules={[
                (value, formValue, callback, _) => {
                  if (value && value.length > 2) {
                    callback(new Error('长度不能大于2'));
                  } else {
                    callback(true);
                  }
                },
              ]}
            >
              <Input jssStyle={jssStyle} clearable placeholder='please input email' />
            </FormField>
          </FormFieldSet>
        </FormItem>
        <button type={'submit'}>提交</button>
        <button type={'reset'}>重置</button>
      </Form>
    </div>
  );
};
