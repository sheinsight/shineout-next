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
        maskClosable={false}
        open={open}
        title='Modal Title'
        onCancel={close}
        footer={
          <Button onClick={close}>Close</Button>
        }
      >
        The prop maskClosable is&nbsp;false.<br />You must click the button to close the Modal.
      </Modal>
    </div>
  );
}
