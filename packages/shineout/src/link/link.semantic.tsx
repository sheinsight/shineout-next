/**
 * Link Semantic DOM 元数据。
 *
 * @see /docs/rfc/0001-semantic-dom.md
 */
import React from 'react';
import type { SemanticSchema } from '@sheinx/base';
import type { LinkSemanticKey } from '@sheinx/base';
import Link from './index';

const LinkSemanticDemo: React.FC = () => (
  <div style={{ width: '100%', display: 'flex', gap: 24, alignItems: 'center', flexWrap: 'wrap' }}>
    <Link href="#" icon>Link with icon</Link>
    <Link href="#" type="secondary">Secondary</Link>
    <Link href="#" type="danger" disabled>Disabled</Link>
  </div>
);

const linkSemantic: SemanticSchema<LinkSemanticKey> = {
  keys: [
    {
      key: 'root',
      cn: '链接元素（a 标签）',
      en: 'Link element (anchor tag)',
      version: '3.10.0',
      example: `<Link
  classNames={{ root: 'my-link' }}
  styles={{ root: { textDecoration: 'none' } }}
>
  Click me
</Link>`,
    },
    {
      key: 'icon',
      cn: '图标容器',
      en: 'Icon container',
      version: '3.10.0',
      example: `<Link
  icon
  classNames={{ icon: 'my-link-icon' }}
  styles={{ icon: { marginRight: 8 } }}
>
  With icon
</Link>`,
    },
  ],
  demo: LinkSemanticDemo,
};

export default linkSemantic;
