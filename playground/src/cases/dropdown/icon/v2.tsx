import { Dropdown } from 'shineout-v2';
import { UserIcon } from '../_shared/data';

const menu = Array.from({ length: 5 }, (_, i) => ({
  content: (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <UserIcon /> <span style={{ marginInlineStart: 8 }}>{`item${i}`}</span>
    </div>
  ),
}));

export default function Demo() {
  return <Dropdown placeholder='Icon Menu' data={menu} />;
}
