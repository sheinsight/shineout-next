/**
 * cn - 手动关闭
 *    -- Message 会异步返回一个关闭函数，调用它来关闭当前 Messsage
 * en - Close
 *    -- Message return close func async
 */
import React from 'react';
import { Button, Message } from 'shineout';

const App: React.FC = () => {
  const msg = async () => {
    const close = await Message.success(
      <div>
        I will always show until
        <Button mode={'text'} onClick={() => close()}>
          manually closed
        </Button>
      </div>,
      0,
      {
        title: 'Manual Close',
      },
    );
  };

  return <Button onClick={msg}>Manual Close</Button>;
};

export default App;
