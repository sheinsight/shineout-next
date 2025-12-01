/**
 * cn - FieldSet rules不可见问题
 *    --
 * en - FieldSet-rules
 *    --
 */
import React, { useState } from 'react';
import { Form, Input, Radio, Rule, Button } from 'shineout';
const OldExample = () => {
  const [value, setValue] = useState({});

  const handleChange = (v: any, b) => {
    switch (v.a) {
      case '1':
        v.b = '1';
        break;
      case '2':
        v.b = '2';
        break;
      case '3':
        v.b = '3';
        break;
      default:
        v.b = '';
        break;
    }
    setValue(v);
  };

  return (
    <Form value={value} onChange={handleChange}>
      <Radio.Group name='a' keygen data={['1', '2', '3']}></Radio.Group>
      <Input name='b'></Input>

      <Form.Submit>Submit</Form.Submit>
      <Form.Reset>Reset</Form.Reset>
    </Form>
  );
};
interface FriendsItem {
  attribute_extra_id?: string;
  attribute_extra_value?: string;
}
interface Value {
  name?: string;
  age?: string;
  friends?: FriendsItem[];
}

const rules = Rule({
  attributeSumChecked: {
    func: (value = [], formData, callback, props) => {
      const result = [];
      for (const [index, { attribute_value_id, attribute_extra_value }] of value.entries()) {
        if (!attribute_value_id && attribute_extra_value) {
          result[index] = { attribute_value_id: new Error('attribute_value_id 不能为空') };
        }
        if (!attribute_extra_value && attribute_value_id) {
          result[index] = { attribute_extra_value: new Error('attribute_extra_value 不能为空') };
        }
        if (value?.length > 1 && !attribute_value_id && !attribute_extra_value) {
          result[index] = {
            attribute_value_id: new Error('attribute_value_id 不能为空'),
            attribute_extra_value: new Error(''),
          };
        }
      }
      if (result.length > 0) {
        callback(result);
      } else {
        callback(true);
      }
    },
  },
});

export const add = (
  <svg viewBox='0 0 24 24' width='16px' height='16px'>
    <path
      fill='#197AFA'
      d='M12 1C18.0751 1 23 5.92487 23 12C23 18.0751 18.0751 23 12 23C5.92487 23 1 18.0751 1 12C1 5.92487 5.92487 1 12 1ZM12 7C11.4477 7 11 7.44772 11 8V11H8C7.48716 11 7.06449 11.386 7.00673 11.8834L7 12C7 12.5523 7.44772 13 8 13H11V16C11 16.5128 11.386 16.9355 11.8834 16.9933L12 17C12.5523 17 13 16.5523 13 16V13H16C16.5128 13 16.9355 12.614 16.9933 12.1166L17 12C17 11.4477 16.5523 11 16 11H13V8C13 7.48716 12.614 7.06449 12.1166 7.00673L12 7Z'
    ></path>
  </svg>
);

export const cancel = (
  <svg viewBox='0 0 24 24' width='16px' height='16px'>
    <path
      fill='#EB4242'
      d='M12 1C5.92487 1 1 5.92487 1 12C1 18.0751 5.92487 23 12 23C18.0751 23 23 18.0751 23 12C23 5.92487 18.0751 1 12 1ZM17 12C17 12.5523 16.5523 13 16 13H8C7.44772 13 7 12.5523 7 12C7 11.4477 7.44772 11 8 11H16C16.5523 11 17 11.4477 17 12Z'
    ></path>
  </svg>
);

const App: React.FC = () => {
  const [value, setValue] = useState<Value>({});

  const handleChange = (v: Value) => {
    setValue(v);
  };

  return (
    <div>
      <h4>新例子：</h4>
      <Form
      value={value}
      labelWidth={60}
      onChange={handleChange}
      onSubmit={(data) => {
        console.log(data);
      }}
    >
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
          defaultValue={[{ attribute_value_id: 'Hermione Granger' }]}
          rules={[rules.attributeSumChecked()]}
        >
          {({ onAppend, onRemove }) => (
            <Form.Item style={{ marginBottom: 12 }}>
              <div style={{ display: 'flex'}}>
                <Form.Item label="attribute_value_id">
                <Input
                  name='attribute_value_id'
                  placeholder='Name'
                  title='Friend name'
                  // rules={[rules.range(1, 5, 'attribute_value_id length should be between 1 and 5')]}
                  style={{ width: 180, marginInlineEnd: 8 }}
                  clearable
                />
                </Form.Item>
                <Form.Item label="attribute_extra_value">
                <Input
                  name='attribute_extra_value'
                  placeholder='Name'
                  title='Friend name'
                  // rules={[rules.range(1, 5, 'attribute_value_id length should be between 1 and 5')]}
                  style={{ width: 180, marginInlineEnd: 8 }}
                  clearable
                />
                </Form.Item>
                <a
                  style={{ margin: '0 12px', lineHeight: 1, cursor: 'pointer' }}
                  onClick={() => onAppend({ attribute_value_id: '' })}
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
      <h4>老例子：</h4>
      <OldExample />
    </div>
  );
};

export default App;