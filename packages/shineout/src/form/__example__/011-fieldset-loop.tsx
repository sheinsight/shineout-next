/**
 * cn - FieldSet (Loop)
 *    -- FieldSet children 为函数时，根据 name 从 Form 中获取 value （类型为 array），遍历这个 value 生成一组子组件。
 * en - FieldSet (Loop)
 *    -- When FieldSet's children is a function, takes the value (type is array) from the form by the name property, and generate a set of subcomponents.
 */
import React, { useState } from 'react';
import { Form, Input, Rule } from 'shineout';

interface Value {
  account?: {
    name?: {
      firstName: string;
      lastName: string;
    };
    age?: number;
  };
}

const rules = Rule();

const App: React.FC = () => {
  const [value, setValue] = useState<Value>({});

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
      <Form.Item label='Name'>
        <Input name='name' defaultValue='Harry Potter' />
      </Form.Item>
      <Form.Item label='age'>
        <Input type='number' name='age' defaultValue='20' />
      </Form.Item>
      <Form.Item label='Friends'>
        <Form.FieldSet
          name='friends'
          empty={(insert) => {
            return (
              <button type={'button'} onClick={() => insert({ name: '' })}>
                Add new friends
              </button>
            );
          }}
          defaultValue={[{ name: 'Hermione Granger', age: 16 }, {}]}
        >
          {({ onAppend, onRemove }) => (
            <Form.Item style={{ display: 'flex', alignItems: 'center', marginBottom: 12 }}>
              <Input
                name='name'
                placeholder='Name'
                title='Friend name'
                rules={[rules.required('Name is required')]}
                style={{ width: 180, marginInlineEnd: 8 }}
              />
              <Input
                name='age'
                type='number'
                placeholder='Age'
                rules={[rules.required('Age is required')]}
                title='Friend age'
                style={{ width: 60 }}
              />
              <a style={{ margin: '0 12px' }} onClick={() => onAppend({ name: '', age: 16 })}>
                +
              </a>
              <a onClick={onRemove}>-</a>
            </Form.Item>
          )}
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
