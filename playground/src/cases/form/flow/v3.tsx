import { Form, Input } from 'shineout-v3';

export default function Demo() {
  return (
    <Form onSubmit={() => {}}>
      <Form.Item label='First Name'>
        <Input name='firstName' delay={0} defaultValue='Harry' clearable />
      </Form.Item>
      <Form.Item label='Last Name'>
        <Input name='lastName' delay={0} defaultValue='Potter' clearable />
      </Form.Item>
      <Form.Item label='Full Name'>
        <Form.Flow names={['firstName', 'lastName']}>
          {(datum: any) => <div style={{ lineHeight: '32px' }}>{`${datum?.get('firstName')}-${datum?.get('lastName')}`}</div>}
        </Form.Flow>
      </Form.Item>
    </Form>
  );
}
