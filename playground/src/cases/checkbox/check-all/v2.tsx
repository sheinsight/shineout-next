import { useState } from 'react';
import { Checkbox } from 'shineout-v2';
import { fruits, getChecked } from '../_shared/data';

export default function Demo() {
  const [value, setValue] = useState<string[]>([]);
  const checked = getChecked(value, fruits.length);
  return (
    <div>
      <Checkbox checked={checked} onChange={(v: any) => setValue(v ? fruits : [])}>
        {checked === true ? 'UnCheckAll' : 'CheckAll'}
      </Checkbox>
      <Checkbox.Group style={{ marginTop: 12 }} data={fruits} keygen value={value} onChange={setValue} />
    </div>
  );
}
