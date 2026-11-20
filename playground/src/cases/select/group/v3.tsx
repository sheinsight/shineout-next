import { useState } from 'react';
import { Select } from 'shineout-v3';
import { cities, groupName, City } from '../_shared/data';

export default function Demo() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <button data-bench='open' onClick={() => setOpen(true)}>
        open
      </button>
      <Select
        width={300}
        data={cities}
        placeholder='Select a city'
        keygen='value'
        format='value'
        prediction={(v: string, d: City) => v === d.value}
        renderItem='value'
        groupBy={(d: City) => groupName(d.group)}
        clearable
        multiple
        open={open}
        onCollapse={setOpen}
      />
    </>
  );
}
