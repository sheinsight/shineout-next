import { useState } from 'react';
import { Button, Drawer, Radio } from 'antd';
import { useDrawerBench } from '../_shared/bench';

type Position = 'right' | 'top' | 'bottom' | 'left';
const positions: Position[] = ['right', 'top', 'bottom', 'left'];

export default function Demo() {
  const [open, setOpen] = useState(false);
  const [position, setPosition] = useState<Position>('right');
  useDrawerBench(open, setOpen);

  return (
    <div>
      <Radio.Group options={positions} value={position} onChange={(e) => setPosition(e.target.value)} style={{ marginBottom: 24 }} />
      <br />
      <span data-bench='open'>
        <Button onClick={() => setOpen(true)}>click me</Button>
      </span>
      <Drawer title='Resizable' key={position} resizable open={open} placement={position} onClose={() => setOpen(false)}>
        <div style={{ width: 300, height: 120 }}>Drag the edge to resize</div>
      </Drawer>
    </div>
  );
}
