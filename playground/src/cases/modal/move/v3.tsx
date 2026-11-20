import { useState } from 'react';
import { Button, Modal } from 'shineout-v3';
import { useOpenBench } from '../_shared/bench';

export default function Demo() {
  const [open, setOpen] = useState(false);
  useOpenBench(open, setOpen);
  const close = () => setOpen(false);
  return (
    <div>
      <span data-bench='open'>
        <Button mode='outline' onClick={() => setOpen(true)}>click me</Button>
      </span>
      <Modal
        moveable
        resizable
        width={400}
        visible={open}
        title='Moveable'
        onClose={close}
        footer={
          <Button type='primary' onClick={close}>Confirm</Button>
        }
      >
        drag title to move
      </Modal>
    </div>
  );
}
