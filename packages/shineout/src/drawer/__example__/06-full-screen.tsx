/**
 * cn - 全屏
 *    -- 使用 `fullScreen` 属性来使抽屉全屏展示
 * en - Full Screen
 *    -- Use the `fullScreen` property to display the Drawer in full screen
 */
import React, { useState, useCallback } from 'react';

import {
  Form,
  Drawer,
  Button,
  Input,
  Upload,
  Radio,
  Checkbox,
  DatePicker,
  Rate,
  Textarea,
} from 'shineout';

const star = (
  <svg viewBox='0 0 24 24' fill='currentColor' xmlns='http://www.w3.org/2000/svg'>
    <path d='M8.276 7.825L1.85649 8.7559L1.74278 8.77878C1.00761 8.96968 0.736859 9.90915 1.30093 10.4606L5.953 15.008L4.84231 21.3268L4.82911 21.4327C4.77288 22.2003 5.59415 22.7575 6.29763 22.3824L11.999 19.343L17.7023 22.3825L17.7988 22.4279C18.5105 22.7194 19.2948 22.1128 19.1578 21.3281L18.054 15.008L22.6997 10.46L22.7779 10.3745C23.2586 9.78723 22.9242 8.86973 22.1443 8.75601L15.758 7.825L12.895 2.05544C12.5264 1.31273 11.4661 1.31545 11.1013 2.06004L8.276 7.825Z' />
  </svg>
);

const StarRate = Rate(star, star);

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
        <Form.Item label='Score'>
          <StarRate name='score'></StarRate>
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
      <Drawer title='Profile' fullScreen visible={visible} onClose={cancel} footer={footer()}>
        <Content></Content>
      </Drawer>
      <Button onClick={() => setVisible(true)} mode="outline">Full Screen</Button>
    </div>
  );
};

export default App;
