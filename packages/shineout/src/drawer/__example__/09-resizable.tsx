/**
 * cn - 可伸缩
 *    -- 设置 `resizable` 来自由调整 Drawer 大小
 * en - Resizable
 *    -- Set `resizable` to resize Drawer freely
 */
import React, { useState } from 'react';
import { Drawer, Button, Form, Input, Radio, TYPE } from 'shineout';

type DrawerProps = TYPE.Drawer.Props;
type DrawerPosition = DrawerProps['position'];

const positionList: DrawerPosition[] = ['right', 'top', 'bottom', 'left'];

const App: React.FC = () => {
  const [visible, setVisible] = useState(false);
  const [position, setPosition] = useState<DrawerPosition>('right');

  const toggle = (v: boolean) => {
    setVisible(v);
  };

  const footer = () => (
    <div>
      <Button mode='outline' onClick={() => toggle(false)}>
        Cancel
      </Button>
      <Drawer.Submit>Submit</Drawer.Submit>
    </div>
  );
  return (
    <div>
      <Radio.Group
        keygen
        value={position}
        data={positionList}
        onChange={(p) => setPosition(p)}
        style={{ marginBottom: 24 }}
      />

      <Button onClick={() => toggle(true)} mode="outline">click me</Button>

      <Drawer
        title='Form'
        key={position}
        resizable
        footer={footer()}
        visible={visible}
        position={position}
        onClose={() => toggle(false)}
      >
        <Form
          labelWidth={100}
          labelAlign='right'
          style={{ width: 500 }}
          onSubmit={() => toggle(false)}
        >
          <Form.Item required label='Email'>
            <Input name='email' />
          </Form.Item>

          <Form.Item required label='Password'>
            <Input name='password' type='password' />
          </Form.Item>
        </Form>
      </Drawer>
    </div>
  );
};

export default App;
