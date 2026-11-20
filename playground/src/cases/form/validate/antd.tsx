import { Button, Checkbox, Form, Input, InputNumber } from 'antd';
import { colors } from '../_shared/data';

const required = (name: string) => ({ required: true, message: `${name} is required` });

export default function Demo() {
  const [form] = Form.useForm();
  return (
    <Form form={form} style={{ maxWidth: 500 }} labelCol={{ flex: '110px' }} wrapperCol={{ flex: 1 }} onFinish={() => {}}>
      <Form.Item label='Email' name='email' rules={[required('email'), { type: 'email', message: 'Email is invalid' }]}>
        <Input allowClear />
      </Form.Item>
      <Form.Item label='Name' name='name' rules={[required('name')]}>
        <Input allowClear />
      </Form.Item>
      <Form.Item label='Password' name='password' extra='At least one letter, one numeral, and 6 - 20 characters.' rules={[required('password'), { min: 6, max: 20, message: 'Password must be 6 - 20 characters' }]}>
        <Input.Password allowClear />
      </Form.Item>
      <Form.Item label='Age' name='age' extra='between 18 and 60' rules={[required('age'), { type: 'number', min: 18, max: 60, message: 'Age must be between 18 and 60' }]}>
        <InputNumber style={{ width: 100 }} />
      </Form.Item>
      <Form.Item label='Tel' name='tel' rules={[required('tel'), { pattern: /^[\d\s ().-]+$/, message: 'Tel is invalid' }]}>
        <Input allowClear />
      </Form.Item>
      <Form.Item label='IPv4' name='IPv4' rules={[required('ip')]}>
        <Input allowClear />
      </Form.Item>
      <Form.Item label='Favorite Colors' name='colors' extra='select your favorite colors' rules={[required('colors')]}>
        <Checkbox.Group options={colors} />
      </Form.Item>
      <Form.Item label=' ' colon={false} style={{ marginTop: 32, marginBottom: 0 }}>
        <span data-bench='submit'><Button type='primary' htmlType='submit'>Submit</Button></span>
        <span data-bench='reset'><Button htmlType='button' onClick={() => form.resetFields()} style={{ marginInlineStart: 8 }}>Reset</Button></span>
      </Form.Item>
    </Form>
  );
}
