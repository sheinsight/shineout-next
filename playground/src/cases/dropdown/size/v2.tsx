import { Dropdown } from 'shineout-v2';
import { simpleSo } from '../_shared/data';

const menu = simpleSo(4);

export default function Demo() {
  return (
    <div>
      {(['small', 'default', 'large'] as const).map((size) => (
        <Dropdown type='primary' outline key={size} data={menu} placeholder='Dropdown' size={size} style={{ marginInlineEnd: 24 }} />
      ))}
    </div>
  );
}
