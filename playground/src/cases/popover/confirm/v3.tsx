import { useState } from 'react';
import { Button, Popover } from 'shineout-v3';
import { useOpenBench } from '../_shared/bench';

export default function Demo() {
  const [open, setOpen] = useState(false);
  useOpenBench(open, setOpen);
  return (
    <>
      <button data-bench='open' onClick={() => setOpen(true)}>
        open
      </button>
      <Button mode='outline'>
        <Popover.Confirm
          visible={open}
          onVisibleChange={setOpen}
          priorityDirection='horizontal'
          title='Tips'
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
