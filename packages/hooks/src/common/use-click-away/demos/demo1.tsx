/**
 * title: 基础用法
 * desc: 点击外侧面板
 * hideActions:
 *  - CSB
 */
import { useClickAway } from '@sheinx/hooks';
import React, { useState } from 'react';

export default function Demo1() {
  const [state, setState] = useState(0);
  const ref = useClickAway(() => setState(state + 1));
  return (
    <>
      <h1>hello{state}</h1>

      <div ref={ref} style={{ width: 500, height: 500, border: '1px solid gray' }}></div>
    </>
  );
}
