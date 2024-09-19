/**
 * cn - 多个表单onSubmit
 * en - Multiple form
 */
import React, { useState } from 'react';
import { Modal, Button, Form, Input, Message } from 'shineout';

const App: React.FC = () => {
  const [visible, setVisible] = useState(false);
  const [form2, setForm2] = useState({ email2: '123' });

  const show = () => {
    setVisible(true);
  };

  const handleClose = () => {
    setVisible(false);
  };

  const footer = () => (
    <div>
      <Button onClick={handleClose} mode='outline'>
        Cancel
      </Button>
      <Modal.Submit type='primary'>Submit</Modal.Submit>
    </div>
  );

  const handleSubmit1 = (data: any) => {
    // setVisible(false);
    Message.success('submit1:' + JSON.stringify(data));
  };

  return (
    <div>
      <Button mode='outline' onClick={show}>
        Modal Form
      </Button>

      <Modal visible={visible} width={456} title='Form' onClose={handleClose} footer={footer()}>
        <div>
          <Form
            labelWidth={100}
            labelAlign='right'
            style={{ maxWidth: 400 }}
            onSubmit={handleSubmit1}
          >
            <Form.Item required label='Email'>
              <Input name='email' />
            </Form.Item>

            <Form.Item required label='Password'>
              <Input name='password' type='password' />
            </Form.Item>
          </Form>

          <Form
            value={form2}
            onChange={setForm2}
            onSubmit={(v) => {
              Message.success('submit2:' + JSON.stringify(v));
            }}
          >
            <Form.Item required label='Email2'>
              <Input name='email2' />
            </Form.Item>
          </Form>
        </div>
      </Modal>
    </div>
  );
};

export default App;
