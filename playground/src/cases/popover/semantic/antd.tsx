import { useState } from 'react';
import { Button, Popover } from 'antd';
import { useOpenBench } from '../_shared/bench';

export default function Demo() {
  const [open, setOpen] = useState(false);
  useOpenBench(open, setOpen);
  return (
    <>
      <button data-bench='open' onClick={() => setOpen(true)}>
        open
      </button>
      <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
        <Popover
          open={open}
          onOpenChange={setOpen}
          placement='bottomLeft'
          classNames={{ arrow: 'my-popover-arrow' }}
          styles={{ container: { padding: 16 } }}
          content='Static className on arrow'
        >
          <Button>Static classNames</Button>
        </Popover>
        <Popover
          open={open}
          onOpenChange={setOpen}
          placement='bottomLeft'
          classNames={{ root: 'my-popover my-popover--visible', container: 'my-popover-content' }}
          styles={{ container: { padding: 16 } }}
          content='Root class changes when open'
        >
          <Button>Functional (open state)</Button>
        </Popover>
        <Popover
          open={open}
          onOpenChange={setOpen}
          placement='bottomLeft'
          classNames={{ root: 'my-popover my-popover--danger', container: 'my-content my-content--danger' }}
          styles={{ container: { padding: 16 } }}
          content='Content class reflects type=danger'
        >
          <Button>Functional (type state)</Button>
        </Popover>
      </div>
    </>
  );
}
