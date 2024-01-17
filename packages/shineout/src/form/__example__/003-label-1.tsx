/**
 * cn - 标签对齐方式
 *    -- 通过 labelWidth 和 labelAlign 改变标签宽度和水平对齐方式
 * en -
 *    --
 */

import { useState } from 'react';
import { Form, Input, TYPE, Radio } from 'shineout';

type FormProps = TYPE.Form.Props<any>;

const alignArr: FormProps['labelAlign'][] = ['left', 'top', 'right'];
export default () => {
  const [align, setAlign] = useState<FormProps['labelAlign']>('right');

  return (
    <div>
      <div style={{ marginBottom: 24 }}>
        <Radio.Group value={align} data={alignArr} keygen onChange={setAlign} />
      </div>
      <Form labelWidth={65} labelAlign={align} style={{ maxWidth: 500 }}>
        <Form.Item label='Email'>
          <Input name='email' />
        </Form.Item>

        <Form.Item label='Password'>
          <Input name='password' type='password' />
        </Form.Item>

        <Form.Item label='' style={{ marginTop: align === 'top' ? -10 : 32 }}>
          <Form.Submit>Submit</Form.Submit>
        </Form.Item>
      </Form>
    </div>
  );
};
