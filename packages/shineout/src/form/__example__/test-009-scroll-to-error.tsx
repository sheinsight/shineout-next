/**
 * cn - scrollToError
 *    -- 设置 scrollToError 属性，当表格内部发生错误时，自动滚动到错误行
 * en - scrollToError
 *    -- Set the scrollToError property, when an error occurs inside the table, automatically scroll to the error row
 */
import React, { useState } from 'react';
import { Form, Input, Rule } from 'shineout';

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


const App: React.FC = () => {
  const [value, setValue] = useState<Value>({});

  const handleChange = (v: Value) => {
    setValue(v);
  };

  return (
    <div style={{ height: '300px', overflow: 'scroll'}} id="scrollContainer">
    <Form
      value={value}
      labelWidth={60}
      onChange={handleChange}
      onSubmit={(data) => {
        console.log(data);
      }}
      scrollParent={() => document.getElementById('scrollContainer')}
      scrollToError
    >
      <Form.Submit>Submit</Form.Submit>
      <Form.Item label='Name'>
        <Input name='name' defaultValue='Harry Potter' clearable />
      </Form.Item>
      <Form.Item label='age'>
        <Input type='number' name='age' defaultValue='20' clearable />
      </Form.Item>
      <Form.Item label='age'>
        <Input type='number' name='age1' defaultValue='20' clearable />
      </Form.Item>
      <Form.Item label='age'>
        <Input type='number' name='age2' defaultValue='20' clearable />
      </Form.Item>
      <Form.Item label='age'>
        <Input type='number' name='age3' defaultValue='20' clearable />
      </Form.Item>
      <Form.Item label='age'>
        <Input type='number' name='age4' defaultValue='20' clearable />
      </Form.Item>
      <Form.Item label='age'>
        <Input type='number' name='age5' defaultValue='20' clearable />
      </Form.Item>
      <Form.Item label='age'>
        <Input type='number' name='age6' defaultValue='20' clearable />
      </Form.Item>
      <Form.Item label='age'>
        <Input type='number' name='age7' defaultValue='20' clearable />
      </Form.Item>
      <Form.Item label='age'>
        <Input type='number' name='age8' defaultValue='20' clearable />
      </Form.Item>
      <Form.Item label='age'>
        <Input type='number' name='age9' defaultValue='20' clearable />
      </Form.Item>
      <Form.Item label='age'>
        <Input type='number' name='age10' defaultValue='20' clearable />
      </Form.Item>
      <Form.Item label='age'>
        <Input type='number' name='age11' defaultValue='20' clearable />
      </Form.Item>
      <Form.Item label='age'>
        <Input type='number' name='age12' defaultValue='20' clearable />
      </Form.Item>
      <Form.Item label='age'>
        <Input type='number' name='age13' defaultValue='20' clearable />
      </Form.Item>
      <Form.Item label='age'>
        <Input type='number' name='age14' defaultValue='20' clearable />
      </Form.Item>
      <Form.Item label='age'>
        <Input type='number' name='age15' defaultValue='20' clearable />
      </Form.Item>
      <Form.Item label='age' required>
        <Input name='age16' clearable rules={[rules.required()]} />
      </Form.Item>
      <Form.Item label='' style={{ marginTop: 20, marginBottom: 0 }}>
        <Form.Submit>Submit</Form.Submit>
        <Form.Reset>Reset</Form.Reset>
      </Form.Item>
    </Form>
    </div>

  );
};

export default App;
