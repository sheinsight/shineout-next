/**
 * cn -
 *    -- 当 label 文字存在换行时，可使用 labelVerticalAlign 来控制垂直方向对齐方式
 * en -
 *    -- When the label text has a line break, you can use labelVerticalAlign to control the vertical alignment
 */

import { useState } from 'react';
import { Form, Input, TYPE, Radio, Textarea } from 'shineout';

type FormProps = TYPE.Form.Props<any>;

const alignArr: FormProps['labelVerticalAlign'][] = ['bottom', 'top', 'middle'];

export default () => {
  const [align, setAlign] = useState<FormProps['labelVerticalAlign']>('top');
  return (
    <>
      <div style={{ marginBottom: 24 }}>
        <Radio.Group value={align} data={alignArr} keygen onChange={setAlign} />
      </div>
      <Form labelWidth={65} labelVerticalAlign={align} style={{ maxWidth: 500 }}>
        <Form.Item label='Your Email'>
          <Input name='email' clearable />
        </Form.Item>

        <Form.Item label='Password'>
          <Input name='password' type='password' clearable />
        </Form.Item>
        <Form.Item label='Your Address'>
          <Textarea name='address' />
        </Form.Item>
        <Form.Item label='' style={{ marginTop: 32, marginBottom: 0 }}>
          <Form.Submit>Submit</Form.Submit>
        </Form.Item>
      </Form>
    </>
  );
};
