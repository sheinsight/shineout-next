/**
 * Progress Semantic DOM 元数据。
 *
 * 文档站构建时通过 chunk 模板自动引入，渲染 Semantic tab。
 *
 * @see /docs/rfc/0001-semantic-dom.md
 */
import React from 'react';
import type { SemanticSchema } from '@sheinx/base';
import type { ProgressSemanticKey } from '@sheinx/base';
import Progress from './index';

const ProgressSemanticDemo: React.FC = () => (
  <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 24, padding: 16 }}>
    <Progress shape="line" value={60} type="info" strokeWidth={8} />
    <Progress shape="line" value={80} type="success" icon />
    <div style={{ display: 'flex', gap: 24 }}>
      <Progress shape="circle" value={75} size={80} strokeWidth={6}>75%</Progress>
      <Progress shape="circle" value={100} type="success" size={80} strokeWidth={6} icon />
    </div>
  </div>
);

const progressSemantic: SemanticSchema<ProgressSemanticKey> = {
  keys: [
    {
      key: 'root',
      cn: '最外层容器',
      en: 'Outermost wrapper element',
      version: '3.10.0',
      example: `<Progress
  classNames={{ root: 'my-progress' }}
  styles={{ root: { marginBottom: 16 } }}
/>`,
    },
    {
      key: 'track',
      cn: '背景轨道（line 模式为背景条；circle 模式为背景圆环）',
      en: 'Background track (bar background for line; background circle for circle)',
      version: '3.10.0',
      example: `<Progress
  classNames={{ track: 'my-track' }}
  styles={{ track: { borderRadius: 4 } }}
/>`,
    },
    {
      key: 'indicator',
      cn: '进度前景条（line 模式为前景填充条；circle 模式为前景圆弧）',
      en: 'Progress indicator (foreground bar for line; foreground arc for circle)',
      version: '3.10.0',
      example: `<Progress
  classNames={{ indicator: 'my-indicator' }}
  styles={{ indicator: { background: 'linear-gradient(90deg, #1890ff, #52c41a)' } }}
/>`,
    },
    {
      key: 'content',
      cn: '文字/自定义内容区域（children 渲染处）',
      en: 'Content area where children are rendered',
      version: '3.10.0',
      example: `<Progress
  value={75}
  classNames={{ content: 'my-content' }}
  styles={{ content: { fontWeight: 'bold' } }}
>
  75%
</Progress>`,
    },
    {
      key: 'icon',
      cn: '状态图标区域',
      en: 'Status icon area',
      version: '3.10.0',
      example: `<Progress
  icon
  type="success"
  classNames={{ icon: 'my-icon' }}
  styles={{ icon: { color: 'green' } }}
/>`,
    },
  ],
  demo: ProgressSemanticDemo,
};

export default progressSemantic;
