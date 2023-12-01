/**
 * cn - 尺寸
 *    -- 有 small, medium, large 三种尺寸，默认为 small
 * en - Size
 *    -- There are three sizes: small, medium, and large. The default value is small.
 */
import React from 'react';
import { Select } from 'shineout';

const data = [
  'redredredredredredredredredredredredredredredredredredredred',
  'orange',
  'yellow',
  'green',
  'cyan',
  'blue',
  'violet',
];

export default () => {
  return (
    <div style={{ display: 'flex', gap: 32, alignItems: 'center' }}>
      <Select size='small' data={data} keygen renderItem={(d) => d} />
      <Select data={data} keygen renderItem={(d) => d} />
      <Select autoAdapt size='large' data={data} keygen renderItem={(d) => d} />
    </div>
  );
};
