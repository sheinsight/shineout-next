import { useState } from 'react';
import { Form, Input } from 'shineout-v2';

export default function Demo() {
  const [value, setValue] = useState<any>({
    account: { name: { firstName: 'James', lastName: 'Potter' }, age: 20 },
  });
  return (
    <Form value={value} labelWidth={60} onChange={setValue} onSubmit={() => {}}>
      <Form.FieldSet name='account'>
        <Form.Item label='Name'>
          <Form.FieldSet name='name'>
            <Input.Group style={{ width: 300 }}>
              <Input name='firstName' placeholder='First Name' clearable />
              -
              <Input name='lastName' placeholder='Last Name' clearable />
            </Input.Group>
          </Form.FieldSet>
        </Form.Item>
        <Form.Item label='Age'>
          <Input name='age' digits={0} title='age' type='number' defaultValue='18' style={{ width: 100 }} clearable />
        </Form.Item>
      </Form.FieldSet>
      <Form.Item label='' style={{ marginTop: 32, marginBottom: 0 }}>
        <Form.Submit>Submit</Form.Submit>
        <Form.Reset>Reset</Form.Reset>
      </Form.Item>
    </Form>
  );
}
