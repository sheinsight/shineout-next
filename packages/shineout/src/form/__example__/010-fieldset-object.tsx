/**
 * cn - FieldSet (Object)
 *    -- Form.FieldSet 可以处理对象类型的字段
 * en - FieldSet (Object)
 *    -- Form.FieldSet handles fields of object type
 */
import React, { useState } from 'react';
import { Form, Input } from 'shineout';

interface Value {
  account?: {
    name?: {
      firstName: string;
      lastName: string;
    };
    age?: number;
  };
}

const App: React.FC = () => {
  const [value, setValue] = useState<Value>({
    account: {
      name: {
        firstName: 'James',
        lastName: 'Potter',
      },
      age: 20,
    },
  });

  const handleChange = (v: Value) => {
    setValue(v);
  };

  return (
    <Form
      value={value}
      labelWidth={60}
      onChange={handleChange}
      onSubmit={(data) => {
        console.log(data);
      }}
    >
      <Form.Item label='Account'>
        <Form.FieldSet name='account'>
          <Form.Item label='Name'>
            <Form.FieldSet name='name'>
              <Input.Group style={{ width: 300 }}>
                <Input name='firstName' placeholder='First Name' />
                -
                <Input name='lastName' placeholder='Last Name' />
              </Input.Group>
            </Form.FieldSet>
          </Form.Item>

          <Form.Item label='Age'>
            <Input
              name='age'
              digits={0}
              title='age'
              type='number'
              defaultValue='18'
              style={{ width: 100 }}
            />
          </Form.Item>
        </Form.FieldSet>
      </Form.Item>
      <Form.Item label=''>
        <button type='submit'>Submit</button>
        <button type='reset'>Reset</button>
      </Form.Item>
    </Form>
  );
};

export default App;
