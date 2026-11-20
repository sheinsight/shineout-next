import { defineCase } from '../../../core/define';

export default defineCase({
  title: '描述列表 基础用法',
  description: '来自 shineout 示例 descriptions/01-base，五项信息加标题，只测挂载',
  notes: [
    '2.x 没有 Descriptions 组件，只有 3.x、antd5、antd6 参与',
    '数据项：Shineout 是 { label, value }，antd 是 { label, children }，转换在 _shared/data.ts',
    'colon：Shineout 可以传节点（原示例传了 " :"），antd 只是布尔值，用默认的冒号，冒号样式略有不同',
  ],
});
