/**
 * cn - 数组 name
 *    -- 数据为数组类型的组件，name 可以传入一个相应的数组，来分别处理数组内的单个数据
 * en - Array name
 *    -- When the data is an array type, the name can pass in a corresponding array to process the single data in the array
 */
import React, { useState } from 'react';
import { produce } from 'immer';
import { Form, DatePicker, Input, Modal, Rule, TYPE } from 'shineout';

type Value = string[];
type FormProps = TYPE.Form.Props<Value>;

const NameInput = (props: FormProps) => {
  const { value, onChange } = props;

  const handleLastName = (v: string | undefined) => {
    const newValue = produce(props.value, (draft: any[]) => {
      draft[1] = v;
    });
    onChange!(newValue!);
  };
  const handleFirstName = (v: string | undefined) => {
    const newValue = produce(props.value, (draft: any[]) => {
      draft[0] = v;
    });
    onChange!(newValue!);
  };

  return (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <Input value={value![0]} width={120} onChange={handleFirstName} clearable />
      <span style={{ margin: '0 4px' }}>-</span>
      <Input value={value![1]} width={120} onChange={handleLastName} clearable />
    </div>
  );
};

const rule = Rule();

const App: React.FC = () => {
  const [initValue] = useState({
    firstName: 'Harry',
    lastName: 'Potter',
    date: {
      startDate: Date.now(),
      endDate: Date.now() + 86400 * 5000,
    },
  });

  return (
    <Form
      value={initValue}
      onSubmit={(data) => {
        Modal.info({ title: 'Form Data', content: <pre>{JSON.stringify(data, null, 2)}</pre> });
      }}
    >
      <Form.Item label='Name'>
        <Form.Field name={['firstName', 'lastName']}>
          <NameInput />
        </Form.Field>
      </Form.Item>

      <Form.Item label='Date'>
        <DatePicker
          range
          rules={[rule.required]}
          name={['date.startDate', 'date.endDate']}
          clearable
        />
      </Form.Item>

      <Form.Item label='' style={{ marginTop: 32, marginBottom: 0 }}>
        <Form.Submit>Submit</Form.Submit>
      </Form.Item>
    </Form>
  );
};

export default App;
