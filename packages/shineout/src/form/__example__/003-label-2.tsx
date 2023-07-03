/**
 * cn -
 *    -- 当 label 文字存在换行时，可使用 labelVerticalAlign 来控制垂直方向对齐方式
 * en -
 *    --
 */

import { Form, Input } from 'shineout';

export default () => {
  return (
    <Form labelWidth={100} labelVerticalAlign='middle' style={{ maxWidth: 300 }}>
      <Form.Item label='Your Email Address'>
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
