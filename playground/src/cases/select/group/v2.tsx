import { Select } from 'shineout-v2';
import { cities, groupName, City } from '../_shared/data';

export default function Demo() {
  return (
    <span data-bench='open'>
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
      />
    </span>
  );
}
