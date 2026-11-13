import { useState } from 'react';
import { Button, Form, Input, Radio } from 'antd-v5';

type Align = 'left' | 'top' | 'right';
const aligns: Align[] = ['left', 'top', 'right'];

// Shineout 的 labelAlign=top 是标签在输入框上方，对应 antd 的 layout='vertical'；left / right 对应 labelAlign
export default function Demo() {
  const [align, setAlign] = useState<Align>('right');
  return (
    <div>
      <div style={{ marginBottom: 24 }}>
        <Radio.Group value={align} options={aligns} onChange={(e) => setAlign(e.target.value)} />
      </div>
      <Form
        layout={align === 'top' ? 'vertical' : 'horizontal'}
        labelAlign={align === 'top' ? undefined : align}
        labelCol={align === 'top' ? undefined : { flex: '65px' }}
        wrapperCol={align === 'top' ? undefined : { flex: 1 }}
        style={{ maxWidth: 500 }}
      >
        <Form.Item label='Email' name='email'>
          <Input allowClear />
        </Form.Item>
        <Form.Item label='Password' name='password'>
          <Input.Password allowClear />
        </Form.Item>
        <Form.Item label='Address' name='address'>
          <Input.TextArea />
        </Form.Item>
        <Form.Item label=' ' colon={false} style={{ marginTop: align === 'top' ? -10 : 32, marginBottom: 0 }}>
          <Button type='primary' htmlType='submit'>Submit</Button>
        </Form.Item>
      </Form>
    </div>
  );
}
