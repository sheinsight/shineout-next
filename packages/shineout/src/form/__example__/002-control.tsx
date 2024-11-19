/**
 * cn - 表单方法
 *    -- 可以通过 formRef 去获得表单的一些方法集, 包含校验, 清空校验, 提交等
 * en - Form Methods
 *    -- You can use formRef to get some methods of the form, including validation, clear validation, submission, etc
 */
import React, { useEffect, useRef, useState } from 'react';
import { Form, Input, TYPE, Button, Select } from 'shineout';

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
      <div style={{ margin: '0 0 24px 0' }}>
        <Button onClick={() => form.current?.reset()}>reset</Button>
        <Button onClick={() => form.current?.submit()}>submit</Button>
        <Button
          onClick={() =>
            form.current?.validate()
            .then((values) => {
              console.log('validate success', values);
            })
            .catch((errorInfo) => {
              console.log('validate failed errorInfo: >>', errorInfo)
            })
          }
        >
          validate
        </Button>
        <Button onClick={() => form.current?.clearValidate()}>clear validate</Button>
        <Button onClick={() => console.log(form.current?.getValue())}>get value</Button>
        <Button onClick={() => {
          form.current?.set({
            name: 'Tom',
            password: '123456',
            holiday: {
              startDate: '2024-10-01',
              endDate: '2024-10-07',
            },
            hobby: ['Football', 'Movie']
          })
        }}>set value</Button>
        <Button onClick={() => form.current?.submit(false)}>submit without validate</Button>
      </div>

      <Form.Item label='Name' required>
        <Input name='name' rules={[{ required: true, message: 'name is required' }]} clearable />
      </Form.Item>

      <Form.Item label='Password' required>
        <Input.Password
          clearable
          name='password'
          rules={[{ required: true, message: 'password is required' }]}
        />
      </Form.Item>

      <Form.Item label='Holiday'>
        <Form.FieldSet name='holiday'>
          <Input.Group>
            <Input name='startDate' />
            <b>-</b>
            <Input name='endDate' />
          </Input.Group>
        </Form.FieldSet>
      </Form.Item>
      <Form.Item label='Hobby'>
        <Select multiple keygen data={['Football', 'Movie', 'Barbecue']} name='hobby'></Select>
      </Form.Item>

      <Form.Item label='' style={{ marginTop: 32, marginBottom: 0 }}>
        <Form.Submit>Submit</Form.Submit>
        <Form.Reset>Reset</Form.Reset>
      </Form.Item>
    </Form>
  );
};

export default App;
