import { Input, Space } from 'antd';
import { useState } from 'react';

export default function Demo() {
  const [keyUp, setKeyUp] = useState(0);
  const [keyDown, setKeyDown] = useState(0);
  const [enter, setEnter] = useState(0);
  const style = { marginBottom: 24, width: 300 };
  return (
    <div>
      <Space.Compact style={style}>
        <Input placeholder='onKeyUp' onKeyUp={() => setKeyUp(keyUp + 1)} />
        <Space.Addon>{`onKeyUp: ${keyUp} times`}</Space.Addon>
      </Space.Compact>
      <Space.Compact style={style}>
        <Input placeholder='onKeyDown' onKeyDown={() => setKeyDown(keyDown + 1)} />
        <Space.Addon>{`onKeyDown: ${keyDown} times`}</Space.Addon>
      </Space.Compact>
      <Space.Compact style={style}>
        <Input placeholder='onEnterPress' onPressEnter={() => setEnter(enter + 1)} />
        <Space.Addon>{`onEnterPress: ${enter} times`}</Space.Addon>
      </Space.Compact>
    </div>
  );
}
