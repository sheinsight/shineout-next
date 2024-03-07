/**
 * cn - hideMask
 *    -- hideMask
 * en - hideMask
 *    -- hideMask
 */
import React, { useState } from 'react';
import { Modal, Button } from 'shineout';

const App: React.FC = () => {
  const [content, setContent] = useState(1);
  const [visible, setVisible] = useState(false);

  const show = () => {
    setVisible(true);
  };

  const handleOk = () => {
    setVisible(false);
    setContent(content + 1);
    console.log('clicked ok!');
  };

  const handleCancel = () => {
    setVisible(false);
    setContent(content + 1);
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
        title='Modal Title'
        type='success'
        onClose={handleCancel}
        hideMask
        footer={[
          <Button mode='outline' key='cancel' onClick={handleCancel}>
            Cancel
          </Button>,
          <Button key='ok' type='primary' onClick={handleOk}>
            Ok
          </Button>,
        ]}
      >
        {`you are visited ${content}`}
      </Modal>
    </div>
  );
};

export default App;
