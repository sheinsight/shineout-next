import { defineCase } from '../../../core/define';

export default defineCase({
  title: '加载中 语义化 DOM',
  description: '来自 shineout 示例 spin/05-semantic，独立模式和容器模式两种，用 classNames / styles 定制，只测挂载',
  notes: [
    '只有 3.x 和 antd 6 参与：2.x 没有 classNames / styles；antd 5 的 Spin 没有语义化属性',
    '节点对应关系（读类型得到）：Shineout 的 root / section / indicator / description 对应 antd 6 的 root / section / indicator / description，名字一致；antd 6 另有 container（包裹内容的节点）',
    'Shineout 的 classNames.root 函数形式入参是 { loading }；antd 6 的函数形式是整个对象 ({ props }) => ({...})，这里 antd 的 root 写成 ({ props }) => ({ root: props.spinning ? ... : ... })',
    'antd 6 独立模式的 description 能直接显示（见 tip 用例），两边都不包内容；两边的 section / indicator 样式值相同（root 内边距 16，section backdropFilter: blur(2px)，description 字号 14 / 上边距 8）',
    '截图差异：Shineout 的 section 铺满整个容器，backdropFilter 把全部被包裹内容都糊了；antd 6 的 section 只是指示器所在的小块，blur 只糊了中间一小块内容，同样的样式值效果不等价。未设 size 时 Shineout 的 ring 比 antd 默认指示器大（截图）',
    'Shineout 的 Spin 有 12 种动画（name 属性），antd 只有一种，所以这里统一用 name=ring（环形）对 antd 的默认指示器；两边的动画不是同一个东西',
    '加载动画是持续运行的 CSS 动画，场景里只测挂载；动画本身持续占用的主线程不在这个用例的数据里',
  ],
});
