import { Cascader } from 'shineout-v2';
import { cities } from '../_shared/data';

const handleDisabled = (item: any) => item.value === 'jiangsu';

export default function Demo() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <Cascader
        disabled
        width={300}
        placeholder='Please select city'
        data={cities}
        keygen='value'
        onChange={() => {}}
        renderItem={(n: any) => `${n?.value}`}
      />
      <Cascader
        clearable
        disabled={handleDisabled}
        width={300}
        placeholder='Please select city'
        data={cities}
        keygen='value'
        onChange={() => {}}
        renderItem={(n: any) => `${n?.value}`}
      />
      <Cascader
        disabled
        mode={0}
        defaultValue={['jiangsu', 'nanjing']}
        width={300}
        placeholder='Please select city'
        data={cities}
        keygen='value'
        onChange={() => {}}
        renderItem={(n: any) => `${n?.value}`}
      />
      <Cascader
        clearable
        mode={0}
        disabled={handleDisabled}
        width={300}
        placeholder='Please select city'
        data={cities}
        keygen='value'
        onChange={() => {}}
        renderItem={(n: any) => `${n?.value}`}
      />
    </div>
  );
}
