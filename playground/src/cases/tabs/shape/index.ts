import { defineCase } from '../../../core/define';

export default defineCase({
  title: '标签页 形状',
  description: '来自 shineout 示例 tabs/02-01、02-03 的 line 和 card 两种形状，只测挂载',
  notes: [
    'Shineout 用 <Tabs.Panel tab=...> 子元素，antd 用 items 数组（key / label / children）；Shineout 的 shape 对应 antd 的 type，只有 line 和 card 对应，其余形状（button / fill / dash）antd 没有',
    '原示例 02-02（button）、02-04（fill）、02-05（dash）三种形状 antd 没有对应，没迁；只迁 line 和 card',
    '原示例每种形状一个文件，这里把 line 和 card 并排渲染在一个用例里',
    '2.x 的 Td 组件在开发模式下会在控制台报 defaultProps 的 React 警告，会让 smoke 标红但不影响渲染和数据',
  ],
});
