import { useState } from 'react';
import { Button, Popconfirm } from 'antd-v5';
import { useOpenBench } from '../_shared/bench';

export default function Demo() {
  const [open, setOpen] = useState(false);
  useOpenBench(open, setOpen);
  return (
    <>
      <button data-bench='open' onClick={() => setOpen(true)}>
        open
      </button>
      <Popconfirm
        open={open}
        onOpenChange={setOpen}
        title='Tips'
        description='Are you sure you want to delete this content ?'
        onCancel={() => setOpen(false)}
        onConfirm={() => setOpen(false)}
        placement='bottomLeft'
      >
        <Button>Delete</Button>
      </Popconfirm>
    </>
  );
}
