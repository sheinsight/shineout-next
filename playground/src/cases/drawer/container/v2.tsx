import { useState } from 'react';
import { Button, Drawer } from 'shineout-v2';
import { useDrawerBench } from '../_shared/bench';

export default function Demo() {
  const [open, setOpen] = useState(false);
  const [wrapper, setWrapper] = useState<HTMLElement | null>(null);
  useDrawerBench(open, setOpen);

  return (
    <div ref={setWrapper} style={{ position: 'relative', minHeight: 300, overflow: 'hidden' }}>
      <span data-bench='open'>
        <Button outline onClick={() => setOpen(true)}>click me</Button>
      </span>
      <Drawer
        width={400}
        visible={open}
        container={wrapper ?? undefined}
        title='Drawer Title'
        onClose={() => setOpen(false)}
      >
        Drawer mount after Button
      </Drawer>
    </div>
  );
}
