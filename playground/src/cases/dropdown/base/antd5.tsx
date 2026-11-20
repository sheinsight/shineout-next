import { useState } from 'react';
import { Button, Dropdown } from 'antd-v5';
import { baseAntd } from '../_shared/data';
import { useOpenBench } from '../_shared/bench';

export default function Demo() {
  const [open, setOpen] = useState(false);
  useOpenBench(open, setOpen);
  return (
    <>
      <button data-bench='open' onClick={() => setOpen(true)}>
        open
      </button>
      <span>
          <Dropdown menu={{ items: baseAntd }} trigger={['click']} open={open} onOpenChange={setOpen}>
            <Button>Click me</Button>
          </Dropdown>
      </span>
      <Dropdown menu={{ items: baseAntd }} disabled>
        <Button disabled>Click me</Button>
      </Dropdown>
    </>
  );
}
