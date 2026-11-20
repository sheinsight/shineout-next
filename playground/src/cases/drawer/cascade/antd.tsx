import { useState } from 'react';
import { Button, Drawer } from 'antd';
import { useDrawerBench } from '../_shared/bench';

// antd 的多层是把第二个 Drawer 放在第一个里面，父级会自动让开（push）
export default function Demo() {
  const [open1, setOpen1] = useState(false);
  const [open2, setOpen2] = useState(false);
  useDrawerBench(open1, setOpen1);

  return (
    <div>
      <span data-bench='open'>
        <Button onClick={() => setOpen1(true)}>Open Drawer 1</Button>
      </span>
      <Drawer size={400} title='Drawer 1' open={open1} onClose={() => setOpen1(false)}>
        <p>Content of Drawer 1……</p>
        <Button onClick={() => setOpen2(true)}>Open Drawer 2</Button>
        <Drawer size={400} title='Drawer 2' open={open2} onClose={() => setOpen2(false)}>
          <p>Content of Drawer 2……</p>
        </Drawer>
      </Drawer>
    </div>
  );
}
