import { defineCase } from '../../../core/define';

export default defineCase({
  title: '标签 基本用法',
  description: '来自 shineout 示例 tag/s-001-base，5 种颜色，只测挂载',
  notes: [
    '颜色对应是近似的：Shineout 的 default / info / danger / warning / success 对应 antd 的 default / processing / error / warning / success（antd 的 info 状态色叫 processing）；色值不同（实测 3.x info 是蓝 #197AFA，antd processing 是 #1677ff 系），所以只是语义相同，颜色不等价',
    '2.x 的颜色属性叫 type（不是 color），取值 default / info / danger / warning / success；2.x 的 Tag 默认外观是实心色（info 是青色 #17a2b8），和 3.x 的 bright 浅底色外观不同（实测 2.x info 背景 rgb(23,162,184)，3.x 默认 bright 的 info 背景是浅蓝），所以 2.x 和 3.x 的默认看起来就不同',
    '实测尺寸（高度 px）：2.x 22，3.x 22，antd 22，字号 2.x 10.5 / 3.x 12 / antd 12',
    '2.x 的 Tag 在开发模式下可能有 React 警告，会让 smoke 标红但不影响渲染和数据',
  ],
});
