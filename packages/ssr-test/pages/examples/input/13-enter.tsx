/**
 * cn - 键盘事件
 *    -- Input 组件支持 `onKeyUp`（键盘弹起）、`onKeyDown`（键盘按下）、`onEnterPress`（回车） 事件
 * en - Keyboard events
 *    -- The Input component supports the `onKeyUp` (key up), `onKeyDown` (key down), and `onEnterPress` (enter key) events
 */

import React, { useState } from 'react';
import { Input } from 'shineout';

const style: React.CSSProperties = { marginBottom: 24, width: 300 };

const App: React.FC = () => {
  const [keyUp, setKeyUp] = useState<number>(0);
  const [keyDown, setKeyDown] = useState<number>(0);
  const [keyEnterPress, setKeyEnterPress] = useState<number>(0);

  const onKeyUp = () => setKeyUp(keyUp + 1);
  const onKeyDown = () => setKeyDown(keyDown + 1);
  const onEnterPress = () => setKeyEnterPress(keyEnterPress + 1);

  return (
    <div>
      <Input.Group style={style}>
        <Input placeholder='onKeyUp' onKeyUp={onKeyUp} />
        <b className='onKeyUp'>{`onKeyUp: ${keyUp} times`}</b>
      </Input.Group>

      <Input.Group style={style}>
        <Input placeholder='onKeyDown' onKeyDown={onKeyDown} />
        <b className='onKeyDown'>{`onKeyDown: ${keyDown} times`}</b>
      </Input.Group>

      <Input.Group style={style}>
        <Input placeholder='onEnterPress' onEnterPress={onEnterPress} />
        <b className='onEnterPress'>{`onEnterPress: ${keyEnterPress} times`}</b>
      </Input.Group>
    </div>
  );
};

export default App;
