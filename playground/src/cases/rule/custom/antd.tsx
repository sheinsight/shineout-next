import { Button, Form, Input } from 'antd';


export default function Demo() {
  const [form] = Form.useForm();
  return (
    <Form form={form} style={{ maxWidth: 500 }} labelCol={{ flex: '110px' }} wrapperCol={{ flex: 1 }} onFinish={() => {}}>
      <Form.Item label='tel' name='tel' rules={[{ validator: (_: unknown, value: string) => (value ? (/^[0-9\s ().-]+$/.test(value) ? Promise.resolve() : Promise.reject(new Error('Please enter a valid phone number'))) : Promise.reject(new Error('Please enter your phone number'))) }]}>
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
