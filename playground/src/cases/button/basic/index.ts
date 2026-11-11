import { defineCase } from '../../../core/define';

export default defineCase({
  title: '基础按钮',
  description: '类型、尺寸、禁用、加载态的视觉对照，只测挂载',
  notes: [
    '各库使用默认配置，没有开启任何调优开关（例如 3.x 的 keepStyleSheet）',
    '各库的按钮尺寸、字号、间距是各自的默认值，页面高度不同（2.x 222px，其余约 212px）',
    'antd 外层包了一层 ConfigProvider 用来设置中文，Shineout 默认就是中文，不需要；这一层的开销没有单独测过',
  ],
});
