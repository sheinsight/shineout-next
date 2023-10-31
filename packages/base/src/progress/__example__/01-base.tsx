/**
 * cn - 基本用法
 *    --
 * en - Basic
 *    --
 */
import React, { useState, useEffect } from 'react';
import { Progress, RadioGroup } from '@sheinx/base';
import { useProgressStyle, useRadioStyle } from '@sheinx/shineout-style';

const jssStyle = {
  progress: useProgressStyle,
};

export default () => {
  const [shape, setShape] = useState<any>('line-inner');
  const [value, setValue] = useState(0);
  const [type, setType] = useState<any>('success');
  const [icon, setIcon] = useState(false);
  useEffect(() => {
    const interval = setInterval(() => {
      setValue((v) => {
        if (v >= 100) {
          return 0;
        }
        return v + 1;
      });
    }, 200);
    return () => clearInterval(interval);
  });
  return (
    <div>
      <button
        type='button'
        onClick={() => {
          setIcon((i) => !i);
        }}
      >
        {icon ? '隐藏icon' : '展示icon'}
      </button>
      <RadioGroup
        jssStyle={{ radio: useRadioStyle }}
        data={['line', 'line-pop', 'line-inner', 'circle']}
        value={shape}
        onChange={setShape}
        keygen
      />
      <RadioGroup
        jssStyle={{ radio: useRadioStyle }}
        data={['success', 'info', 'warning', 'danger']}
        value={type}
        onChange={setType}
        keygen
      />
      <Progress
        iconSize={30}
        icon={icon}
        type={type}
        jssStyle={jssStyle}
        value={value}
        shape={shape}
      >
        <span>{value}%</span>
      </Progress>
    </div>
  );
};
