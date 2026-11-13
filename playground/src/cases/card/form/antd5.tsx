import { Button, Card, Form, Input } from 'antd-v5';

// antd 的 Card 没有提交按钮，用 htmlType='submit' + form 属性关联到卡片里的 Form，放进 actions
export default function Demo() {
  return (
    <Card
      style={{ width: 360 }}
      title='Card title'
      actions={[
        <div key='submit' style={{ textAlign: 'right', padding: '0 16px' }}>
          <Button type='primary' htmlType='submit' form='bench-card-form'>
            Submit
          </Button>
        </div>,
      ]}
    >
      <Form id='bench-card-form' layout='vertical' initialValues={{ name: 'user', email: 'test@example.com' }}>
        <Form.Item label='User name :' name='name'>
          <Input />
        </Form.Item>
        <Form.Item label='Email :' name='email'>
          <Input />
        </Form.Item>
      </Form>
    </Card>
  );
}
