import { useState } from 'react';
import { Button, Drawer } from 'antd-v5';
import { useDrawerBench } from '../_shared/bench';

export default function Demo() {
  const [open, setOpen] = useState(false);
  useDrawerBench(open, setOpen);

  return (
    <div>
      <span data-bench='open'>
        <Button onClick={() => setOpen(true)}>click me</Button>
      </span>
      <Drawer width={400} mask={false} open={open} title='Drawer Title' onClose={() => setOpen(false)}>
        No mask behind this drawer.
      </Drawer>
    </div>
  );
}
