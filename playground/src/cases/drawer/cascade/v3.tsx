import { useState } from 'react';
import { Button, Drawer } from 'shineout-v3';
import { useDrawerBench } from '../_shared/bench';

export default function Demo() {
  const [open1, setOpen1] = useState(false);
  const [open2, setOpen2] = useState(false);
  useDrawerBench(open1, setOpen1);

  return (
    <div>
      <span data-bench='open'>
        <Button mode='outline' onClick={() => setOpen1(true)}>Open Drawer 1</Button>
      </span>
      <Drawer cascade width={400} title='Drawer 1' visible={open1} onClose={() => setOpen1(false)}>
        <p>Content of Drawer 1……</p>
        <Button mode='outline' onClick={() => setOpen2(true)}>Open Drawer 2</Button>
      </Drawer>
      <Drawer forceMask width={400} title='Drawer 2' visible={open2} onClose={() => setOpen2(false)}>
        <p>Content of Drawer 2……</p>
      </Drawer>
    </div>
  );
}
