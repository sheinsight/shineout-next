/**
 * cn - 表单方法
 *    -- 可以通过 formRef 去获得表单的一些方法集, 包含校验, 清空校验, 提交等.
 * en - Form Methods
 *    -- You can use formRef to get some methods of the form, including validation, clear validation, submission, etc.
 */
import React, { useEffect, useRef, useState } from 'react';
import { Form, Input, TYPE } from 'shineout';

type ValueType = {
  name?: string;
};
type FormRef = TYPE.Form.Ref<any>;

const App: React.FC = () => {
  const form = useRef<FormRef>();
  const [value, setValue] = useState<ValueType>({});

  useEffect(() => {}, []);

  return (
    <Form
      value={value}
      formRef={(formRef) => {
        form.current = formRef;
      }}
      onChange={(v) => {
        setValue(v);
      }}
      onSubmit={(data) => {
        console.log(data);
      }}
    >
      <div style={{ margin: '20px 0' }}>
        <button type='button' onClick={() => form.current?.reset()}>
          reset
        </button>
        <button type='button' onClick={() => form.current?.submit()}>
          submit
        </button>
        <button
          type='button'
          onClick={() =>
            form.current?.validate().catch((e) => {
              console.error(e);
            })
          }
        >
          validate
        </button>
        <button type='button' onClick={() => form.current?.clearValidate()}>
          clear validate
        </button>
        <button type='button' onClick={() => console.log(form.current?.getValue())}>
          get value
        </button>
        <button type='button' onClick={() => form.current?.submit(false)}>
          submit without validate
        </button>
      </div>

      <Form.Item label='name'>
        <Input name='name' rules={[{ required: true, message: 'name is required' }]} />
      </Form.Item>

      <Form.Item label='Password'>
        <Input.Password
          name='password'
          rules={[{ required: true, message: 'password is required' }]}
        />
      </Form.Item>

      <Form.Item label=''>
        <button type='submit'>Submit</button>
        <button type='reset'>Reset</button>
      </Form.Item>
    </Form>
  );
};

export default App;
