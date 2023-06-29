import { Form, FormField, FormFieldSet, FormItem, Input } from '@sheinx/base';
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
        labelAlign={'right'}
        jssStyle={formStyle}
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
        <FormItem jssStyle={itemStyle} label={'friends'}>
          <FormFieldSet name={'friends'} defaultValue={[{ name: 'leo', age: 20 }]}>
            {(ii) => {
              return (
                <FormItem jssStyle={itemStyle} style={{ display: 'flex', marginBottom: '10px' }}>
                  <FormField name={'name'} defaultValue={'leo'}>
                    <Input
                      jssStyle={inputStyle}
                      innerTitleJssStyle={innerTitleStyle}
                      style={{ width: 180, marginInlineEnd: 8 }}
                    />
                  </FormField>
                  <FormField name={'age'} defaultValue={'18'}>
                    <Input
                      jssStyle={inputStyle}
                      innerTitleJssStyle={innerTitleStyle}
                      style={{ width: 180, marginInlineEnd: 8 }}
                    />
                  </FormField>
                  <span
                    onClick={() => {
                      ii.onAppend({ name: '' });
                    }}
                  >
                    +
                  </span>
                  <span onClick={ii.onRemove}>-</span>
                </FormItem>
              );
            }}
          </FormFieldSet>
        </FormItem>
        <button type={'submit'}>提交</button>
        <button type={'reset'}>重置</button>
      </Form>
    </div>
  );
};
