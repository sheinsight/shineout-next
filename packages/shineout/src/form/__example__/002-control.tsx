/**
 * cn - 表单方法
 *    -- 可以通过 formRef 去获得表单的一些方法集, 包含校验, 清空校验, 提交等.
 * en - Form Methods
 *    -- You can use formRef to get some methods of the form, including validation, clear validation, submission, etc.
 */
import React, { useEffect, useRef, useState } from 'react';
import { Form, Input, TYPE, Button } from 'shineout';

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
        <Button onClick={() => form.current?.reset()}>reset</Button>
        <Button onClick={() => form.current?.submit()}>submit</Button>
        <Button
          onClick={() =>
            form.current?.validate().catch((e) => {
              console.error(e);
            })
          }
        >
          validate
        </Button>
        <Button onClick={() => form.current?.clearValidate()}>clear validate</Button>
        <Button onClick={() => console.log(form.current?.getValue())}>get value</Button>
        <Button onClick={() => form.current?.submit(false)}>submit without validate</Button>
      </div>

      <Form.Item label='name' required>
        <Input name='name' rules={[{ required: true, message: 'name is required' }]} />
      </Form.Item>

      <Form.Item label='Password' required>
        <Input.Password
          name='password'
          rules={[{ required: true, message: 'password is required' }]}
        />
      </Form.Item>

      <Form.Item label=''>
        <Form.Submit>Submit</Form.Submit>
        <Form.Reset>Reset</Form.Reset>
      </Form.Item>
    </Form>
  );
};

export default App;
