import { useState } from 'react';
import { Button, Modal } from 'shineout-v2';
import { useOpenBench } from '../_shared/bench';

export default function Demo() {
  const [open, setOpen] = useState(false);
  useOpenBench(open, setOpen);
  const close = () => setOpen(false);
  return (
    <div>
      <span data-bench='open'>
        <Button outline onClick={() => setOpen(true)}>click me</Button>
      </span>
      <Modal
        width={400}
        visible={open}
        title='Modal Title'
        onClose={close}
        footer={
          <>
            <Button outline onClick={close}>Cancel</Button>
            <Button type='primary' onClick={close}>Ok</Button>
          </>
        }
      >
        {'you are visited 1'}
      </Modal>
    </div>
  );
}
