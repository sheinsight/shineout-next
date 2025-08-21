/**
 * cn - closeAll
 *    -- closeAll
 * en - closeAll
 *    -- closeAll
 */
import React from 'react';
import { Modal, Button } from 'shineout';

let id = 0;

const App: React.FC = () => {
  const open = () => {
    let uid = id++;
    Modal.info({
      title: `title ${uid}`,
      content: '哈哈哈哈',
      onClose: () => {
        console.log('close', uid);
      },
      footer: (
        <div>
          <Button mode='outline' onClick={() => Modal.closeAll()}>
            close all
          </Button>
          <Button onClick={open}> open ${uid} </Button>
        </div>
      ),
    });
  };

  return (
    <div>
      <Button mode='outline' onClick={open}>
        confirm
      </Button>
    </div>
  );
};

export default App;
