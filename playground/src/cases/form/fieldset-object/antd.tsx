import { Button, Form, Input, Space } from 'antd';

// antd 的嵌套对象用数组路径：name={['account', 'name', 'firstName']}，不需要 FieldSet
export default function Demo() {
  return (
    <Form
      initialValues={{ account: { name: { firstName: 'James', lastName: 'Potter' }, age: 20 } }}
      labelCol={{ flex: '60px' }}
      wrapperCol={{ flex: 1 }}
      onFinish={() => {}}
    >
      <Form.Item label='Name'>
        <Space.Compact style={{ width: 300 }}>
          <Form.Item name={['account', 'name', 'firstName']} noStyle>
            <Input placeholder='First Name' allowClear />
          </Form.Item>
          <Form.Item name={['account', 'name', 'lastName']} noStyle>
            <Input placeholder='Last Name' allowClear />
          </Form.Item>
        </Space.Compact>
      </Form.Item>
      <Form.Item label='Age' name={['account', 'age']}>
        <Input style={{ width: 100 }} allowClear />
      </Form.Item>
      <Form.Item label=' ' colon={false} style={{ marginTop: 32, marginBottom: 0 }}>
        <Button type='primary' htmlType='submit'>Submit</Button>
        <Button htmlType='reset' style={{ marginInlineStart: 8 }}>Reset</Button>
      </Form.Item>
    </Form>
  );
}
