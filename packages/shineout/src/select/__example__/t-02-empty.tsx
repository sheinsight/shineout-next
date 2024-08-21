/**
 * cn - empty
 *    -- test empty
 * en - empty
 *    -- test empty
 */
import React from 'react';
import { Select } from 'shineout';

const options = [
  { id: 0, name: 'zero' },
  { id: 1, name: 'red' },
  { id: 2, name: 'blue' },
  { id: 3, name: 'yellow' },
  { id: 4, name: 'green' },
  { id: 5, name: 'black' },
  { id: 6, name: 'white' },
]

export default () => {
  return (
    <div>
      <Select
        width={300}
        data={options}
        keygen="id"
        // multiple
        // renderItem="name"
        renderItem={item => <span>
          <span style={{background: 'green', color: '#fff', marginRight: 8}}>通过</span>
          {item.name}
        </span>}
        placeholder='Select Color'
        onFilter={text => (item) => item.name.indexOf(text) > -1}
      />
    </div>
  );
};
