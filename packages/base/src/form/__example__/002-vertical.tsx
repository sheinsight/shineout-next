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

  const jssStyle = {
    input: inputStyle,
    form: formStyle,
    item: itemStyle,
    innerTitle: innerTitleStyle,
  };
  return (
    <div>
      <Form jssStyle={formStyle} defaultValue={{ email: 'zhangsan@qq.com' }} labelAlign={'top'}>
        <FormItem label={'username'} tip={'请输入用户名'} jssStyle={itemStyle}>
          <FormField
            name={'name'}
            onChange={(v) => {
              console.log('input change', v);
            }}
          >
            <Input jssStyle={jssStyle} clearable placeholder='please input name' />
          </FormField>
        </FormItem>
        <FormItem label={'email'} jssStyle={itemStyle}>
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
