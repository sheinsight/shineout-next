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
        width={400}
        open={open}
        title='Modal Title'
        onCancel={close}
        footer={
          <>
            <Button onClick={close}>Cancel</Button>
            <Button type='primary' onClick={close}>Ok</Button>
          </>
        }
      >
        {'you are visited 1'}
      </Modal>
    </div>
  );
}
