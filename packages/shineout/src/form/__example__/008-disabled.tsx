/**
 * cn - 禁用
 *    -- 使用 disabled 属性使表单内支持 disabled 属性的组件禁用，通常用在表单数据加载或提交时
 * en - Disabled
 *    -- Use the disabled property to make the Form support to disable component
 */
import React from 'react';
import { Form, Input, Textarea } from 'shineout';

const App: React.FC = () => (
  <Form disabled>
    <Form.Item label='Email'>
      <Input name='email' clearable />
    </Form.Item>
    <Form.Item label='Email2'>
      <Input clearable />
    </Form.Item>

    <Form.Item label='Password'>
      <Input name='password' type='password' clearable />
    </Form.Item>

    <Form.Item label='Name'>
      <Input.Group style={{ width: 300 }} disabled>
        <Input name='firstName' placeholder='First Name' clearable />
        -
        <Input name='lastName' placeholder='Last Name' clearable />
      </Input.Group>
    </Form.Item>

    <Form.Item label='Age'>
      <Input.Number
        style={{ width: 100 }}
        name='age'
        type='number'
        digits={0}
        defaultValue='0'
        clearable
      />
    </Form.Item>
    <Form.Item label='address'>
      <Textarea rows={2} name='address' defaultValue='xxx' />
    </Form.Item>
    <Form.Item label='' style={{ marginTop: 32, marginBottom: 0 }}>
      <Form.Submit loading>Submit</Form.Submit>
      <Form.Reset>Reset</Form.Reset>
    </Form.Item>
  </Form>
);

export default App;
