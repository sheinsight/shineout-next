/**
 * cn - FieldSet (Loop)
 *    -- FieldSet children 为函数时，根据 name 从 Form 中获取 value （类型为 array），遍历这个 value 生成一组子组件
 * en - FieldSet (Loop)
 *    -- When FieldSet's children is a function, takes the value (type is array) from the form by the name property, and generate a set of subcomponents
 */
import React, { useState } from 'react';
import { Form, Input, Rule } from 'shineout';

interface Value {
  account?: {
    name?: {
      firstName: string;
      lastName: string;
    };
    age?: string;
  };
}

const rules = Rule();

const add = (
  <svg width='16' height='16' viewBox='0 0 16 16' fill='none' xmlns='http://www.w3.org/2000/svg'>
    <g clipPath='url(#clip0_2710_88158)'>
      <path
        d='M8.00008 0.666626C12.0502 0.666626 15.3334 3.94987 15.3334 7.99996C15.3334 12.05 12.0502 15.3333 8.00008 15.3333C3.94999 15.3333 0.666748 12.05 0.666748 7.99996C0.666748 3.94987 3.94999 0.666626 8.00008 0.666626ZM8.00008 4.66663C7.63189 4.66663 7.33341 4.9651 7.33341 5.33329V7.33329H5.33341C4.99152 7.33329 4.70974 7.59065 4.67123 7.92221L4.66675 7.99996C4.66675 8.36815 4.96522 8.66663 5.33341 8.66663H7.33341V10.6666C7.33341 11.0085 7.59077 11.2903 7.92233 11.3288L8.00008 11.3333C8.36827 11.3333 8.66675 11.0348 8.66675 10.6666V8.66663H10.6667C11.0086 8.66663 11.2904 8.40927 11.3289 8.07771L11.3334 7.99996C11.3334 7.63177 11.0349 7.33329 10.6667 7.33329H8.66675V5.33329C8.66675 4.9914 8.40939 4.70962 8.07783 4.67111L8.00008 4.66663Z'
        fill='#197AFA'
      />
    </g>
    <defs>
      <clipPath id='clip0_2710_88158'>
        <rect width='16' height='16' fill='white' />
      </clipPath>
    </defs>
  </svg>
);

const cancel = (
  <svg width='32' height='34' viewBox='0 0 32 34' fill='none' xmlns='http://www.w3.org/2000/svg'>
    <g clipPath='url(#clip0_2710_88188)'>
      <path
        d='M16.0001 9.66663C11.95 9.66663 8.66675 12.9499 8.66675 17C8.66675 21.05 11.95 24.3333 16.0001 24.3333C20.0502 24.3333 23.3334 21.05 23.3334 17C23.3334 12.9499 20.0502 9.66663 16.0001 9.66663ZM19.3334 17C19.3334 17.3681 19.0349 17.6666 18.6667 17.6666H13.3334C12.9652 17.6666 12.6667 17.3681 12.6667 17C12.6667 16.6318 12.9652 16.3333 13.3334 16.3333H18.6667C19.0349 16.3333 19.3334 16.6318 19.3334 17Z'
        fill='#EB4242'
      />
    </g>
    <defs>
      <clipPath id='clip0_2710_88188'>
        <rect width='16' height='16' fill='white' transform='translate(8 9)' />
      </clipPath>
    </defs>
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
              <button type={'button'} onClick={() => insert({ name: '' })}>
                Add new friends
              </button>
            );
          }}
          defaultValue={[{ name: 'Hermione Granger', age: '16' }, {}]}
        >
          {({ onAppend, onRemove }) => (
            <Form.Item style={{ display: 'flex', alignItems: 'center', marginBottom: 12 }}>
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
            </Form.Item>
          )}
        </Form.FieldSet>
      </Form.Item>
      <Form.Item label='' style={{ marginTop: 32, marginBottom: 0 }}>
        <Form.Submit>Submit</Form.Submit>
        <Form.Reset>Reset</Form.Reset>
      </Form.Item>
    </Form>
  );
};

export default App;
