import { defineCase } from '../../../core/define';

export default defineCase({
  title: '徽标 Semantic DOM',
  description: '来自 shineout 示例 badge/06-semantic，用 classNames / styles 定制内部节点，只测挂载',
  notes: [
    '2.x 没有 Badge 组件，没有实现',
    'Shineout 的内部节点名是 root / badge，antd 对应 root / indicator，这里按语义对应',
    'antd 5.x 的 styles / classNames 也是 root / indicator，只支持静态对象',
  ],
});
