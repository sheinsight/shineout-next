/**
 * cn - 非法number
 *    -- 输入非法的数字时，Input.Number 不会触发 onChange 事件
 * en - Invalid number
 *    -- When an invalid number is entered, Input.Number will not trigger the onChange event
 */
import React from 'react';
import { Button, Input } from 'shineout';

export default () => {
  const [value, setValue] = React.useState();
  const onIncrease = () => {
    setValue((v) => {
      const next = Number(v || 0) + 1;
      return next;
    });
  }

  const [defaultValue, setDefaultValue] = React.useState(1);
  const onDefaultChange = () => {
    setDefaultValue((v) => {
      const next = Number(v || 0) + 1;
      return next;
    });
  }
  return (
    <div style={{display: 'flex', gap: 12}}>
      <Input.Number
        width={300}
        placeholder='input something'
        defaultValue={defaultValue}
        type="number"
        // value={value}
        // onChange={v => {
        //   console.log('======================')
        //   console.log('outter onChange: >>', typeof v, v)
        //   console.log('======================')
        //   setValue(v);
        // }}
      />
      <Button onClick={onIncrease}>increase value</Button>
      <Button onClick={onDefaultChange}>change default value</Button>
    </div>
  );
};
