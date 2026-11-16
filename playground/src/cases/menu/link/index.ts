import { defineCase } from '../../../core/define';

export default defineCase({
  title: '菜单 链接',
  description: '来自 shineout 示例 menu/02-01-link，三个外链菜单项，只测挂载',
  notes: [
    'Shineout 的 linkKey 让整个菜单项可点，且会调整 <a> 的布局；antd 没有 linkKey，只在 label 里放 <a>，所以可点区域不同，这里只比挂载',
  ],
});
