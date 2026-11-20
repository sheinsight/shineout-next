import { Select } from 'shineout-v2';
import { colors } from '../_shared/data';

const handleFilter = (v: string) => (d: string) => d.indexOf(v) >= 0;

export default function Demo() {
  return (
    <div>
      <Select width={200} data={colors} keygen={(c: string) => c} placeholder='Select Color' onFilter={handleFilter} clearable />
      <br />
      <br />
      <Select width={300} data={colors} keygen={(c: string) => c} placeholder='Select Multiple Color' onFilter={handleFilter} clearable multiple />
    </div>
  );
}
