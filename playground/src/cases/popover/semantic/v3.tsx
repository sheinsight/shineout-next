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
      <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
        <Button mode='outline'>
          Static classNames
          <Popover
            visible={open}
            onVisibleChange={setOpen}
            background='#f0f7ff'
            classNames={{ arrow: 'my-popover-arrow' }}
            styles={{ content: { padding: 16 } }}
          >
            Static className on arrow
          </Popover>
        </Button>
        <Button mode='outline'>
          Functional (open state)
          <Popover
            visible={open}
            onVisibleChange={setOpen}
            classNames={{
              root: ({ open: o }: { open: boolean }) => (o ? 'my-popover my-popover--visible' : 'my-popover'),
              content: 'my-popover-content',
            }}
            styles={{ content: { padding: 16 } }}
          >
            Root class changes when open
          </Popover>
        </Button>
        <Button mode='outline'>
          Functional (type state)
          <Popover
            visible={open}
            onVisibleChange={setOpen}
            type='danger'
            classNames={{
              root: ({ type }: { type?: string }) => (type ? `my-popover my-popover--${type}` : 'my-popover'),
              content: ({ type }: { type?: string }) => (type === 'danger' ? 'my-content my-content--danger' : 'my-content'),
            }}
            styles={{ content: { padding: 16 } }}
          >
            Content class reflects type=danger
          </Popover>
        </Button>
      </div>
    </>
  );
}
