import { defineCase } from '../../../core/define';

export default defineCase({
  title: '提示框 Semantic DOM',
  description: '来自 shineout 示例 alert/06-semantic，用 classNames / styles 定制内部节点，只测挂载',
  notes: [
    '2.x 和 antd 5.x 的 Alert 没有 classNames / styles 属性，没有实现',
    'Shineout 的内部节点名是 root / icon / title / content / close，antd 6 对应 root / icon / title / description / close，这里按语义对应',
    '函数式 classNames：Shineout 是对单个节点传函数（root: ({ type }) => ...），antd 6 是整个 classNames 传一个函数，写法不同',
    'antd 没有 danger 类型，对应的是 error',
  ],
});
