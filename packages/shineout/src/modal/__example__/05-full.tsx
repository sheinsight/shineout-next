/**
 * cn - 全屏
 *    -- 使用 fullScreen 属性来使对话框全屏展示
 * en - Full Screen
 *    -- Use the fullScreen property to display the modal in full screen
 */
import React, { useState, useCallback } from 'react';
import { Modal, Button } from 'shineout';
import Content from '../../form/__example__/001-base';

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
