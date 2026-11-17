import { Button, Form, Input, InputNumber } from 'antd';


export default function Demo() {
  const [form] = Form.useForm();
  return (
    <Form form={form} style={{ maxWidth: 500 }} labelCol={{ flex: '110px' }} wrapperCol={{ flex: 1 }} onFinish={() => {}}>
      <Form.Item label='name' name='name' rules={[{ required: true, message: 'name is required' }, { min: 1, max: 5, message: 'name must be 1 - 5 characters' }]}>
        <Input />
      </Form.Item>
      <Form.Item label='age' name='age' rules={[{ required: true, message: 'age is required' }, { type: 'number', min: 18, max: 100, message: 'age must be between 18 and 100' }]}>
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
