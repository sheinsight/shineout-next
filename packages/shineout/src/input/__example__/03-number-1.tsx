/**
 * cn -
 *    -- Input.Number 组件，可以通过鼠标和上下键辅助输入
 *    -- 需要注意在输入的过程中 value 是 string 类型；blur 时会转换为 number 类型
 * en -
 *    -- Input.Number component, can be assisted by mouse and up and down keys to input
 *    -- Note that the value is a string type during input; it will be converted to a number type when blur
 */

import React from 'react';
import { Input, Gap, Link, icons } from 'shineout';

const btnStyle: React.CSSProperties = {
  cursor: 'pointer',
}
const iconStyle: React.CSSProperties = {
  width: 16,
  height: 16,
}

const App: React.FC = () => {
  const [number, setNumber] = React.useState<string | undefined>();

  const onMinus = () => {
    setNumber((Number(number || 0) - 1).toString());
  }

  const onPlus = () => {
    setNumber((Number(number || 0) + 1).toString());
  }

  return (
    <Gap style={{flexDirection: 'column', gap: 24}}>
      <Input.Group width={300}>
        <b onClick={onMinus} style={btnStyle}><Link style={iconStyle} type="secondary">{icons.Minus}</Link></b>
        <Input type="number" value={number} onChange={(v) => setNumber(v)} placeholder='please enter' />
        <b onClick={onPlus} style={btnStyle}><Link style={iconStyle} type="secondary">{icons.Add}</Link></b>
      </Input.Group>

      <Input.Number
        width={300}
        onChange={(v) => {
          console.log('Input.Number', v);
        }}
        placeholder='please enter'
      />
    </Gap>
  );
};

export default App;
