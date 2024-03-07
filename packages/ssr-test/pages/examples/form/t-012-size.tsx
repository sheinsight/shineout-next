/**
 * cn - size
 *    -- 表单元素的尺寸
 * en - size
 *    -- The size of the form element
 */
import React from 'react';
import { Form, Input, Radio, Textarea, TYPE } from 'shineout';

type RadioSize = TYPE.Radio.GroupProps<any, any>['size'];

const App: React.FC = () => {
  const [size, setSize] = React.useState<RadioSize>('default');
  return (
    <>
      <Radio.Group data={['default', 'small', 'large']} keygen value={size} onChange={setSize} />
      <Form disabled size={size}>
        <Form.Item label='Email'>
          <Input name='email' />
        </Form.Item>
        <Form.Item label='Email2'>
          <Input />
        </Form.Item>

        <Form.Item label='Password'>
          <Input name='password' type='password' />
        </Form.Item>

        <Form.Item label='Name'>
          <Input.Group style={{ width: 300 }} disabled>
            <Input name='firstName' placeholder='First Name' />
            -
            <Input name='lastName' placeholder='Last Name' />
          </Input.Group>
        </Form.Item>

        <Form.Item label='Age'>
          <Input.Number
            style={{ width: 100 }}
            name='age'
            type='number'
            digits={0}
            defaultValue='0'
          />
        </Form.Item>
        <Form.Item label='address'>
          <Textarea rows={2} name='address' defaultValue='xxx' />
        </Form.Item>
      </Form>
    </>
  );
};

export default App;
