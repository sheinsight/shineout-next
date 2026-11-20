import { Menu } from 'antd';
import { LINKS, toAntd } from '../_shared/data';

// Shineout 的 linkKey 会让整个菜单项可以点（点击空白处也跳转）；antd 没有这个属性，label 里放 <a>，只有文字区域是链接
const ITEMS = toAntd(LINKS, {
  label: (d) => (
    <a href={d.link} target='_blank' rel='noreferrer'>
      {d.title}
    </a>
  ),
});

export default function Demo() {
  return <Menu mode='inline' items={ITEMS} inlineIndent={14} style={{ width: 256, border: '1px solid #e8ebf0' }} />;
}
