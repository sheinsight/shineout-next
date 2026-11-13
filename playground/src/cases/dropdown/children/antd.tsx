import { useState } from 'react';
import { Button, Dropdown } from 'antd';
import { nestedAntd } from '../_shared/data';
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
        <Dropdown menu={{ items: nestedAntd }} trigger={['click']} open={open} onOpenChange={setOpen}>
          <Button>Click me</Button>
        </Dropdown>
      </span>
    </>
  );
}
