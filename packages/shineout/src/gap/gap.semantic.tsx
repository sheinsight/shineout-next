/**
 * Gap Semantic DOM 元数据。
 *
 * @see /docs/rfc/0001-semantic-dom.md
 */
import React from 'react';
import type { SemanticSchema } from '@sheinx/base';
import type { GapSemanticKey } from '@sheinx/base';
import Gap from './index';

const GapSemanticDemo: React.FC = () => (
  <div style={{ width: '100%' }}>
    <Gap column={12} row={12}>
      <div style={{ padding: '8px 16px', background: '#e6f4ff', borderRadius: 4 }}>Item 1</div>
      <div style={{ padding: '8px 16px', background: '#e6f4ff', borderRadius: 4 }}>Item 2</div>
      <div style={{ padding: '8px 16px', background: '#e6f4ff', borderRadius: 4 }}>Item 3</div>
      <div style={{ padding: '8px 16px', background: '#e6f4ff', borderRadius: 4 }}>Item 4</div>
    </Gap>
  </div>
);

const gapSemantic: SemanticSchema<GapSemanticKey> = {
  keys: [
    {
      key: 'root',
      cn: '外层 flex 容器',
      en: 'Outer flex container',
      version: '3.10.0',
      example: `<Gap
  classNames={{ root: 'my-gap' }}
  styles={{ root: { padding: 16 } }}
>
  ...
</Gap>`,
    },
    {
      key: 'item',
      cn: '子元素包裹层',
      en: 'Child element wrapper',
      version: '3.10.0',
      example: `<Gap
  classNames={{ item: 'my-gap-item' }}
  styles={{ item: { flex: '0 0 auto' } }}
>
  ...
</Gap>`,
    },
  ],
  demo: GapSemanticDemo,
};

export default gapSemantic;
