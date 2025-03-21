/**
 * cn - deley 0
 *    -- 调试用的，在这个例子基础上随便改吧
 * en - Test Form
 *    -- Test Form
 */
import React, { useEffect, useState } from 'react';
import { Form, DatePicker, Input, Modal, Rule, TYPE, setConfig } from 'shineout';

type Value = string[];
type FormProps = TYPE.Form.Props<Value>;

setConfig({
  delay: 0,
});

const NameInput = (props: FormProps) => {
  const { value, onChange } = props;
  // console.log("%c Line:37 🥒", "color:#7f2b82",{value});

  const {name} = value || {}

  const handleLastName = (v: string | undefined) => {
    console.log('outer onChange')
    onChange!({
      name: v
    });
  };

  useEffect(() => {
    return () => {
      console.log('💀💀NameInput Unmount')
    }
  }, [])


  // console.log("%c Line:37 🥒", "color:#7f2b82",{name});


  return (
    <div>
        <Input
         value={name} width={120} onChange={handleLastName} clearable onFocus={() => {
          console.log('focus')
        }}
        onBlur={() => {
          console.log('blur')
        }}/>
    </div>
  );
};


const App: React.FC = () => {
  const [initValue, setInitValue] = useState({
    user:{
      name: 'Harry',
    }
  });

  return (
    <Form
      value={initValue}
      onChange={v => {
        setInitValue(v)
      }}
    >
      <Form.Item label='Name'>
        <Form.Field name={'user'}>
          {({value, onChange}) => <NameInput value={value} onChange={onChange} />}
        </Form.Field>
      </Form.Item>
    </Form>
  );
};

export default App;
