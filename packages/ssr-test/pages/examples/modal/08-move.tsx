/**
 * cn - 可移动/伸缩
 *    -- 设置 moveable 来使 Modal 可以按住头部移动, 设置 resizable 来自由调整 Modal 大小
 * en - Moveable/resizable
 *    -- set moveable mark modal move by header, set resizable to resize modal
 */
import React, { useState } from 'react';
import { Modal, Button } from 'shineout';

const App: React.FC = () => {
  const [show, setShow] = useState(false);

  const footer = () => (
    <Button type='primary' onClick={() => setShow(false)}>
      Confirm
    </Button>
  );

  return (
    <div>
      <Button mode='outline' onClick={() => setShow(true)}>
        Moveable modal
      </Button>
      <Modal
        moveable
        resizable
        width={400}
        visible={show}
        title='Moveable'
        footer={footer()}
        onClose={() => setShow(false)}
      >
        drag title to move
      </Modal>
    </div>
  );
};

export default App;
