/**
 * cn - 滚动到字段
 *    -- 设置 `Form` 的 `name` 属性后，可以通过 `formRef` 的 `scrollToField` 方法滚动到指定字段
 *    -- `formRef` 的 `validateFieldsWithValue` 方法可以获取所有字段的校验信息
 * en - Form Methods
 *    -- Set the `name` property of `Form` to use the `scrollToField` method of `formRef` to scroll to the specified field
 *    -- The `validateFieldsWithValue` method of `formRef` can get the validation information of all fields
 */
import React, { useState } from 'react';
import { Form, Input, Button, Tabs, Grid, Select, Message } from 'shineout';

type ChildArrayType = {
  brandName: string;
  configs: {
    bussName: string;
    mockId: string;
    slotId: string;
  }[];
  childConfig: {
    live: string;
    brand: string;
    partner: string;
  };
};

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
  child: ChildArrayType[];
};

const panelStyle = {
  padding: 12,
  height: 200,
  overflow: 'auto',
  border: '1px solid #f0f0f0',
  borderTop: 'none',
};

const defaultFormValue = {
  public: {
    config1: {
      field1: '1',
      field2: '2',
      field3: '3',
      field4: '4',
    },
    config2: {
      field1: '5',
      field2: '6',
      field3: '7',
      field4: '8',
    },
  },
  child: [
    {
      brandName: 'github',
      configs: [
        { bussName: '1', mockId: '1', slotId: '1' },
        { bussName: '2', mockId: '2', slotId: '2' },
        { bussName: '3', mockId: '3', slotId: '3' },
      ],
      childConfig: {
        live: '1',
        brand: '1',
        partner: '1',
      },
    },
    {
      brandName: 'gitlab',
      configs: [
        { bussName: '4', mockId: '4', slotId: '4' },
        { bussName: '5', mockId: '5', slotId: '5' },
        { bussName: '6', mockId: '6', slotId: '6' },
      ],
      childConfig: {
        live: '2',
        brand: '2',
        partner: '',
      },
    },
  ],
};

const App: React.FC = () => {
  const [activeParentTab, setActiveParentTab] = useState('public-panel');
  const [activeChildTab, setActiveChildTab] = useState('child-panel-0');

  const [formValue, setFormValue] = useState<ValueType>(defaultFormValue);
  const [form, setForm] = Form.useForm<ValueType>();

  const [field1, setField1] = useState<string | undefined>();
  const [field2, setField2] = useState<string | undefined>();

  const myCustomScrollToField = (fieldName: string) => {
      // 示例这里根据字段名判断模拟交互，开发者以实际情况处理
      if (fieldName.startsWith('public')) {
        setActiveParentTab('public-panel');
      } else {
        // 切换至child-panel
        setActiveParentTab('child-panel');

        const index = fieldName.match(/\d+/)?.[0];
        // 切换至对应的child-panel-index
        setActiveChildTab(`child-panel-${index}`);
      }

      setTimeout(() => {
        form.scrollToField(fieldName);
      });
  };

  const handleMySubmit = () => {
    form
      .validateFieldsWithValue()
      .then((v) => {
        Message.success('submit success');

        console.log('submit success:>>', JSON.stringify(v, null, 2));
        form.submit();
      })
      .catch((errorInfo) => {
        Message.error('submit failed');

        console.log('submit failed:>>', errorInfo);
        if (errorInfo.errorFields.length > 0) {
          const firstErrorFieldName = errorInfo.errorFields[0].name as string;
          console.log('firstErrorFieldName: >>', firstErrorFieldName);

          // 滚动到错误字段
          myCustomScrollToField(firstErrorFieldName);
        }
      });
  };

  return (
    <Form<ValueType>
      value={formValue}
      setForm={setForm}
      onChange={setFormValue}
      onSubmit={() => console.log('submit:>>', JSON.stringify(formValue, null, 2))}
      labelWidth={200}
      name='my-form'
      reserveAble
      scrollToError
    >
      <Tabs
        active={activeParentTab}
        onChange={(tab) => setActiveParentTab(tab as string)}
        lazy={false}
      >
        <Tabs.Panel id='public-panel' tab='Public Config' style={panelStyle}>
          <Form.FieldSet name='public'>
            <Form.FieldSet name='config1'>
              <Form.Item label='public.config1.field1' required>
                <Input
                  name='field1'
                  rules={[{ required: true, message: 'public.config1.field1 is required' }]}
                />
              </Form.Item>
              <Form.Item label='public.config1.field2' required>
                <Input
                  name='field2'
                  rules={[{ required: true, message: 'public.config1.field2 is required' }]}
                />
              </Form.Item>
              <Form.Item label='public.config1.field3' required>
                <Input
                  name='field3'
                  rules={[{ required: true, message: 'public.config1.field3 is required' }]}
                />
              </Form.Item>
              <Form.Item label='public.config1.field4' required>
                <Input
                  name='field4'
                  rules={[{ required: true, message: 'public.config1.field4 is required' }]}
                />
              </Form.Item>
            </Form.FieldSet>
            <Form.FieldSet name='config2'>
              <Form.Item label='public.config2.field1' required>
                <Input
                  name='field1'
                  rules={[{ required: true, message: 'public.config2.field1 is required' }]}
                />
              </Form.Item>
              <Form.Item label='public.config2.field2' required>
                <Input
                  name='field2'
                  rules={[{ required: true, message: 'public.config2.field2 is required' }]}
                />
              </Form.Item>
              <Form.Item label='public.config2.field3' required>
                <Input
                  name='field3'
                  rules={[{ required: true, message: 'public.config2.field3 is required' }]}
                />
              </Form.Item>
              <Form.Item label='public.config2.field4' required>
                <Input
                  name='field4'
                  rules={[{ required: true, message: 'public.config2.field4 is required' }]}
                />
              </Form.Item>
            </Form.FieldSet>
            <Form.FieldSet name='config3' defaultValue={['1', '2']}>
              {({ value, onChange, index }) => (
                <Form.Item label={`public.config3[${index}]`} required>
                  <Input value={value} onChange={(v) => onChange(v as string)} rules={[{ required: true, message: `public.config3[${index}] is required` }]} />
                </Form.Item>
              )}
            </Form.FieldSet>
            <Form.Item label='public.config4' required>
              <Form.Field name='config4' defaultValue={'4'} rules={[{ required: true, message: 'public.config4 is required' }]}>
                <Input />
              </Form.Field>
            </Form.Item>
          </Form.FieldSet>
        </Tabs.Panel>
        <Tabs.Panel id='child-panel' tab='Child Config' style={panelStyle}>
          <Tabs
            active={activeChildTab}
            onChange={(tab) => setActiveChildTab(tab as string)}
            position='left-top'
            shape='card'
            lazy={false}
            allowNonPanel
          >
            <Form.FieldSet name='child'>
              {({ index }) => {
                return (
                  <Tabs.Panel
                    id={`child-panel-${index}`}
                    tab={`child-panel-${index}`}
                    style={{ padding: 12 }}
                  >
                    <Form.Item label={`child[${index}].brandName`} required>
                      <Input
                        name={'brandName'}
                        rules={[{ required: true, message: 'brandName is required' }]}
                      />
                    </Form.Item>
                    <Form.FieldSet name='configs'>
                      {({index: nestIndex}) => (
                        <Grid>
                          <Grid width={1 / 3}>
                            <Form.Item label={`child[${index}].configs[${nestIndex}].bussName`} required>
                              <Input
                                name={'bussName'}
                                rules={[{ required: true, message: 'bussName is required' }]}
                              />
                            </Form.Item>
                          </Grid>
                          <Grid width={1 / 3}>
                            <Form.Item label={`child[${index}].configs[${nestIndex}].mockId`} required>
                              <Input
                                name={'mockId'}
                                rules={[{ required: true, message: 'mockId is required' }]}
                              />
                            </Form.Item>
                          </Grid>
                          <Grid width={1 / 3}>
                            <Form.Item label={`child[${index}].configs[${nestIndex}].slotId`} required>
                              <Input
                                name={'slotId'}
                                rules={[{ required: true, message: 'slotId is required' }]}
                              />
                            </Form.Item>
                          </Grid>
                        </Grid>
                      )}
                    </Form.FieldSet>
                    <Form.FieldSet name='childConfig'>
                      <Form.Item label={`child[${index}].childConfig.live`} required>
                        <Input
                          name={'live'}
                          rules={[{ required: true, message: 'live is required' }]}
                        />
                      </Form.Item>
                      <Form.Item label={`child[${index}].childConfig.brand`} required>
                        <Select
                          keygen
                          name='brand'
                          data={[1, 2, 3]}
                          rules={[{ required: true, message: 'brand is required' }]}
                        />
                      </Form.Item>
                      <Form.Item label={`child[${index}].childConfig.partner`} required>
                        <Input
                          name={'partner'}
                          rules={[{ required: true, message: 'partner is required' }]}
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

      <Grid style={{ marginTop: 12 }}>
        <Grid width={2 / 3} style={{ display: 'inline-flex', gap: 12 }}>
          <div>
            <p style={{ marginBottom: 8 }}>方法1: form.validateFieldsWithValue</p>
            <Input.Group style={{ overflow: 'hidden' }}>
              <Input placeholder='Field Name' value={field1} onChange={setField1} />
              <Button
                type="primary"
                style={{ borderRadius: 0 }}
                onClick={() => {
                  form
                    .validateFieldsWithValue(field1)
                    .then((values) => {
                      Message.success(`${field1} validate success`);
                      console.log('validate success values: >>', values);
                    })
                    .catch((errorInfo) => {
                      Message.error('validate failed');
                      console.log('validate failed errorInfo: >>', errorInfo);
                    });
                }}
              >
                Validate
              </Button>
            </Input.Group>
          </div>

          <div>
            <p style={{ marginBottom: 8 }}>方法2: form.scrollToField</p>
            <Input.Group style={{ overflow: 'hidden' }}>
              <Input placeholder='Field Name' value={field2} onChange={setField2} />
              <Button
                type="primary"
                style={{ borderRadius: 0 }}
                onClick={() => {
                  if (field2) {
                    myCustomScrollToField(field2);
                  }
                }}
              >
                Scroll
              </Button>
            </Input.Group>
          </div>
        </Grid>

        <Grid width={1 / 3} style={{ textAlign: 'right' }}>
          <p style={{ marginBottom: 8 }}>&nbsp;</p>
          <Form.Reset>Reset</Form.Reset>
          <Button type='primary' onClick={handleMySubmit}>
            My Submit
          </Button>
        </Grid>
      </Grid>
    </Form>
  );
};

export default App;
