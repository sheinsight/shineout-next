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
        zoom
        width={400}
        visible={open}
        title='zoom'
        onClose={close}
        footer={
          <Button type='primary' onClick={close}>Ok</Button>
        }
      >
        Set the zoom property to enable zoom animation
      </Modal>
    </div>
  );
}
