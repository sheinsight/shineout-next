/**
 * cn - 表单方法
 *    -- 可以通过 formRef 去获得表单的一些方法集, 包含校验, 清空校验, 提交等
 * en - Form Methods
 *    -- You can use formRef to get some methods of the form, including validation, clear validation, submission, etc
 */
import React, { useEffect, useRef, useState } from 'react';
import { Form, Input, TYPE, Button, Select, Rate, DatePicker } from 'shineout';

const star = (
  <svg viewBox='0 0 24 24' fill='currentColor' xmlns='http://www.w3.org/2000/svg'>
    <path d='M8.276 7.825L1.85649 8.7559L1.74278 8.77878C1.00761 8.96968 0.736859 9.90915 1.30093 10.4606L5.953 15.008L4.84231 21.3268L4.82911 21.4327C4.77288 22.2003 5.59415 22.7575 6.29763 22.3824L11.999 19.343L17.7023 22.3825L17.7988 22.4279C18.5105 22.7194 19.2948 22.1128 19.1578 21.3281L18.054 15.008L22.6997 10.46L22.7779 10.3745C23.2586 9.78723 22.9242 8.86973 22.1443 8.75601L15.758 7.825L12.895 2.05544C12.5264 1.31273 11.4661 1.31545 11.1013 2.06004L8.276 7.825Z' />
  </svg>
);

const StarRate = Rate(star, star);

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
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px 12px', marginBottom: 12 }}>
        <div><Button mode="outline" onClick={() => form.current?.reset()}>Reset</Button></div>
        <div><Button mode="outline" onClick={() => form.current?.submit()}>Submit</Button></div>
        <div><Button mode="outline"
          onClick={() =>
            form.current?.validate()
            .then((ok) => {
              console.log('validate success', ok);
              // TODO: 校验成功处理逻辑
            })
            .catch((errorInfo) => {
              console.log('validate failed errorInfo: >>', errorInfo)
              // TODO: 校验失败处理逻辑
            })
          }
        >
          Validate
        </Button></div>
        <div><Button mode="outline"
          onClick={() =>
            form.current?.validateFields(['name', 'password'])
            .then((ok) => {
              console.log('validate success', ok);
              // TODO: 校验成功处理逻辑
            })
            .catch((errorInfo) => {
              console.log('validate failed errorInfo: >>', errorInfo)
              // TODO: 校验失败处理逻辑
            })
          }
        >
          Validate
        </Button></div>
        <div><Button mode="outline" onClick={() => form.current?.clearValidate()}>Clear validate</Button></div>
        <div><Button mode="outline" onClick={() => console.log(form.current?.getValue())}>Get value</Button></div>
        <div><Button mode="outline" onClick={() => {
          form.current?.set({
            name: 'Tom',
            password: '123456',
            holiday: {
              startDate: '2024-10-01',
              endDate: '2024-10-07',
            },
            hobby: ['Football', 'Movie']
          })
        }}>Set value</Button></div>
        <div><Button mode="outline" onClick={() => form.current?.submit(false)}>Submit without validate</Button></div>
      </div>

      <Form.Item label='Name' required>
        <Input name='name' rules={[{ required: true, message: 'name is required' }]} clearable />
      </Form.Item>

      <Form.Item label='Rate' required>
        <StarRate name="rate" allowHalf defaultValue={3.5} />
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
          <DatePicker range name={['startDate', 'endDate']} />
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
