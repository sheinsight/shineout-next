import { useState } from 'react';
import { Button, Drawer, Radio } from 'shineout-v2';
import { useDrawerBench } from '../_shared/bench';

const options = [
  { label: 'false', value: false },
  { label: 'true', value: true },
];

export default function Demo() {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(false);
  useDrawerBench(open, setOpen);

  return (
    <div>
      <Radio.Group
        data={options} keygen='label' format='value' renderItem='label'
        value={selected}
        onChange={setSelected}
        style={{ marginBottom: 24 }}
      />
      <br />
      <span data-bench='open'>
        <Button outline onClick={() => setOpen(true)}>Open</Button>
      </span>
      <Drawer
        width={400}
        visible={open}
        title='Drawer Title'
        maskCloseAble={selected}
        onClose={() => setOpen(false)}
        footer={<span><Button outline onClick={() => setOpen(false)}>Close</Button></span>}
      >
        The mask closable is {String(selected)}.
      </Drawer>
    </div>
  );
}
