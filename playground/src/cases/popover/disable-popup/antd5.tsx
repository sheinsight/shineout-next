import { useState } from 'react';
import { Popconfirm, Typography } from 'antd-v5';
import { useOpenBench } from '../_shared/bench';

export default function Demo() {
  const [open, setOpen] = useState(false);
  useOpenBench(open, setOpen);
  return (
    <>
      <button data-bench='open' onClick={() => setOpen(true)}>
        open
      </button>
      <div style={{ display: 'flex', gap: 24 }}>
        <Popconfirm disabled title='Are you sure?'>
          <Typography.Link>disabled popover</Typography.Link>
        </Popconfirm>
        <Popconfirm open={open} onOpenChange={setOpen} title='Are you sure?'>
          <Typography.Link>enabled popover</Typography.Link>
        </Popconfirm>
      </div>
    </>
  );
}
