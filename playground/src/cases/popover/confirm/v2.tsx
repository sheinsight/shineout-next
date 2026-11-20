import { useState } from 'react';
import { Button, Popover } from 'shineout-v2';
import { useOpenBench } from '../_shared/bench';

export default function Demo() {
  const [open, setOpen] = useState(false);
  useOpenBench(open, setOpen);
  return (
    <>
      <button data-bench='open' onClick={() => setOpen(true)}>
        open
      </button>
      <Button outline>
        <Popover.Confirm
          visible={open}
          onVisibleChange={setOpen}
          priorityDirection='horizontal'
          onCancel={() => setOpen(false)}
          onOk={() => setOpen(false)}
        >
          Are you sure you want to delete this content ?
        </Popover.Confirm>
        Delete
      </Button>
    </>
  );
}
