/**
 * cn - 受控模式
 *    -- 可以通过 visible 去控制
 * en -  control
 *    -- can be controlled by visible
 */
import React, { useState } from 'react';
import { Button, Popover, Switch } from 'shineout';

const App: React.FC = () => {
  const [visible, setVisible] = useState(false);

  return (
    <div>
      <div style={{ marginBottom: 12 }}>
        <Switch value={visible} onChange={setVisible} />
        <span>
          {!visible ? 'Turn on switch to display popover' : 'Turn off switch to hide popover'}{' '}
        </span>
      </div>
      <Button>
        <Popover
          visible={visible}
          onVisibleChange={(v) => {
            console.log('onVisibleChange', v);
          }}
        >
          Some text
        </Popover>
        Hover
      </Button>
    </div>
  );
};

export default App;
