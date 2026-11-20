import { useState } from 'react';
import { Button, Modal } from 'antd';
import { useOpenBench } from '../_shared/bench';

export default function Demo() {
  const [open, setOpen] = useState(false);
  useOpenBench(open, setOpen);
  const close = () => setOpen(false);
  return (
    <div>
      <span data-bench='open'>
        <Button onClick={() => setOpen(true)}>click me</Button>
      </span>
      <Modal
        width={500}
        open={open}
        title='Modal Title with success Icon'
        onCancel={close}
        footer={
          <>
            <Button onClick={close}>Cancel</Button>
            <Button type='primary' onClick={close}>Ok</Button>
          </>
        }
      >
        <span>Modal type: </span><b>success</b>
      </Modal>
    </div>
  );
}
