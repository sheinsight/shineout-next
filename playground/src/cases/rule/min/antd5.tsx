import { Button, Form, Input, InputNumber } from 'antd-v5';


export default function Demo() {
  const [form] = Form.useForm();
  return (
    <Form form={form} style={{ maxWidth: 500 }} labelCol={{ flex: '110px' }} wrapperCol={{ flex: 1 }} onFinish={() => {}}>
      <Form.Item label='name' name='name' rules={[{ required: true, message: 'name is required' }, { min: 2, message: 'name must be at least 2 characters' }]}>
        <Input />
      </Form.Item>
      <Form.Item label='age' name='age' rules={[{ required: true, message: 'age is required' }, { type: 'number', min: 18, message: 'age must be at least 18' }]}>
        <InputNumber />
      </Form.Item>
      <Form.Item label='address' name='address' rules={[{ required: true, message: 'address is required' }, { type: 'number', min: 3, message: 'address must be at least three characters' }]}>
        <InputNumber />
      </Form.Item>
      <Form.Item label=' ' colon={false}>
        <span data-bench='submit'>
          <Button type='primary' htmlType='submit'>
            Submit
          </Button>
        </span>
        <span data-bench='reset'>
          <Button htmlType='button' onClick={() => form.resetFields()} style={{ marginInlineStart: 8 }}>
            Reset
          </Button>
        </span>
      </Form.Item>
    </Form>
  );
}
