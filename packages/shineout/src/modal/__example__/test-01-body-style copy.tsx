/**
 * cn - bodystyle
 *    -- bodystyle
 * en - bodystyle
 *    -- bodystyle
 */
import React, { useState } from 'react';
import { Modal, Button } from 'shineout';

const App: React.FC = () => {
  const [visible, setVisible] = useState(false);

  const handleClose = () => setVisible(false);

  const footer = () => (
    <Button key='ok' type='primary' onClick={() => setVisible(false)}>
      Ok
    </Button>
  );
  return (
    <div>
      <Button mode='outline' onClick={() => setVisible(true)}>
        Open
      </Button>
      <Modal
        className='hi'
        zIndex={1000}
        style={{ color: 'green' }}
        zoom
        width={400}
        bodyStyle={{ height: '100px', background: '#ccc' }}
        title='zoom'
        footer={footer()}
        visible={visible}
        onClose={handleClose}
      >
        hello, how are you fine thank you and you, i am fine too, hello, how are you fine thank you
        and you, i am fine toohello, how are you fine thank you and you, i am fine toohello, how are
        you fine thank you and you, i am fine toohello, how are you fine thank you and you, i am
        fine toohello, how are you fine thank you and you, i am fine toohello, how are you fine
        thank you and you, i am fine toohello, how are you fine thank you and you, i am fine
        toohello, how are you fine thank you and you, i am fine toohello, how are you fine thank you
        and you, i am fine toohello, how are you fine thank you and you, i am fine too
      </Modal>
    </div>
  );
};

export default App;
