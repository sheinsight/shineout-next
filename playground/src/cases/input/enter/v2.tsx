import { Input } from 'shineout-v2';
import { useState } from 'react';

export default function Demo() {
  const [keyUp, setKeyUp] = useState(0);
  const [keyDown, setKeyDown] = useState(0);
  const [enter, setEnter] = useState(0);
  const style = { marginBottom: 24, width: 300 };
  return (
    <div>
      <Input.Group style={style}>
        <Input placeholder='onKeyUp' onKeyUp={() => setKeyUp(keyUp + 1)} />
        <b>{`onKeyUp: ${keyUp} times`}</b>
      </Input.Group>
      <Input.Group style={style}>
        <Input placeholder='onKeyDown' onKeyDown={() => setKeyDown(keyDown + 1)} />
        <b>{`onKeyDown: ${keyDown} times`}</b>
      </Input.Group>
      <Input.Group style={style}>
        <Input placeholder='onEnterPress' onEnterPress={() => setEnter(enter + 1)} />
        <b>{`onEnterPress: ${enter} times`}</b>
      </Input.Group>
    </div>
  );
}
