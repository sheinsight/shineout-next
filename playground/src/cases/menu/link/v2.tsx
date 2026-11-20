import { Menu } from 'shineout-v2';
import { LINKS, type Item } from '../_shared/data';

export default function Demo() {
  return (
    <Menu
      keygen='id'
      linkKey='link'
      data={LINKS}
      inlineIndent={14}
      renderItem={(d: Item) => (
        <a href={d.link} target='_blank' rel='noreferrer'>
          {d.title}
        </a>
      )}
      style={{ width: 256, border: '1px solid #e8ebf0' }}
    />
  );
}
