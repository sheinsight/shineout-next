import { useState } from 'react';
import { Button, Drawer, Radio } from 'antd';
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
        options={options}
        value={selected}
        onChange={(e) => setSelected(e.target.value)}
        style={{ marginBottom: 24 }}
      />
      <br />
      <span data-bench='open'>
        <Button onClick={() => setOpen(true)}>Open</Button>
      </span>
      <Drawer
        size={400}
        open={open}
        title='Drawer Title'
        mask={{ closable: selected }}
        onClose={() => setOpen(false)}
        footer={<span><Button onClick={() => setOpen(false)}>Close</Button></span>}
      >
        The mask closable is {String(selected)}.
      </Drawer>
    </div>
  );
}
