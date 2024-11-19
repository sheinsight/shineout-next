/**
 * cn - 多表单校验
 *    -- 可以通过 formRef 去获得表单的一些方法集, 包含校验, 清空校验, 提交等
 * en - Form Methods
 *    -- You can use formRef to get some methods of the form, including validation, clear validation, submission, etc
 */
import React, { useEffect, useState } from 'react';
import { Form, Input, Button, Tabs } from 'shineout';

type Brand = {
  name: string;
  [key: string]: any;
};

type ValueType = {
  public: {
    publicField1: string;
    publicField2: string;
  };
  brands: Brand[];
};

const App: React.FC = () => {
  const [activeParentTab, setActiveParentTab] = useState('public-panel');
  const [activeChildTab, setActiveChildTab] = useState('public-panel');
  const [form, setForm] = Form.useForm<ValueType>();
  const [formValue, setFormValue] = useState<ValueType>({
    public: {
      publicField1: '',
      publicField2: '',
    },
    brands: [
      { name: 'brand-1', desc: 'brand-1-desc' },
      { name: 'brand-2', desc: 'brand-2-desc' },
      { name: 'brand-3', desc: 'brand-3-desc' },
    ],
  });

  useEffect(() => {}, []);

  return (
    <Form<ValueType>
      value={formValue}
      setForm={setForm}
      onChange={setFormValue}
      onSubmit={() => console.log('submit:>>', JSON.stringify(formValue, null, 2))}
      labelWidth={100}
    >
      <Tabs active={activeParentTab} onChange={(tab) => setActiveParentTab(tab as string)} lazy={false}>
        <Tabs.Panel id='public-panel' tab='公共信息' style={{ padding: 12 }}>
          <Form.FieldSet name='public'>
            <Form.Item label='public-field1' required>
              <Input
                name='public-field1'
                rules={[{ required: true, message: 'public-field1 is required' }]}
              />
            </Form.Item>
            <Form.Item label='public-field2' required>
              <Input
                name='public-field2'
                rules={[{ required: true, message: 'public-field2 is required' }]}
              />
            </Form.Item>
          </Form.FieldSet>
        </Tabs.Panel>
        <Tabs.Panel id='brand-panel' tab='品牌信息' style={{ padding: '12px 0' }}>
          <Tabs
            active={activeChildTab}
            onChange={(tab) => setActiveChildTab(tab as string)}
            position='left-top'
            shape='dash'
          >
            <Form.FieldSet name='brands'>
              {({ value }) => (
                <Tabs.Panel id={`public-${value.name}`} tab={`tab-${value.name}`} style={{ padding: 12 }}>
                  <Form.FieldSet name={value.name}>
                    <Form.Item label={`brand-${value.name}`} required>
                      <Input
                        name={`brand-${value.name}`}
                        rules={[{ required: true, message: 'shein-field1 is required' }]}
                      />
                    </Form.Item>
                    <Form.Item label='shein-field2' required>
                      <Input
                        name='shein-field2'
                        rules={[{ required: true, message: 'shein-field2 is required' }]}
                      />
                    </Form.Item>
                  </Form.FieldSet>
                </Tabs.Panel>
              )}
              {/* <Tabs.Panel id='romwe-panel' tab='ROMWE' style={{ padding: 12 }}>
                <Form.FieldSet name='romwe'>
                  <Form.Item label='romwe-field1' required>
                    <Input
                      name='romwe-field1'
                      rules={[{ required: true, message: 'romwe-field1 is required' }]}
                    />
                  </Form.Item>
                  <Form.Item label='romwe-field2' required>
                    <Input
                      name='romwe-field2'
                      rules={[{ required: true, message: 'romwe-field2 is required' }]}
                    />
                  </Form.Item>
                </Form.FieldSet>
              </Tabs.Panel> */}
            </Form.FieldSet>
          </Tabs>
        </Tabs.Panel>
      </Tabs>

      <Form.Item label='' style={{ marginTop: 32, marginBottom: 0 }}>
        <Form.Submit>Submit</Form.Submit>
        <Button
          onClick={() => {
            form
              .validate()
              .then((values) => {
                console.log('======================');
                console.log('validate then values: >>', values);
                console.log('======================');
              })
              .catch((errorInfo) => {
                if (errorInfo instanceof Error) {
                }
                console.log('======================');
                console.log('errorInfo.message: >>', errorInfo.message);
                console.log('errorInfo: >>', errorInfo);
                console.log('======================');
              });
          }}
        >
          Validate
        </Button>
        <Form.Reset>Reset</Form.Reset>
      </Form.Item>
    </Form>
  );
};

export default App;
