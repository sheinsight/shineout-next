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
        width='100vw'
        style={{ top: 0, maxWidth: '100vw', paddingBottom: 0 }}
        styles={{ content: { height: '100vh', borderRadius: 0 }, body: { height: 'calc(100vh - 110px)' } }}
        open={open}
        title='Profile'
        onCancel={close}
        footer={
          <Button type='primary' onClick={close}>OK</Button>
        }
      >
        <div>Full screen content</div>
      </Modal>
    </div>
  );
}
