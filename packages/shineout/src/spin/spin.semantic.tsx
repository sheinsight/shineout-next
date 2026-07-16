/**
 * Spin Semantic DOM 元数据。
 *
 * 文档站构建时通过 chunk 模板自动引入，渲染 Semantic tab。
 *
 * @see /docs/rfc/0001-semantic-dom.md
 */
import React from 'react';
import type { SemanticSchema } from '@sheinx/base';
import type { SpinSemanticKey } from '@sheinx/base';
import Spin from './index';

const SpinSemanticDemo: React.FC = () => (
  <div style={{ display: 'flex', gap: 32, alignItems: 'center' }}>
    <Spin name="ring" size={24} />
    <Spin name="ring" tip="Loading" />
    <div style={{ position: 'relative', width: 120, height: 80 }}>
      <Spin name="ring" loading>
        <div style={{ padding: 16, background: '#f5f5f5', height: '100%' }}>Content</div>
      </Spin>
    </div>
  </div>
);

const spinSemantic: SemanticSchema<SpinSemanticKey> = {
  keys: [
    {
      key: 'root',
      cn: '最外层容器',
      en: 'Outermost wrapper element',
      version: '3.10.0',
      example: `<Spin
  classNames={{ root: 'my-spin-root' }}
  styles={{ root: { opacity: 0.8 } }}
/>`,
    },
    {
      key: 'section',
      cn: '加载遮罩层（容器模式下覆盖子元素的区域）',
      en: 'Loading overlay section (covers children in container mode)',
      version: '3.10.0',
      example: `<Spin loading classNames={{ section: 'my-loading-mask' }}>
  <div>Content</div>
</Spin>`,
    },
    {
      key: 'indicator',
      cn: '动画指示器',
      en: 'The animated spinner indicator',
      version: '3.10.0',
      example: `<Spin
  classNames={{ indicator: 'my-indicator' }}
  styles={{ indicator: { transform: 'scale(1.5)' } }}
/>`,
    },
    {
      key: 'description',
      cn: '提示文案',
      en: 'The tip/description text',
      version: '3.10.0',
      example: `<Spin
  tip="Loading..."
  classNames={{ description: 'my-tip' }}
  styles={{ description: { fontSize: 14 } }}
/>`,
    },
  ],
  demo: SpinSemanticDemo,
};

export default spinSemantic;
