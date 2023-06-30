/**
 * cn - 基本用法
 *    --
 * en - Basic usage
 *    --
 */

import { Form, Input } from 'shineout';

export default () => {
  return (
    <div>
      <Form
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
        <Form.Item label='name'>
          <Input
            rules={[
              (value, _, callback) => {
                if (!value) {
                  callback(new Error('name is required'));
                }
                if (value && value.length > 10) {
                  callback(new Error('name length must less than 10'));
                }
                callback(true);
              },
            ]}
            defaultValue={'spana'}
            name={'name'}
            clearable
            placeholder='please input name'
          />
        </Form.Item>
        <Form.Item label='email'>
          <Input name={'email'} clearable placeholder='please input email' />
        </Form.Item>

        <button type={'submit'}>提交</button>
        <button type={'reset'}>重置</button>
      </Form>
    </div>
  );
};
