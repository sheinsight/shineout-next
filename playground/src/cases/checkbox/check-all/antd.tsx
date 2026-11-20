import { useState } from 'react';
import { Checkbox } from 'antd';
import { fruits, getChecked } from '../_shared/data';

export default function Demo() {
  const [value, setValue] = useState<string[]>([]);
  const checked = getChecked(value, fruits.length);
  return (
    <div>
      <Checkbox
        checked={checked === true}
        indeterminate={checked === 'indeterminate'}
        onChange={(e) => setValue(e.target.checked ? fruits : [])}
      >
        {checked === true ? 'UnCheckAll' : 'CheckAll'}
      </Checkbox>
      <Checkbox.Group style={{ marginTop: 12 }} options={fruits} value={value} onChange={(v) => setValue(v as string[])} />
    </div>
  );
}
