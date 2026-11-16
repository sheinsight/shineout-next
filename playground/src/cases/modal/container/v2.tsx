import { useRef, useState } from 'react';
import { Button, Modal } from 'shineout-v2';
import { useOpenBench } from '../_shared/bench';

export default function Demo() {
  const [open, setOpen] = useState(false);
  useOpenBench(open, setOpen);
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const close = () => setOpen(false);
  return (
    <div ref={wrapperRef}>
      <span data-bench='open'>
        <Button outline onClick={() => setOpen(true)}>click me</Button>
      </span>
      <Modal
        container={wrapperRef.current || undefined}
        visible={open}
        width={400}
        title='Modal Title'
        onClose={close}
        footer={
          <>
            <Button outline onClick={close}>Cancel</Button>
            <Button type='primary' onClick={close}>Ok</Button>
          </>
        }
      >
        Modal mount after Button
      </Modal>
    </div>
  );
}
