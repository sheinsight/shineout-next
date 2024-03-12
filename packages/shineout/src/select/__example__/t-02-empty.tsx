/**
 * cn - empty
 *    -- test empty
 * en - empty
 *    -- test empty
 */
import React from 'react';
import { Select } from 'shineout';

export default () => {
  return (
    <div>
      <Select
        width={300}
        data={[]}
        keygen
        placeholder='Select Color'
      />
    </div>
  );
};
