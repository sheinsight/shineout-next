import { useState } from 'react';
import { Button, Drawer, Radio } from 'shineout-v2';
import { useDrawerBench } from '../_shared/bench';

type Position = 'right' | 'top' | 'bottom' | 'left';
const positions: Position[] = ['right', 'top', 'bottom', 'left'];

export default function Demo() {
  const [open, setOpen] = useState(false);
  const [position, setPosition] = useState<Position>('right');
  useDrawerBench(open, setOpen);

  return (
    <div>
      <Radio.Group keygen data={positions} value={position} onChange={setPosition} style={{ marginBottom: 24 }} />
      <br />
      <span data-bench='open'>
        <Button outline onClick={() => setOpen(true)}>click me</Button>
      </span>
      <Drawer title='Resizable' key={position} resizable visible={open} position={position} onClose={() => setOpen(false)}>
        <div style={{ width: 300, height: 120 }}>Drag the edge to resize</div>
      </Drawer>
    </div>
  );
}
