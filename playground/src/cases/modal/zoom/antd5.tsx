import { useState } from 'react';
import { Button, Modal } from 'antd-v5';
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
        title='zoom'
        onCancel={close}
        footer={
          <Button type='primary' onClick={close}>Ok</Button>
        }
      >
        Set the zoom property to enable zoom animation
      </Modal>
    </div>
  );
}
