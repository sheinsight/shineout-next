import { Cascader } from 'shineout-v2';
import { cities } from '../_shared/data';

const handleFilter = (text: string) => (d: any) => d.value.indexOf(text) >= 0;

export default function Demo() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <Cascader
        width={300}
        placeholder='Please select city'
        data={cities}
        keygen='value'
        onChange={() => {}}
        renderItem={(n: any) => `${n?.value}`}
          onFilter={handleFilter}
      />
      <Cascader
        mode={3}
        width={300}
        placeholder='Please select city'
        data={cities}
        keygen='value'
        onChange={() => {}}
        renderItem={(n: any) => `${n?.value}`}
          onFilter={handleFilter}
      />
    </div>
  );
}
