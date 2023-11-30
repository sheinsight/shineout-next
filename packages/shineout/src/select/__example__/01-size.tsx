/**
 * cn - 尺寸
 *    -- 有 small, medium, large 三种尺寸，默认为 small
 * en - Size
 *    -- There are three sizes: small, medium, and large. The default value is small.
 */
import React from 'react';
import { Select } from 'shineout';

export default () => {
  const data = ['red', 'orange', 'yellow', 'green', 'cyan', 'blue', 'violet'];
  return (
    <div>
      <div style={{ display: 'flex', gap: 32, alignItems: 'center' }}>
        <Select size='small' data={data} keygen renderItem={(d) => d} />
        <Select data={data} keygen renderItem={(d) => d} />
        <Select size='large' data={data} keygen renderItem={(d) => d} />
      </div>
      <div style={{ display: 'flex', gap: 32, alignItems: 'center', marginTop: 32 }}>
        <Select size='small' data={data} keygen renderItem={(d) => d} placeholder='placeholder' />
        <Select data={data} keygen renderItem={(d) => d} placeholder='placeholder' />
        <Select size='large' data={data} keygen renderItem={(d) => d} placeholder='placeholder' />
      </div>
      <div style={{ display: 'flex', gap: 32, alignItems: 'center', marginTop: 32 }}>
        <Select multiple size='small' data={data} keygen renderItem={(d) => d} />
        <Select multiple data={data} keygen renderItem={(d) => d} />
        <Select multiple size='large' data={data} keygen renderItem={(d) => d} />
      </div>
      <div style={{ display: 'flex', gap: 32, alignItems: 'center', marginTop: 32 }}>
        <Select
          multiple
          size='small'
          data={data}
          keygen
          renderItem={(d) => d}
          placeholder='placeholder'
        />
        <Select multiple data={data} keygen renderItem={(d) => d} placeholder='placeholder' />
        <Select
          multiple
          size='large'
          data={data}
          keygen
          renderItem={(d) => d}
          placeholder='placeholder'
        />
      </div>
    </div>
  );
};
