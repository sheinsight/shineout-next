import { Form, Input } from 'shineout-v3';

export default function Demo() {
  return (
    <Form
      styles={{
        root: { border: '2px solid #1890ff', borderRadius: 8, padding: 24 },
        label: { fontWeight: 600, color: '#1890ff' },
        tip: { color: '#999', fontSize: 12 },
      }}
    >
      <Form.Item label='Name' tip='Please enter your real name' required>
        <Input placeholder='Enter your name' />
      </Form.Item>
      <Form.Item label='Email' tip='We will not share your email' styles={{ label: { color: '#52c41a' } }}>
        <Input placeholder='Enter your email' />
      </Form.Item>
    </Form>
  );
}
