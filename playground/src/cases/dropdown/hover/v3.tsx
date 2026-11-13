import { Dropdown } from 'shineout-v3';
import { simpleSo } from '../_shared/data';

const menu = simpleSo(5);

export default function Demo() {
  return (
    <>
      <Dropdown trigger='click' placeholder='Click me' data={menu} />
      <Dropdown trigger='hover' placeholder='Hover me' data={menu} />
    </>
  );
}
