import { defineCase } from '../../../core/define';

export default defineCase({
  title: '骨架屏 基本用法',
  description: '来自 shineout 示例 skeleton/01-base，loading 状态下的默认文本骨架，只测挂载',
  notes: [
    '2.x 没有 Skeleton 组件，没有实现',
    'Shineout 的 Skeleton 默认 text=true、3 行文字，没有标题；antd 的 Skeleton 默认有标题行加段落，这里 antd 用 title={false} + paragraph={{ rows: 3 }} 去掉标题，只保留 3 行段落，行数一致；antd 最后一行默认宽 61%，Shineout 是 100%，所以 antd 这边显式设了 width=100% 对齐；行高两边实测都是 16，行间距 Shineout 12、antd 16（3 行总高 Shineout 72、antd 80，实测），圆角和颜色是各库自己的默认（截图里 Shineout 偏蓝灰、antd 是中性灰）',
    'antd 的 Skeleton 动画叫 active，这个示例没开动画，两边都不带动画',
  ],
});
