import { Form, FormField, FormItem, Input } from '@sheinx/base';
import {
  useFormItemStyle,
  useFormStyle,
  useInnerTitleStyle,
  useInputStyle,
} from '@sheinx/shineout-style';
import React from 'react';

export default () => {
  const inputStyle = useInputStyle();
  const formStyle = useFormStyle();
  const itemStyle = useFormItemStyle();
  const innerTitleStyle = useInnerTitleStyle();
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
        <FormItem required label={'Username'} jssStyle={itemStyle}>
          <FormField
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
            <Input
              jssStyle={inputStyle}
              innerTitleJssStyle={innerTitleStyle}
              clearable
              placeholder='please input name'
            />
          </FormField>
        </FormItem>
        <FormItem label={'Email'} tip={'输入公司邮箱'} jssStyle={itemStyle}>
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
                jssStyle={inputStyle}
                innerTitleJssStyle={innerTitleStyle}
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
