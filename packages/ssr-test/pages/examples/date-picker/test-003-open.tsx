/**
 * cn - 控制弹层（受控）
 *    -- DatePicker 通过 open 控制弹层的显示和隐藏。请注意，将面板设置成常开时，建议同时设置 position 属性，否则面板易遮挡其他内容。
 * en -  Dropdown list controlled by open property
 *    -- The dropdown list of Datepicker controlled by open property
 */
import React, { useState } from 'react';
import { DatePicker, Button } from 'shineout';

const App: React.FC = () => {
  const [open, setOpen] = useState(false);
  const handleClose = (close: boolean) => {
    setOpen(close);
  };
  return (
    <div style={{ display: 'flex' }}>
      <Button id='control' onClick={() => setOpen(true)}>
        Open elastic layer
      </Button>
      <DatePicker open={open} onCollapse={handleClose} type='date' placeholder='Select date' />
    </div>
  );
};

export default App;
