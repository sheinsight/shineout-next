import { useState } from 'react';
import { Button, Drawer, Radio } from 'shineout-v3';
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
        <Button mode='outline' onClick={() => setOpen(true)}>click me</Button>
      </span>
      <Drawer title='Position' key={position} visible={open} position={position} onClose={() => setOpen(false)}>
        <div style={{ width: 300, height: 120 }}>Content of the {position} drawer</div>
      </Drawer>
    </div>
  );
}
