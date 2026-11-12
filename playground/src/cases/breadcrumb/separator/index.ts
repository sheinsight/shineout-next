import { defineCase } from '../../../core/define';

export default defineCase({
  title: '面包屑 自定义分隔符',
  description: '来自 shineout 示例 breadcrumb/02-separator，默认 / 与自定义 >，只测挂载',
  notes: [
    '数据结构沿用 Shineout 的写法，antd 用 toAntdItems 转成 items（_shared/data.ts），两边数据内容一致',
  ],
});
