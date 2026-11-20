import { useState } from 'react';
import { Button, Drawer } from 'antd';
import { useDrawerBench } from '../_shared/bench';

export default function Demo() {
  const [open, setOpen] = useState(false);
  const [wrapper, setWrapper] = useState<HTMLElement | null>(null);
  useDrawerBench(open, setOpen);

  return (
    <div ref={setWrapper} style={{ position: 'relative', minHeight: 300, overflow: 'hidden' }}>
      <span data-bench='open'>
        <Button onClick={() => setOpen(true)}>click me</Button>
      </span>
      <Drawer
        size={400}
        open={open}
        getContainer={wrapper ?? false}
        rootStyle={{ position: 'absolute' }}
        title='Drawer Title'
        onClose={() => setOpen(false)}
      >
        Drawer mount after Button
      </Drawer>
    </div>
  );
}
