/**
 * cn - 全屏
 *    -- 使用 fullScreen 属性来使对话框全屏展示
 * en - Full Screen
 *    -- Use the fullScreen property to display the modal in full screen
 */
import React, { useState, useCallback } from 'react';
import {
  Form,
  Modal,
  Button,
  Input,
  Upload,
  Radio,
  Checkbox,
  DatePicker,
  Textarea,
} from 'shineout';
const Content = () => {
  return (
    <div>
      <Form
        defaultValue={{ name: 'zhangsan', email: 'zhangsan@qq.com', score: 3 }}
        onSubmit={(v) => {
          console.log('form submit', v);
        }}
        onChange={(v) => {
          console.log('form change', v);
        }}
        onReset={() => {
          console.log('form reset');
        }}
      >
        <Form.Item label='Name'>
          <Input name={'name'} placeholder='please input name' clearable />
        </Form.Item>
        <Form.Item label='Password'>
          <Input name={'password'} placeholder='please input password' clearable />
        </Form.Item>
        <Form.Item label='Email'>
          <Input name={'email'} clearable placeholder='please input email' />
        </Form.Item>
        <Form.Item label='Gendar'>
          <Radio.Group name='gendar' data={['male', 'female']} keygen />
        </Form.Item>
        <Form.Item label='Course'>
          <Checkbox.Group name='course' data={['chinese', 'maths', 'english', 'physics']} keygen />
        </Form.Item>
        <Form.Item label='Enrollment date'>
          <DatePicker name='date' placeholder={'please select date'} clearable showSelNow />
        </Form.Item>
        <Form.Item label='upload avatar'>
          <Upload.Image
            action='/api/upload'
            accept='image/*'
            name='file'
            htmlName='file'
            recoverAble
            leftHandler
            removeConfirm='Are you sure to delete it ?'
            limit={3}
            onSuccess={(_res, filem, data) => {
              return data;
            }}
          />
        </Form.Item>
        <Form.Item label='Address'>
          <Textarea name='address' />
        </Form.Item>

        <Form.Item label='' style={{ marginTop: 32, marginBottom: 0 }}>
          <Form.Submit>Submit</Form.Submit>
          <Form.Reset>Reset</Form.Reset>
        </Form.Item>
      </Form>
    </div>
  );
};

const App: React.FC = () => {
  const [visible, setVisible] = useState(false);

  const cancel = useCallback(() => {
    setVisible(false);
  }, [visible]);

  const footer = () => (
    <Button type='primary' onClick={cancel}>
      OK
    </Button>
  );

  return (
    <div>
      <Modal title='Profile' fullScreen visible={visible} onClose={cancel} footer={footer()}>
        <Content></Content>
      </Modal>
      <Button mode='outline' onClick={() => setVisible(true)}>
        Full Screen
      </Button>
    </div>
  );
};

export default App;
