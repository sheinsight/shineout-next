import { Cascader } from 'shineout-v2';
import { cities } from '../_shared/data';

export default function Demo() {
  return (
    <Cascader
      width={300}
      clearable
      placeholder='Please select city'
      data={cities}
      keygen='value'
      onChange={() => {}}
      renderItem={(n: any) => `${n?.value}`}
    />
  );
}
