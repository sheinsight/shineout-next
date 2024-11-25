/**
 * cn - 滚动到错误
 *    -- 可以通过 formRef 去获得表单的一些方法集, 包含校验, 清空校验, 提交等
 * en - Form Methods
 *    -- You can use formRef to get some methods of the form, including validation, clear validation, submission, etc
 */
import React, { useState } from 'react';
import { Form, Input, Button, Tabs, Grid, Select } from 'shineout';

type ValueType = {
  public: {
    config1: {
      field1: string;
      field2: string;
      field3: string;
      field4: string;
    };
    config2: {
      field1: string;
      field2: string;
      field3: string;
      field4: string;
    };
  };
  child: {
    [key: string]: any;
  }[];
};

const App: React.FC = () => {
  const [activeParentTab, setActiveParentTab] = useState('public-panel');
  const [activeChildTab, setActiveChildTab] = useState('child-panel-0');
  const [form, setForm] = Form.useForm<ValueType>();
  const [formValue, setFormValue] = useState<ValueType>({
    public: {
      config1: {
        field1: '',
        field2: '',
        field3: '',
        field4: '',
      },
      config2: {
        field1: '',
        field2: '',
        field3: '',
        field4: '',
      },
    },
    child: [
      {
        brandName: 'github',
        configs: {
          bussName: '1',
          mockId: '1',
          slotId: '1',
        },
        childConfig: {
          liveExperience: '1',
          childBrand: '1',
          originPartnerId: '1',
        },
      },
      {
        brandName: 'gitlab',
        configs: {
          bussName: '2',
          mockId: '2',
          slotId: '2',
        },
        childConfig: {
          liveExperience: '2',
          childBrand: '2',
          originPartnerId: '2',
        },
      },
    ],
  });

  return (
    <div>
      <Form<ValueType>
        value={formValue}
        setForm={setForm}
        onChange={setFormValue}
        onSubmit={() => console.log('submit:>>', JSON.stringify(formValue, null, 2))}
        labelWidth={180}
        name='my-form'
        reserveAble
      >
        <Tabs active={activeParentTab} onChange={(tab) => setActiveParentTab(tab as string)} lazy={false}>
          <Tabs.Panel id='public-panel' tab='Public Config' style={{ padding: 12, height: 200, overflow: 'auto' }}>
            <Form.FieldSet name='public'>
              <Form.FieldSet name='config1'>
                <Form.Item label='public-config1-field1' required>
                  <Input
                    name='field1'
                    rules={[{ required: true, message: 'public-config1-field1 is required' }]}
                  />
                </Form.Item>
                <Form.Item label='public-config1-field2' required>
                  <Input
                    name='field2'
                    rules={[{ required: true, message: 'public-config1-field2 is required' }]}
                  />
                </Form.Item>
                <Form.Item label='public-config1-field3' required>
                  <Input
                    name='field3'
                    rules={[{ required: true, message: 'public-config1-field3 is required' }]}
                  />
                </Form.Item>
                <Form.Item label='public-config1-field4' required>
                  <Input
                    name='field4'
                    rules={[{ required: true, message: 'public-config1-field4 is required' }]}
                  />
                </Form.Item>
              </Form.FieldSet>
              <Form.FieldSet name='config2'>
                <Form.Item label='public-config2-field1' required>
                  <Input
                    name='field1'
                    rules={[{ required: true, message: 'public-config2-field1 is required' }]}
                  />
                </Form.Item>
                <Form.Item label='public-config2-field2' required>
                  <Input
                    name='field2'
                    rules={[{ required: true, message: 'public-config2-field2 is required' }]}
                  />
                </Form.Item>
                <Form.Item label='public-config2-field3' required>
                  <Input
                    name='field3'
                    rules={[{ required: true, message: 'public-config2-field3 is required' }]}
                  />
                </Form.Item>
                <Form.Item label='public-config2-field4' required>
                  <Input
                    name='field4'
                    rules={[{ required: true, message: 'public-config2-field4 is required' }]}
                  />
                </Form.Item>
              </Form.FieldSet>
            </Form.FieldSet>
          </Tabs.Panel>
          <Tabs.Panel id='child-panel' tab='Child Config' style={{ padding: '12px 0', height: 200, overflow: 'auto' }}>
            <Tabs
              active={activeChildTab}
              onChange={(tab) => setActiveChildTab(tab as string)}
              position='left-top'
              shape='card'
              lazy={false}
            >
              <Form.FieldSet name='child'>
                {({ index }) => {
                  return (
                    <Tabs.Panel
                      id={`child-panel-${index}`}
                      tab={`child-panel-${index}`}
                      style={{ padding: 12 }}
                    >
                      <Form.Item label={'brandName'} required>
                        <Input
                          name={'brandName'}
                          rules={[{ required: true, message: 'brandName is required' }]}
                        />
                      </Form.Item>
                      <Form.FieldSet name='detail-configs'>
                        <Grid>
                          <Grid width={1 / 3}>
                            <Form.Item label={'bussId'} required>
                              <Input
                                name={'bussId'}
                                rules={[{ required: true, message: 'bussId is required' }]}
                              />
                            </Form.Item>
                          </Grid>
                          <Grid width={1 / 3}>
                            <Form.Item label={'mockId'} required>
                              <Input
                                name={'mockId'}
                                rules={[{ required: true, message: 'mockId is required' }]}
                              />
                            </Form.Item>
                          </Grid>
                          <Grid width={1 / 3}>
                            <Form.Item label={'slotId'} required>
                              <Input
                                name={'slotId'}
                                rules={[{ required: true, message: 'slotId is required' }]}
                              />
                            </Form.Item>
                          </Grid>
                        </Grid>
                      </Form.FieldSet>
                      <Form.FieldSet name='child-config'>
                        <Form.Item label={'liveExperience'} required>
                          <Input
                            name={'liveExperience'}
                            rules={[{ required: true, message: 'liveExperience is required' }]}
                          />
                        </Form.Item>
                        <Form.Item label={'childBrand'} required>
                          <Select
                            keygen
                            name='childBrand'
                            data={[1, 2, 3]}
                            rules={[{ required: true, message: 'childBrand is required' }]}
                          />
                        </Form.Item>
                        <Form.Item label={'originPartnerId'} required>
                          <Input
                            name={'originPartnerId'}
                            rules={[{ required: true, message: 'originPartnerId is required' }]}
                          />
                        </Form.Item>
                      </Form.FieldSet>
                    </Tabs.Panel>
                  );
                }}
              </Form.FieldSet>
            </Tabs>
          </Tabs.Panel>
        </Tabs>

        <Form.Item
          label=''
          style={{
            marginTop: 12,
            marginBottom: 0,
          }}
        >
          <Grid>
            <Grid width={1 / 2}>
              <Button
                onClick={() => {
                  form
                    .validate()
                    .then((values) => {
                      console.log('validate success values: >>', values);
                    })
                    .catch((errorInfo) => {
                      console.log('validate failed errorInfo: >>', errorInfo);
                      console.log('validate failed errorInfo.message: >>', errorInfo.message);
                    });
                }}
              >
                Validate All fields
              </Button>
              <Button
                onClick={() => {
                  form
                    .validate(['public.config1.field4'])
                    .then((values) => {
                      console.log('validate success values: >>', values);
                    })
                    .catch((errorInfo) => {
                      console.log('validate failed errorInfo: >>', errorInfo);
                      console.log('validate failed errorInfo.message: >>', errorInfo.message);
                    });
                }}
              >
                Validate `public.config1.field4` only
              </Button>

              <Button
                onClick={() => {
                  form.scrollToField('public.config1.field4');
                }}
              >
                Scroll to error field
              </Button>
            </Grid>

            <Grid width={1 / 2} style={{ textAlign: 'right' }}>
              <Form.Reset>Reset</Form.Reset>
              <Form.Submit>Submit</Form.Submit>
            </Grid>
          </Grid>
        </Form.Item>
      </Form>

      {/* <pre style={{ marginLeft: 12 }}>{JSON.stringify(formValue, null, 2)}</pre> */}
    </div>
  );
};

export default App;
