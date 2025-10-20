/**
 * cn - 附带图标
 *    -- 使用 `type` 属性来指定标题附带的图标，需配合 `title` 使用
 * en - Icon
 *    -- use `type` display type icon
 */
import React, { useState } from 'react';
import { Drawer, Button, Radio, TYPE } from 'shineout';

type DrawerProps = TYPE.Drawer.Props;
type DrawerType = DrawerProps['type'];

const typeList: DrawerType[] = ['info', 'success', 'warning', 'error'];

const App: React.FC = () => {
  const [type, setType] = useState<DrawerType>('success');
  const [visible, setVisible] = useState(false);

  const handleOk = () => {
    setVisible(false);
    console.log('clicked ok!');
  };

  const handleCancel = () => {
    setVisible(false);
    console.log('clicked cancel');
  };

  const show = () => setVisible(true);

  const footer = () => [
    <Button key='cancel' onClick={handleCancel} mode="outline">
      Cancel
    </Button>,

    <Button key='ok' type={type === 'error' ? 'danger' : 'primary'} onClick={handleOk}>
      Ok
    </Button>,
  ];

  return (
    <div>
      <Radio.Group
        style={{ marginBottom: 24 }}
        data={typeList}
        value={type}
        keygen
        onChange={setType}
      />

      <Button onClick={show} mode='outline' >
        click me
      </Button>

      <Drawer
        type={type}
        width={500}
        visible={visible}
        footer={footer()}
        onClose={handleCancel}
        title={`Drawer Title with ${type} Icon`}
      >
        <span>Drawer type: </span>
        <b>{type}</b>
      </Drawer>
    </div>
  );
};
export default App;
