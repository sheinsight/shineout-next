/**
 * cn - 表单
 *    -- Card.Submit 可以用来触发 Card 内部表单提交
 * en - Form
 *    -- Use Card.submit to trigger the submimt event of the form in the card
 */
import React from 'react';
import { Card, Form, Input } from 'shineout';

const App: React.FC = () => (
  <Card style={{ width: 360 }}>
    <Card.Header>Card title</Card.Header>
    <Card.Body>
      <Form
        labelAlign='top'
        onSubmit={(data) => {
          console.log(data);
        }}
      >
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

export default App;
