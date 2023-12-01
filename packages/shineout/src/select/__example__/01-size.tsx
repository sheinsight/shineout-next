/**
 * cn - 尺寸
 *    -- 有 small, medium, large 三种尺寸，默认为 small
 * en - Size
 *    -- There are three sizes: small, medium, and large. The default value is small.
 */
import React from 'react';
import { Select } from 'shineout';

const data = [
  'red',
  'orange',
  'yellow',
  'green',
  'cyan',
  'blue',
  'violet',
  '1',
  '2',
  '3',
  '4',
  '5',
  '6',
];

export default () => {
  const handleFilter = (text) => (d) => {
    return d.indexOf(text) > -1;
  };

  return (
    <div>
      <div style={{ display: 'flex', gap: 32, alignItems: 'center' }}>
        <Select onFilter={handleFilter} size='small' data={data} keygen renderItem={(d) => d} />
        <Select onFilter={handleFilter} data={data} keygen renderItem={(d) => d} />
        <Select onFilter={handleFilter} size='large' data={data} keygen renderItem={(d) => d} />
      </div>
      <div style={{ display: 'flex', gap: 32, alignItems: 'center', marginTop: 32 }}>
        <Select
          onFilter={handleFilter}
          size='small'
          data={data}
          keygen
          renderItem={(d) => d}
          placeholder='placeholder'
        />
        <Select
          onFilter={handleFilter}
          data={data}
          keygen
          renderItem={(d) => d}
          placeholder='placeholder'
        />
        <Select
          onFilter={handleFilter}
          size='large'
          data={data}
          keygen
          renderItem={(d) => d}
          placeholder='placeholder'
        />
      </div>
      <div style={{ display: 'flex', gap: 32, alignItems: 'center', marginTop: 32 }}>
        <Select onFilter={handleFilter} size='small' data={data} keygen renderItem={(d) => d} />
        <Select onFilter={handleFilter} data={data} keygen renderItem={(d) => d} />
        <Select onFilter={handleFilter} size='large' data={data} keygen renderItem={(d) => d} />
      </div>
      <div style={{ display: 'flex', gap: 32, alignItems: 'center', marginTop: 32 }}>
        <Select
          onFilter={handleFilter}
          size='small'
          data={data}
          keygen
          renderItem={(d) => d}
          placeholder='placeholder'
        />
        <Select
          onFilter={handleFilter}
          data={data}
          keygen
          renderItem={(d) => d}
          placeholder='placeholder'
        />
        <Select
          onFilter={handleFilter}
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
