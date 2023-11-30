/**
 * cn - 基本用法
 *    --
 * en - Basic
 *    --
 */
import React from 'react';
import { Select } from 'shineout';

export default () => {
  const data = ['red', 'orange', 'yellow', 'green', 'cyan', 'blue', 'violet'];
  return (
    <div>
      <Select data={data} keygen renderItem={(d) => d} multiple />
    </div>
  );
};
