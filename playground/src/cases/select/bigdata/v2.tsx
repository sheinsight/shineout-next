import { Select } from 'shineout-v2';
import { bigData, BigItem } from '../_shared/data';

export default function Demo() {
  return (
    <span data-bench='open'>
      <Select
        width={300}
        data={bigData}
        keygen='id'
        placeholder='Static lineHeight'
        renderItem={(d: BigItem) => d.name}
        clearable
        onFilter={(() => {}) as any}
      />
    </span>
  );
}
