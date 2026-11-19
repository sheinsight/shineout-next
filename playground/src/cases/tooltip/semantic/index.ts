import { defineCase } from '../../../core/define';

export default defineCase({
  title: '文字提示 语义化 DOM',
  description: '来自 shineout 示例 tooltip/example-11-semantic 的第一个（静态 classNames + styles），只测挂载',
  notes: [
    '只测挂载，没有「悬停打开」的交互场景：Shineout 的 Tooltip 没有受控的显示属性（仓库源码 packages/base 的 tooltip.type.ts 里 visible 是被注释掉的），不能像 popover 那样用 data-bench 按钮直接打开；走真实的悬停路径时，合成 mouseover 后气泡实测约 2.x 15ms / 3.x 13ms / antd 118ms（antd 默认 mouseEnterDelay 100ms）才出现，都晚于场景的测量窗口（一帧），测到的只会是事件派发本身，不是气泡渲染，所以不做；挂载数据测的是每个触发元素上 Tooltip 的初始化开销（气泡本身要悬停才渲染）',
    '只有 3.x 和 antd 6 参与：2.x 没有 classNames / styles；antd 5 的 Tooltip 虽然有 classNames / styles，但读类型确认 key 只有 root 和 body，没有 arrow，对不上 Shineout 的 arrow / content，所以不参与',
    '节点对应关系：Shineout 的 root / arrow / content 对应 antd 6 的 root / arrow / container（antd 的气泡内容容器叫 container）',
    '原示例另外 3 个函数式 classNames（根据 open / type 状态动态返回类名）没迁：antd 6 的函数式 classNames 是整个对象函数 ({ props }) => ({ ... })，写法和 Shineout 的每个 key 一个函数不同，而且气泡没打开时函数的结果看不到，对挂载数据没有意义',
  ],
});
