import { Dropdown } from 'shineout-v2';
import { nestedSo } from '../_shared/data';

const menu = nestedSo.slice(0, 2);

export default function Demo() {
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, width: 700 }}>
      <Dropdown placeholder='Bottom left' position='bottom-left' data={menu} />
      <Dropdown placeholder='Bottom right' position='bottom-right' data={menu} />
      <Dropdown placeholder='Right Top' position='right-top' data={menu} />
      <Dropdown placeholder='Left Top' position='left-top' data={menu} />
      <Dropdown placeholder='Right Bottom' position='right-bottom' data={menu} />
      <Dropdown placeholder='Left Bottom' position='left-bottom' data={menu} />
      <Dropdown placeholder='Top Left' position='top-left' data={menu} />
      <Dropdown placeholder='Top right' position='top-right' data={menu} />
    </div>
  );
}
