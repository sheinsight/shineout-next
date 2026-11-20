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
        type='success'
        width={500}
        visible={open}
        title='Modal Title with success Icon'
        onClose={close}
        footer={
          <>
            <Button mode='outline' onClick={close}>Cancel</Button>
            <Button type='primary' onClick={close}>Ok</Button>
          </>
        }
      >
        <span>Modal type: </span><b>success</b>
      </Modal>
    </div>
  );
}
