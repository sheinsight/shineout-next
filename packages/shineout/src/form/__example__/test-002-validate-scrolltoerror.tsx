/**
 * cn - Form nested
 *    -- 表单嵌套
 * en - Form Nested
 *    -- Form nested
 */
import React from 'react';
import { Form, Input } from 'shineout';

type ValueType = any;

const App: React.FC = () => {
  return (
    <div>
      <Form<ValueType>
        labelWidth={100}
        name="form1"
        onSubmit={(v) => console.log('parent form submit:>>', JSON.stringify(v, null, 2))}
        onChange={(v) => {
          console.log('parent form onChange:>>', JSON.stringify(v, null, 2));
        }}
        onReset={() => {
          console.log('form1 reset');
        }}
      >
        <Form.Item label='parent-input1'>
          <Input name='parent-input1' />
        </Form.Item>

        <Form.Item label='parent-input2'>
          <Input name='parent-input2' />
        </Form.Item>

        <Form
          name='child-form'
          onSubmit={(v) => console.log('child form submit:>>', JSON.stringify(v, null, 2))}
          onReset={() => {
            console.log('form2 reset');
          }}
          onChange={(v) => {
            console.log('child form onChange:>>', JSON.stringify(v, null, 2));
          }}
          style={{ padding: 12, margin: 12, background: '#f0f0f0' }}
        >
          <Form.Item label='child-input1'>
            <Input name='child-input1' />
          </Form.Item>

          <Form.Item labelAlign='right' label=''>
            <Form.Submit>Child Form Submit</Form.Submit>
            <Form.Reset type='warning'>Child Form Reset</Form.Reset>
          </Form.Item>
        </Form>

        <Form.Item labelAlign='right' label=''>
          <Form.Submit>Parent Form Submit</Form.Submit>
          <Form.Reset type='warning'>Parent Form Reset</Form.Reset>
        </Form.Item>
      </Form>

      {/* <form
        onSubmit={(e) => {
          e.preventDefault();
          console.log('form1');
        }}
        onReset={() => {
          console.log('form1 reset');
        }}
      >
        <input type='text' name='test1' />

        <form
          onSubmit={(e) => {
            e.preventDefault();
            console.log('form1');
          }}
          onReset={(e) => {
            e.preventDefault();
            console.log('form2 reset');
          }}
        >
          <input type='text' name='test2' />
          <button type='submit'>submit2</button>
          <button type='reset'>reset2</button>
        </form>

        <button type='submit'>submit1</button>
        <button type='reset'>reset1</button>
      </form> */}
    </div>
  );
};

export default App;
