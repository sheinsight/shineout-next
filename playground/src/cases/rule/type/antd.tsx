import { Button, Form, Input, InputNumber } from 'antd';


export default function Demo() {
  const [form] = Form.useForm();
  return (
    <Form form={form} style={{ maxWidth: 500 }} labelCol={{ flex: '110px' }} wrapperCol={{ flex: 1 }} onFinish={() => {}}>
      <Form.Item label='email' name='email' rules={[{ required: true, message: 'email is required' }, { type: 'email', message: 'email is invalid' }]}>
        <Input />
      </Form.Item>
      <Form.Item label='age' name='age' rules={[{ required: true, message: 'age is required' }, { type: 'integer', message: 'Please enter a valid age' }]}>
        <InputNumber />
      </Form.Item>
      <Form.Item label='price' name='price' rules={[{ required: true, message: 'price is required' }, { type: 'number', message: 'Please enter a valid price' }]}>
        <InputNumber />
      </Form.Item>
      <Form.Item label='url' name='url' rules={[{ required: true, message: 'url is required' }, { type: 'url', message: 'The url is not valid' }]}>
        <Input />
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
