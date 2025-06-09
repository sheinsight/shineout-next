/**
 * cn - FieldSet (Loop)
 *    -- FieldSet children 为函数时，根据 name 从 Form 中获取 value （类型为 array），遍历这个 value 生成一组子组件
 * en - FieldSet (Loop)
 *    -- When FieldSet's children is a function, takes the value (type is array) from the form by the name property, and generate a set of subcomponents
 */
import React, { useState } from 'react';
import { Form, Input, Rule, Button } from 'shineout';

interface FriendsItem {
  name?: string;
  age?: string;
}
interface Value {
  name?: string;
  age?: string;
  friends?: FriendsItem[];
}

const rules = Rule();

export const add = (
  <svg viewBox="0 0 24 24" width="16px" height="16px">
   <path fill='#197AFA' d="M12 1C18.0751 1 23 5.92487 23 12C23 18.0751 18.0751 23 12 23C5.92487 23 1 18.0751 1 12C1 5.92487 5.92487 1 12 1ZM12 7C11.4477 7 11 7.44772 11 8V11H8C7.48716 11 7.06449 11.386 7.00673 11.8834L7 12C7 12.5523 7.44772 13 8 13H11V16C11 16.5128 11.386 16.9355 11.8834 16.9933L12 17C12.5523 17 13 16.5523 13 16V13H16C16.5128 13 16.9355 12.614 16.9933 12.1166L17 12C17 11.4477 16.5523 11 16 11H13V8C13 7.48716 12.614 7.06449 12.1166 7.00673L12 7Z"></path>
  </svg>
);

export const cancel = (
  <svg viewBox="0 0 24 24" width="16px" height="16px">
    <path fill='#EB4242' d="M12 1C5.92487 1 1 5.92487 1 12C1 18.0751 5.92487 23 12 23C18.0751 23 23 18.0751 23 12C23 5.92487 18.0751 1 12 1ZM17 12C17 12.5523 16.5523 13 16 13H8C7.44772 13 7 12.5523 7 12C7 11.4477 7.44772 11 8 11H16C16.5523 11 17 11.4477 17 12Z"></path>
  </svg>
);

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
        <Input name='name' defaultValue='Harry Potter' clearable />
      </Form.Item>
      <Form.Item label='age'>
        <Input type='number' name='age' defaultValue='20' clearable />
      </Form.Item>
      <Form.Item label='Friends'>
        <Form.FieldSet
          name='friends'
          empty={(insert) => {
            return (
              <Button type="primary" mode="outline" onClick={() => insert({ name: '' })}>
                +
                Add new friends
              </Button>
            );
          }}
          defaultValue={[{ name: 'Hermione Granger', age: '16' }, {}]}
        >
          {({ onAppend, onRemove }) => (
            <Form.Item style={{ marginBottom: 12 }}>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <Input
                  name='name'
                  placeholder='Name'
                  title='Friend name'
                  rules={[rules.required('Name is required')]}
                  style={{ width: 180, marginInlineEnd: 8 }}
                  clearable
                />
                <Input
                  name='age'
                  type='number'
                  placeholder='Age'
                  rules={[rules.required('Age is required')]}
                  title='Friend age'
                  style={{ width: 60 }}
                  clearable
                />
                <a
                  style={{ margin: '0 12px', lineHeight: 1, cursor: 'pointer' }}
                  onClick={() => onAppend({ name: '', age: '16' })}
                >
                  {add}
                </a>
                <a style={{ lineHeight: 1, cursor: 'pointer' }} onClick={onRemove}>
                  {cancel}
                </a>
              </div>
            </Form.Item>
          )}
        </Form.FieldSet>
      </Form.Item>
      <Form.Item label='' style={{ marginTop: 20, marginBottom: 0 }}>
        <Form.Submit>Submit</Form.Submit>
        <Form.Reset>Reset</Form.Reset>
      </Form.Item>
    </Form>
  );
};

export default App;
