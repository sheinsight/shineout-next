import { Select } from 'shineout-v3';
import { colors } from '../_shared/data';

const handleFilter = (v: string) => (d: string) => d.indexOf(v) >= 0;

export default function Demo() {
  return (
    <div>
      <Select width={200} data={colors} keygen placeholder='Select Color' onFilter={handleFilter} clearable />
      <br />
      <br />
      <Select width={300} data={colors} keygen placeholder='Select Multiple Color' onFilter={handleFilter} clearable multiple />
    </div>
  );
}
