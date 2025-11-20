/**
 * cn - 表单方法
 *    -- 可以通过 formRef 去获得表单的一些方法集, 包含校验, 清空校验, 提交等
 * en - Form Methods
 *    -- You can use formRef to get some methods of the form, including validation, clear validation, submission, etc
 */
import React, { useEffect, useRef, useState } from 'react';
import { Form, Input, TYPE, Button } from 'shineout';
import SelectExample from '../../select/__example__/04-bigdata';

type ValueType = {
  name?: string;
};
type FormRef = TYPE.Form.Ref<any>;

const App: React.FC = () => {
  const form = useRef<FormRef>();
  const [value1, setValue1] = useState<ValueType>({});
  const [value2, setValue2] = useState<ValueType>({});

  return (
    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
      <div style={{ flex: 1 }}>
        <Form
          value={value1}
          formRef={(formRef) => {
            form.current = formRef;
          }}
          onChange={(v) => {
            setValue1(v);
          }}
          onSubmit={(data) => {
            console.log(data);
          }}
        >
          <h4>useEffect</h4>
          <pre>{JSON.stringify(value1)}</pre>
          <Form.Item label='Name' required>
            <Input
              numType='positive'
              // integerLimit={100}
              // digits={100}
              type='number'
              // beforeChange={v => {
              //   return v?.replace?.(/[^0-9.]/g, '');
              // }}
              name='name'
              clearable
              // delay={100}
              onBlur={(e) => {
                console.log('======================');
                console.log('blur e: >>', e);
                console.log('======================');
              }}
              id='my-input'
            />
          </Form.Item>

          <div style={{ maxHeight: 100, overflow: 'hidden' }}>
            {Array.from({ length: 20 }).map((_, index) => (
              <Form.Item label={`Field ${index + 1}`} key={index}>
                <SelectExample />
              </Form.Item>
            ))}
          </div>

          <Form.Item label='' style={{ marginTop: 32, marginBottom: 0 }}>
            <Form.Submit>Submit</Form.Submit>
          </Form.Item>
        </Form>
      </div>
      <div style={{ flex: 1 }}>
        <Form
          value={value2}
          formRef={(formRef) => {
            form.current = formRef;
          }}
          onChange={(v) => {
            setValue2(v);
          }}
          onSubmit={(data) => {
            console.log(data);
          }}
          forceSyncInputValue
        >
          <h4>useLayoutEffect</h4>
          <pre>{JSON.stringify(value2)}</pre>

          <Form.Item label='Name' required>
            <Input
              numType='positive'
              // integerLimit={100}
              // digits={100}
              type='number'
              // beforeChange={v => {
              //   return v?.replace?.(/[^0-9.]/g, '');
              // }}
              name='name'
              clearable
              // delay={100}
              onBlur={(e) => {
                console.log('======================');
                console.log('blur e: >>', e);
                console.log('======================');
              }}
              id='my-input'
            />
          </Form.Item>

          <div style={{ maxHeight: 100, overflow: 'hidden' }}>
            {Array.from({ length: 20 }).map((_, index) => (
              <Form.Item label={`Field ${index + 1}`} key={index}>
                <SelectExample />
              </Form.Item>
            ))}
          </div>

          <Form.Item label='' style={{ marginTop: 32, marginBottom: 0 }}>
            <Form.Submit>Submit</Form.Submit>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default App;
