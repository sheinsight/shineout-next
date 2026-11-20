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
        fullScreen
        visible={open}
        title='Profile'
        onClose={close}
        footer={
          <Button type='primary' onClick={close}>OK</Button>
        }
      >
        <div>Full screen content</div>
      </Modal>
    </div>
  );
}
