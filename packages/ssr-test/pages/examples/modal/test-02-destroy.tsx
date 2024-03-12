/**
 * cn - destroy
 *    -- destroy
 * en - destroy
 *    -- destroy
 */
import React, { useEffect, useState } from 'react';
import { Modal, Button, Message } from 'shineout';

const Hello = () => {
  const [content, setContent] = useState(1);
  useEffect(() => {
    Message.info('mount');
    return () => {
      Message.info('unmount');
      console.log('unmount');
    };
  }, []);
  return <div onClick={() => setContent(content + 1)}>hello ${content}</div>;
};

const App: React.FC = () => {
  const [visible, setVisible] = useState(false);

  const show = () => {
    setVisible(true);
  };

  const handleOk = () => {
    setVisible(false);
    console.log('clicked ok!');
  };

  const handleCancel = () => {
    setVisible(false);
    console.log('clicked cancel');
  };

  return (
    <div>
      <Button mode='outline' onClick={show}>
        click me
      </Button>
      <Modal
        width={400}
        visible={visible}
        destroy
        title='Modal Title'
        type='success'
        onClose={handleCancel}
        footer={[
          <Button key='cancel' onClick={handleCancel}>
            Cancel
          </Button>,
          <Button key='ok' type='primary' onClick={handleOk}>
            Ok
          </Button>,
        ]}
      >
        <Hello />
      </Modal>
    </div>
  );
};

export default App;
