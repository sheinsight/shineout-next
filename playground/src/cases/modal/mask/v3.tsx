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
        <Button mode='outline' onClick={() => setOpen(true)}>mask blur</Button>
      </span>
      <Modal
        title='Modal with blur mask'
        visible={open}
        onClose={close}
        mask={{ blur: true }}
        footer={<Button type='primary' onClick={close}>Close</Button>}
      >
        This modal has a blurred mask
      </Modal>
    </div>
  );
}
