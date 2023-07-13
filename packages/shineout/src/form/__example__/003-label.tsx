/**
 * cn - 标签
 *    -- 通过 labelWidth 和 labelAlign 改变标签宽度和对齐方式
 * en -
 *    --
 */

import { Form, Input } from 'shineout';

export default () => {
  return (
    <Form labelWidth={200} labelAlign='right' style={{ maxWidth: 500 }}>
      <Form.Item label='Email'>
        <Input name='email' />
      </Form.Item>

      <Form.Item label='Password'>
        <Input name='password' type='password' />
      </Form.Item>

      <Form.Item label=''>
        <button type={'submit'}>Submit</button>
      </Form.Item>
    </Form>
  );
};
