import { Dropdown } from 'shineout-v3';

const menu = [{ content: 'First' }, { content: 'Second' }, { content: 'Third', divider: true }, { content: 'Fourth' }];

export default function Demo() {
  return <Dropdown data={menu} placeholder='Dividing Line' position='bottom-left' />;
}
