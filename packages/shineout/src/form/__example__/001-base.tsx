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
        <Form.Item label='name'>
          <Input defaultValue={'zhangsan'} name={'name'} placeholder='please input name' />
        </Form.Item>
        <Form.Item label='email'>
          <Input name={'email'} clearable placeholder='please input email' />
        </Form.Item>

        <Form.Item label=''>
          <button type={'submit'}>提交</button>
          <button type={'reset'}>重置</button>
        </Form.Item>
      </Form>
    </div>
  );
};
