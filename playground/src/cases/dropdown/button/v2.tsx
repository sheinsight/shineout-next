import { Dropdown } from 'shineout-v2';
import { simpleSo } from '../_shared/data';

const menu = simpleSo(3);
const col = { display: 'flex', flexDirection: 'column' as const, alignItems: 'flex-start', gap: 24 };

export default function Demo() {
  return (
    <div style={{ display: 'flex', gap: 24 }}>
    <div style={col}>
      <Dropdown data={menu} placeholder='Default' type='primary' />
      <Dropdown data={menu} placeholder='Default' type='secondary' />
      <Dropdown data={menu} placeholder='Default' type='danger' />
      <Dropdown data={menu} placeholder='Default' type='warning' />
      <Dropdown data={menu} placeholder='Default' type='success' />
    </div>
    <div style={col}>
      <Dropdown data={menu} placeholder='Outline' type='primary' outline />
      <Dropdown data={menu} placeholder='Outline' type='secondary' outline />
      <Dropdown data={menu} placeholder='Outline' type='danger' outline />
      <Dropdown data={menu} placeholder='Outline' type='warning' outline />
      <Dropdown data={menu} placeholder='Outline' type='success' outline />
    </div>
    </div>
  );
}
