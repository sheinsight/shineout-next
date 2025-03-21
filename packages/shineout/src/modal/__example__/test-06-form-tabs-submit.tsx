/**
 * cn - Tabs-Form-Submit
 *    -- Tabs-Form-Submit
 * en - Tabs-Form-Submit
 *    -- Tabs-Form-Submit
 */
import React, { useState } from 'react';
import { Modal, Button, Tabs, Form, Input } from 'shineout';

const App: React.FC = () => {
  const [visible, setVisible] = useState(false);
  const [activeTab, setActiveTab] = useState(1);
  const [formValue1, setFormValue1] = useState({});
  const [formValue2, setFormValue2] = useState({});

  const show = () => {
    setVisible(true);
  };

  const handleCancel = () => {
    setVisible(false);
    console.log('clicked cancel');
  };

  const handleSubmit1 = (v: any) => {
    console.log('======================');
    console.log('handleSubmit1: >>', v);
    console.log('======================');
  };

  const handleSubmit2 = (v: any) => {
    console.log('======================');
    console.log('handleSubmit2: >>', v);
    console.log('======================');
  };

  return (
    <div>
      <Button mode='outline' onClick={show}>
        click me
      </Button>
      <Modal
        width={400}
        visible={visible}
        title='Modal Title'
        type='success'
        onClose={handleCancel}
        hideMask
        footer={[
          <Button mode='outline' key='cancel' onClick={handleCancel}>
            Cancel
          </Button>,
          <Modal.Submit key='ok' type='primary'>
            Submit
          </Modal.Submit>,
        ]}
      >
        <Tabs
          active={activeTab}
          onChange={(key) => {
            setActiveTab(Number(key));
            if (key === 2) {
              setFormValue2({
                title: '222',
              });
            } else {
              setFormValue1({
                title: '111',
              });
            }
          }}
        >
          <Tabs.Panel tab='A' id={1}>
            {activeTab === 1 && (
              <Form onSubmit={handleSubmit1} value={formValue1} onChange={setFormValue1}>
                <Form.Item label='name'>
                  <Input name='title' />
                </Form.Item>
                <Form.Submit>inner submit</Form.Submit>
              </Form>
            )}
          </Tabs.Panel>
          <Tabs.Panel tab='B' id={2}>
            {activeTab === 2 && (
              <Form onSubmit={handleSubmit2} value={formValue2} onChange={setFormValue2}>
                <Form.Item label='name'>
                  <Input name='title' />
                </Form.Item>

                <Form.Submit>inner submit</Form.Submit>
              </Form>
            )}
          </Tabs.Panel>
        </Tabs>
      </Modal>
    </div>
  );
};

export default App;
