/**
 * Badge Semantic DOM 元数据。
 *
 * 文档站构建时通过 chunk 模板自动引入，渲染 Semantic tab。
 *
 * @see /docs/rfc/0001-semantic-dom.md
 */
import React from 'react';
import type { SemanticSchema } from '@sheinx/base';
import type { BadgeSemanticKey } from '@sheinx/base';
import { Badge } from 'shineout';

const BadgeSemanticDemo: React.FC = () => (
  <div style={{ display: 'flex', gap: 24 }}>
    <Badge count={5}>
      <div style={{ width: 40, height: 40, background: '#eee', borderRadius: 4 }} />
    </Badge>
    <Badge dot>
      <div style={{ width: 40, height: 40, background: '#eee', borderRadius: 4 }} />
    </Badge>
  </div>
);

const badgeSemantic: SemanticSchema<BadgeSemanticKey> = {
  keys: [
    {
      key: 'root',
      cn: 'Badge 最外层容器',
      en: 'Badge outermost wrapper element',
      version: '3.10.0',
      example: `<Badge
  classNames={{ root: 'my-badge' }}
  styles={{ root: { display: 'inline-block' } }}
/>`,
    },
    {
      key: 'badge',
      cn: '右上角徽标元素（数字/圆点）',
      en: 'Badge indicator element (count/dot)',
      version: '3.10.0',
      example: `<Badge
  classNames={{ badge: 'my-indicator' }}
  styles={{ badge: { fontSize: 10 } }}
/>`,
    },
  ],
  demo: BadgeSemanticDemo,
};

export default badgeSemantic;
