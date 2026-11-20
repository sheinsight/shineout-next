import { useRef, useState } from 'react';
import { Button, Modal } from 'antd-v5';
import { useOpenBench } from '../_shared/bench';

export default function Demo() {
  const [open, setOpen] = useState(false);
  useOpenBench(open, setOpen);
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const close = () => setOpen(false);
  return (
    <div ref={wrapperRef} style={{ position: 'relative' }}>
      <span data-bench='open'>
        <Button onClick={() => setOpen(true)}>click me</Button>
      </span>
      <Modal
        getContainer={() => wrapperRef.current || document.body}
        open={open}
        width={400}
        title='Modal Title'
        onCancel={close}
        footer={
          <>
            <Button onClick={close}>Cancel</Button>
            <Button type='primary' onClick={close}>Ok</Button>
          </>
        }
      >
        Modal mount after Button
      </Modal>
    </div>
  );
}
