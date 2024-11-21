/**
 * cn - 滚动到错误
 *    -- 可以通过 formRef 去获得表单的一些方法集, 包含校验, 清空校验, 提交等
 * en - Form Methods
 *    -- You can use formRef to get some methods of the form, including validation, clear validation, submission, etc
 */
import React, { useState } from 'react';
import { Form, Input, Button, Tabs, Grid, Select, DatePicker } from 'shineout';
import testFromValue from './temp/test-form-value';

type ValueType = any;

const App: React.FC = () => {
  const [activeParentTab, setActiveParentTab] = useState('public-panel');
  const [activeChildTab, setActiveChildTab] = useState('child-panel-0');
  const [form, setForm] = Form.useForm<ValueType>();
  const [formValue, setFormValue] = useState<ValueType>(testFromValue);

  return (
    <div style={{ display: 'flex', height: '100%', overflow: 'auto' }}>
      <Form<ValueType>
        value={formValue}
        setForm={setForm}
        onChange={setFormValue}
        onSubmit={() => console.log('submit:>>', JSON.stringify(formValue, null, 2))}
        labelWidth={100}
        name="my-form"
        reserveAble
        // style={{ width: '60%', position: 'sticky', top: 0 }}
      >
        <Form.Item label='' style={{ marginTop: 32, marginBottom: 0, display: 'flex', flexDirection: 'column', gap: 8 }}>
          <Form.Submit>Submit</Form.Submit>
          <Button
            onClick={() => {
              form
                .validate()
                .then((values) => {
                  console.log('======================');
                  console.log('validate success values: >>', values);
                  console.log('======================');
                })
                .catch((errorInfo) => {
                  console.log('======================');
                  console.log('validate failed errorInfo: >>', errorInfo);
                  console.log('validate failed errorInfo.message: >>', errorInfo.message);
                  console.log('======================');
                });
            }}
          >
            Validate All fields
          </Button>
          <Button
            onClick={() => {
              form
                .validate(['request.commonPartnerUpsertReq.labelRuleInfo[0].ruleEnumList'])
                .then((values) => {
                  console.log('======================');
                  console.log('validate success values: >>', values);
                  console.log('======================');
                })
                .catch((errorInfo) => {
                  console.log('======================');
                  console.log('validate failed errorInfo: >>', errorInfo);
                  console.log('validate failed errorInfo.message: >>', errorInfo.message);
                  console.log('======================');
                });
            }}
          >
            Validate `ruleEnumList` only
          </Button>

          <Button
            onClick={() => {
              form.scrollToField('request.brandPartnerUpsertReq[0].brandId')
            }}
          >
            scroll to field
          </Button>

          <Form.Reset>Reset</Form.Reset>
        </Form.Item>


        <div style={{background: '#f3f4f5', height: 500, borderRadius: 8, marginBottom: 20 }}></div>
        <Input name="root-field1" defaultValue='root-field1' />
        <DatePicker range name={['startDate1', 'endDate1']} defaultValue={['2024-01-01', '2024-01-02']} />
        <div style={{display: 'none'}} id="root-field1">
          <Input name="root-field2" defaultValue='root-field2' />
        </div>
        <Select
          keygen
          name='ruleEnumList'
          data={[1, 2, 3]}
          rules={[{ required: true, message: 'ruleEnumList is required' }]}
        />
        <Form.FieldSet name='request'>
          <Tabs active={activeParentTab} onChange={(tab) => setActiveParentTab(tab as string)}>
            <Tabs.Panel id='public-panel' tab='公共信息' style={{ padding: 12 }}>
              <DatePicker range name={['startDate2', 'endDate2']} defaultValue={['2024-02-01', '2024-02-02']} />
              <Form.FieldSet name='commonPartnerUpsertReq'>
                <Form.FieldSet name='updatePartnerRequest'>
                  <Form.Item label='partnerId' required>
                    <Input
                      name='partnerId'
                      rules={[{ required: true, message: 'partnerId is required' }]}
                    />
                  </Form.Item>
                  <Form.Item label='bodyType' required>
                    <Input
                      name='bodyType'
                      rules={[{ required: true, message: 'bodyType is required' }]}
                    />
                  </Form.Item>
                </Form.FieldSet>
                <Form.FieldSet
                  name='labelRuleInfo'
                  defaultValue={[{ fieldId: 77, ruleFieldId: 231, ruleEnumList: [] }]}
                >
                  {() => (
                    <Grid>
                      <Grid width={1 / 3}>
                        <Form.Item label='fieldId' required>
                          <Input
                            name='fieldId'
                            rules={[{ required: true, message: 'fieldId is required' }]}
                          />
                        </Form.Item>
                      </Grid>
                      <Grid width={1 / 3}>
                        <Form.Item label='ruleFieldId' required>
                          <Input
                            name='ruleFieldId'
                            rules={[{ required: true, message: 'ruleFieldId is required' }]}
                          />
                        </Form.Item>
                      </Grid>
                      <Grid width={1 / 3}>
                        <Form.Item label='ruleEnumList' required>
                          <Select
                            keygen
                            name='ruleEnumList'
                            data={[1, 2, 3]}
                            rules={[{ required: true, message: 'ruleEnumList is required' }]}
                          />
                        </Form.Item>
                      </Grid>
                    </Grid>
                  )}
                </Form.FieldSet>
              </Form.FieldSet>
            </Tabs.Panel>
            <Tabs.Panel id='brand-panel' tab='品牌信息' style={{ padding: '12px 0' }}>
              <Tabs
                active={activeChildTab}
                onChange={(tab) => setActiveChildTab(tab as string)}
                position='left-top'
                shape='card'
              >
                <Form.FieldSet name='brandPartnerUpsertReq'>
                  {({ list, index }) => {
                    if (list.length === 0) return <span>暂无brandPartnerUpsertReq</span>;
                    return (
                      <Tabs.Panel
                        id={`child-panel-${index}`}
                        tab={`child-panel-${index}`}
                        style={{ padding: 12 }}
                      >
                        <Form.Item label={'brandId'} required>
                          <Input
                            name={'brandId'}
                            rules={[{ required: true, message: 'brandId is required' }]}
                          />
                        </Form.Item>
                        <Form.FieldSet name='labelBuildRequest'>
                          <Form.Item label={'busId'} required>
                            <Input
                              name={'busId'}
                              rules={[{ required: true, message: 'busId is required' }]}
                            />
                          </Form.Item>
                          <Form.Item label={'moduleId'} required>
                            <Input
                              name={'moduleId'}
                              rules={[{ required: true, message: 'moduleId is required' }]}
                            />
                          </Form.Item>
                          <Form.Item label={'originalPartnerId'} required>
                            <Input
                              name={'originalPartnerId'}
                              rules={[
                                {
                                  required: true,
                                  message: 'originalPartnerId is required',
                                },
                              ]}
                            />
                          </Form.Item>
                        </Form.FieldSet>
                        <Form.FieldSet name='updateBrandPartnerRequest'>
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
                          <Form.Item label={'originalPartnerId'} required>
                            <Input
                              name={'originalPartnerId'}
                              rules={[
                                {
                                  required: true,
                                  message: 'originalPartnerId is required',
                                },
                              ]}
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
        </Form.FieldSet>
      </Form>

      {/* <pre style={{ marginLeft: 12 }}>{JSON.stringify(formValue, null, 2)}</pre> */}
    </div>
  );
};

export default App;
