/**
 * cn - 表单
 *    -- Modal 支持 Form 表单，并且支持 Form 的所有特性，表单提交可以使用 Modal.Submit 来代替 Button[type=submit]
 * en - Form
 *    --The internal form of Modal can use Modal.Submit to trigger submit.
 */
import React, { useState } from 'react';
import { Modal, Button, Form, Input, Message, TYPE } from 'shineout';

type FormProps = TYPE.Form.Props<any>;

const rules: FormProps['rules'] = {
  email: [
    { required: true, message: 'Please enter your email.' },
    { type: 'email', message: 'Please enter a valid email.' },
  ],
  password: [
    { required: true, message: 'Please enter password.' },
    { min: 7, message: 'Password must be at least {min} characters.' },
    { regExp: /[a-z]+/i, message: 'Password at least has one letter.' },
    // eslint-disable-next-line no-unused-vars
    (value: string, _formdata: any, callback: (v: boolean | Error) => void) => {
      if (/\d+/.test(value)) callback(true);
      else callback(new Error('Password at least has one numeral.'));
    },
  ],
};

const App: React.FC = () => {
  const [visible, setVisible] = useState(false);

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

  const handleSubmit = (data: any) => {
    setVisible(false);
    Message.success(JSON.stringify(data));
  };

  return (
    <div>
      <Button mode='outline' onClick={show}>
        Modal Form
      </Button>

      <Modal visible={visible} width={456} title='Form' onClose={handleClose} footer={footer()}>
        <Form
          labelWidth={100}
          rules={rules}
          labelAlign='right'
          style={{ maxWidth: 400 }}
          onSubmit={handleSubmit}
        >
          <Form.Item required label='Email'>
            <Input name='email' />
          </Form.Item>

          <Form.Item required label='Password'>
            <Input name='password' type='password' />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default App;
