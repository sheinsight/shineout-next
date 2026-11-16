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
        <Button onClick={() => setOpen(true)}>Open Semantic Modal</Button>
      </span>
      <Modal
        open={open}
        title='Semantic DOM Demo'
        onCancel={close}
        footer={<Button onClick={close}>OK</Button>}
        classNames={{
          root: 'my-modal',
          mask: 'my-modal-mask',
          header: 'my-modal-header',
          body: 'my-modal-body',
          footer: 'my-modal-footer',
          close: 'my-modal-close',
        }}
        styles={{
          header: { borderBottom: '1px solid #f0f0f0' },
          body: { padding: 24 },
          footer: { borderTop: '1px solid #f0f0f0' },
        }}
      >
        <p>Modal body with custom styles via Semantic DOM API.</p>
        <p>Each internal node can be independently customized.</p>
      </Modal>
    </div>
  );
}
