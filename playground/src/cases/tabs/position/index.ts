import { defineCase } from '../../../core/define';

export default defineCase({
  title: '标签页 标签位置',
  description: '来自 shineout 示例 tabs/03-position，四个方向的标签位置（上、下、左、右），line 形状，只测挂载',
  notes: [
    'Shineout 用 <Tabs.Panel tab=...> 子元素，antd 用 items 数组（key / label / children）；Shineout 的 shape 对应 antd 的 type，只有 line 和 card 对应，其余形状（button / fill / dash）antd 没有',
    'Shineout 的 position 有 8 个取值（top-left、top-right、bottom-left、bottom-right、left-top、left-bottom、right-top、right-bottom），antd 只有 4 个方向（antd 5 的 tabPosition：top / right / bottom / left；antd 6 的 tabPlacement：top / bottom / start / end，用 start / end 对应 left / right），没有「靠左 / 靠右对齐」的区分；原示例用 Radio 切换，这里把 top-left / bottom-left / left-top / right-top 四个方向同时渲染，对应 antd 的 top / bottom / left / right',
    '原示例的 autoFill（标签撑满）和 Tabs.Panel 的 disabled 都没迁（antd 没有 autoFill；disabled 在 antd 是 items 里的 disabled，这里没加）',
    '2.x 的 position 属性没有（2.x 用 align：left / right / vertical-left / vertical-right / bottom），这里 2.x 用 align 对应：top-left→不传，bottom-left→bottom，left-top→vertical-left，right-top→vertical-right；四个方向的结果截图确认三个库一致（上 / 下 / 左 / 右）',
    '2.x 的 Td 组件在开发模式下会在控制台报 defaultProps 的 React 警告，会让 smoke 标红但不影响渲染和数据',
  ],
});
