import { Dropdown } from 'shineout-v3';

const menu = Array.from({ length: 4 }, (_, i) => ({
  content: `item${i}`,
  group: i % 2 === 0 ? `group${i / 2}` : undefined,
}));

export default function Demo() {
  return <Dropdown data={menu} placeholder='Group Menu' absolute />;
}
