import { Form, Input } from 'antd-v5';

// antd 用 Form.Item 的 shouldUpdate 或 Form.useWatch 实现联动；这里用 shouldUpdate，对应 Shineout 的 Form.Flow
export default function Demo() {
  return (
    <Form labelCol={{ flex: '100px' }} wrapperCol={{ flex: 1 }} initialValues={{ firstName: 'Harry', lastName: 'Potter' }}>
      <Form.Item label='First Name' name='firstName'>
        <Input allowClear />
      </Form.Item>
      <Form.Item label='Last Name' name='lastName'>
        <Input allowClear />
      </Form.Item>
      <Form.Item label='Full Name' shouldUpdate>
        {({ getFieldValue }) => <div style={{ lineHeight: '32px' }}>{`${getFieldValue('firstName')}-${getFieldValue('lastName')}`}</div>}
      </Form.Item>
    </Form>
  );
}
