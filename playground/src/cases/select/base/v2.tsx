import { Select } from 'shineout-v2';
import { colors } from '../_shared/data';

export default function Demo() {
  return (
    <span data-bench='open'>
      <Select width={300} clearable data={colors} keygen={(c: string) => c} placeholder='Select Color' />
    </span>
  );
}
