import { Cascader } from 'shineout-v3';
import { cities } from '../_shared/data';

export default function Demo() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      <Cascader
        clearable
        width={300}
        placeholder='Please select city'
        data={cities}
        keygen='value'
        onChange={() => {}}
        renderItem={(n: any) => `${n?.value}`}
          size='small'
      />
      <Cascader
        clearable
        width={300}
        placeholder='Please select city'
        data={cities}
        keygen='value'
        onChange={() => {}}
        renderItem={(n: any) => `${n?.value}`}
      />
      <Cascader
        clearable
        width={300}
        placeholder='Please select city'
        data={cities}
        keygen='value'
        onChange={() => {}}
        renderItem={(n: any) => `${n?.value}`}
          size='large'
      />
    </div>
  );
}
