import { Card, Form, Input } from 'shineout-v2';

export default function Demo() {
  return (
    <Card style={{ width: 360 }}>
      <Card.Header>Card title</Card.Header>
      <Card.Body>
        <Form labelAlign='top' onSubmit={() => {}}>
          <Form.Item label='User name :'>
            <Input name='name' defaultValue='user' />
          </Form.Item>
          <Form.Item label='Email :'>
            <Input name='email' defaultValue='test@example.com' />
          </Form.Item>
        </Form>
      </Card.Body>
      <Card.Footer align='right'>
        <Card.Submit>Submit</Card.Submit>
      </Card.Footer>
    </Card>
  );
}
