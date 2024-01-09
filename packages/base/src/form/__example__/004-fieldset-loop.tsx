import { Form, FormField, FormFieldSet, FormItem, Input } from '@sheinx/base';
import {
  useFormItemStyle,
  useFormStyle,
  useInnerTitleStyle,
  useInputStyle,
} from '@sheinx/shineout-style';

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
        labelAlign={'right'}
        jssStyle={jssStyle}
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
        <FormItem jssStyle={jssStyle} label={'friends'}>
          <FormFieldSet name={'friends'} defaultValue={[{ name: 'leo', age: 20 }]}>
            {(ii) => {
              return (
                <FormItem jssStyle={jssStyle} style={{ display: 'flex', marginBottom: '10px' }}>
                  <FormField name={'name'} defaultValue={'leo'}>
                    <Input jssStyle={jssStyle} style={{ width: 180, marginInlineEnd: 8 }} />
                  </FormField>
                  <FormField name={'age'} defaultValue={'18'}>
                    <Input jssStyle={jssStyle} style={{ width: 180, marginInlineEnd: 8 }} />
                  </FormField>
                  <span
                    onClick={() => {
                      ii.onAppend({ name: '', age: 12 });
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
