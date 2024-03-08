/**
 * cn - tip
 *    -- test tip
 * en - tip
 *    -- test tip
 */
import React from 'react';
import { Select } from 'shineout';
import { primitiveData } from './static/mock';

export default () => {
  return (
    <div>
      <Select tip='i am a tip' width={300} data={primitiveData} keygen placeholder='Select Color' />
      <Select status='error' width={300} data={primitiveData} keygen placeholder='Select Color' />
      <Select
        error={'error'}
        popover
        width={300}
        data={primitiveData}
        keygen
        placeholder='Select Color'
      />
    </div>
  );
};
