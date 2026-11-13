import { Cascader } from 'shineout-v3';
import { cities } from '../_shared/data';

export default function Demo() {
  return (
    <Cascader
      width={300}
      clearable
      placeholder='Please select city'
      data={cities}
      keygen='value'
      defaultValue={['jiangsu', 'nanjing', 'jiangning']}
      onChange={() => {}}
      renderResult={(node: any) => node.value.toLocaleUpperCase()}
      renderItem={(n: any) => `${n?.value}`}
    />
  );
}
