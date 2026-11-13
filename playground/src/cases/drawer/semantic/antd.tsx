import { useState } from 'react';
import { Button, Drawer } from 'antd';
import { useDrawerBench } from '../_shared/bench';

export default function Demo() {
  const [open, setOpen] = useState(false);
  useDrawerBench(open, setOpen);

  return (
    <div>
      <span data-bench='open'>
        <Button onClick={() => setOpen(true)}>Open Semantic Drawer</Button>
      </span>
      <Drawer
        open={open}
        title='Semantic DOM Demo'
        onClose={() => setOpen(false)}
        footer={<Button onClick={() => setOpen(false)}>OK</Button>}
        styles={{
          header: { borderBottom: '1px solid #f0f0f0' },
          body: { padding: 24 },
          footer: { borderTop: '1px solid #f0f0f0' },
        }}
      >
        <p>Drawer body with custom styles via Semantic DOM API.</p>
      </Drawer>
    </div>
  );
}
