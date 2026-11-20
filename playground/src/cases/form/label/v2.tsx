import { useState } from 'react';
import { Form, Input, Radio, Textarea } from 'shineout-v2';

type Align = 'left' | 'top' | 'right';
const aligns: Align[] = ['left', 'top', 'right'];

export default function Demo() {
  const [align, setAlign] = useState<Align>('right');
  return (
    <div>
      <div style={{ marginBottom: 24 }}>
        <Radio.Group value={align} data={aligns} keygen onChange={setAlign} />
      </div>
      <Form labelWidth={65} labelAlign={align} style={{ maxWidth: 500 }}>
        <Form.Item label='Email'>
          <Input name='email' clearable />
        </Form.Item>
        <Form.Item label='Password'>
          <Input name='password' type='password' clearable />
        </Form.Item>
        <Form.Item label='Address'>
          <Textarea name='address' />
        </Form.Item>
        <Form.Item label='' style={{ marginTop: align === 'top' ? -10 : 32, marginBottom: 0 }}>
          <Form.Submit>Submit</Form.Submit>
        </Form.Item>
      </Form>
    </div>
  );
}
