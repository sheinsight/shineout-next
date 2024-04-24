/**
 * cn - 确认
 *    -- Popover.Confirm 提供弹出气泡式的确认框
 * en - Confirm
 *    -- Popover.Confirm provide popover confirm
 */
import React from 'react';
import { Button, Popover, TYPE } from 'shineout';

type PopoverConfirmProps = TYPE.Popover.ConfirmProps;
type PopoverOnOk = PopoverConfirmProps['onOk'];

const App: React.FC = () => {
  const onOk: PopoverOnOk = () =>
    new Promise((resolve) => {
      console.log('ok');
      setTimeout(() => resolve(true), 2000);
    });

  return (
    <Button>
      <Popover.Confirm
        priorityDirection='horizontal'
        title='Tips'
        onCancel={() => console.log('cancel')}
        onOk={onOk}
      >
        Are you sure you want to delete this content ?
      </Popover.Confirm>
      Delete
    </Button>
  );
};

export default App;
