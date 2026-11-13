import { useState } from 'react';
import { Button, Drawer } from 'shineout-v3';
import { useDrawerBench } from '../_shared/bench';

export default function Demo() {
  const [content, setContent] = useState(1);
  const [open, setOpen] = useState(false);
  useDrawerBench(open, setOpen);

  const close = () => {
    setOpen(false);
    setContent(content + 1);
  };

  return (
    <div>
      <span data-bench='open'>
        <Button mode='outline' onClick={() => setOpen(true)}>click me</Button>
      </span>
      <Drawer
        width={400}
        visible={open}
        title='Drawer Title'
        onClose={close}
        footer={[
          <span key='cancel'><Button mode='outline' onClick={close}>Cancel</Button></span>,
          <span key='ok'><Button type='primary' onClick={close}>Ok</Button></span>,
        ]}
      >
        {`you are visited ${content}`}
      </Drawer>
    </div>
  );
}
