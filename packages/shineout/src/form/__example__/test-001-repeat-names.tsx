/**
 * cn - 绑定重复name
 *    --
 * en - FieldSet (Loop)
 */
import React, { useState } from 'react';
import { Button, DatePicker, Form, Input, Rule } from 'shineout';


interface Value {
  id?: string;
  case?: {
    attachments: {
      name: string;
    }[];
  };
}


const ArrayDisplayComponent = ({ value }: {value: {name: string}[]}) => {
  return value ? value.map((d, index) => <p key={index}>{d.name}</p>) : null;
}

const ArrayHandleComponent = ({ value, onChange }: any) => {
  console.log('ArrayHandleComponent value: >>', value)

  const addItem = () => {
    onChange([...(value || []), { name: `new item${value?.length || 0}` }])
  }

  const  removeItem = () => {
    if(!value) return
    onChange(value.slice(0, value.length - 1))
  }

  return <Button.Group>
    <Button onClick={addItem}>添加条目</Button>
    <Button onClick={removeItem}>删除条目</Button>
  </Button.Group>
}

const rule = Rule()

const App: React.FC = () => {
  const [value, setValue] = useState<Value>({case: {attachments: [{name: 'item1'}, {name: 'item2'}]}});

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
      <Form.Item>
        <Input name="id" rules={[rule.required()]} placeholder='有校验的字段' />
      </Form.Item>
      <Form.Item>
        <Input name="name" placeholder='无校验的字段' />
      </Form.Item>
      <Form.Item>
        <DatePicker name={['start', 'end']} range rules={[rule.required()]} placeholder='name是数组的' />
      </Form.Item>
      <Form.Field name="case.attachments" rules={[rule.required()]}>
        {/* @ts-ignore */}
        <ArrayDisplayComponent />
      </Form.Field>
      <Form.Field name="case.attachments" rules={[rule.required()]}>
        {/* @ts-ignore */}
        <ArrayHandleComponent />
      </Form.Field>
      <Form.Item label='' style={{ marginTop: 32, marginBottom: 0 }}>
        <Form.Submit>Submit</Form.Submit>
        <Form.Reset>Reset</Form.Reset>
      </Form.Item>
    </Form>
  );
};

export default App;
