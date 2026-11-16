import { defineCase } from '../../../core/define';

export default defineCase({
  title: '进度条 基础用法',
  description: '来自 shineout 示例 progress/01-base，宽 400 的线形进度条，只测挂载',
  notes: [
    'value ↔ antd 的 percent。原示例没有 children，不显示文字，所以 antd 设了 showInfo={false} 去掉默认的百分比文字',
    '线条高度没有显式设置（原示例也没设），两边各用自己的默认值',
  ],
});
