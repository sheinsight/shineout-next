/**
 * Divider Semantic DOM 元数据。
 *
 * @see /docs/rfc/0001-semantic-dom.md
 */
import React from 'react';
import type { SemanticSchema } from '@sheinx/base';
import type { DividerSemanticKey } from '@sheinx/base';
import Divider from './index';

const DividerSemanticDemo: React.FC = () => (
  <div style={{ width: '100%' }}>
    <Divider>Center Text</Divider>
    <Divider orientation="left">Left Text</Divider>
    <Divider type="dashed">Dashed</Divider>
  </div>
);

const dividerSemantic: SemanticSchema<DividerSemanticKey> = {
  keys: [
    {
      key: 'root',
      cn: '分割线容器',
      en: 'Divider container element',
      version: '3.10.0',
      example: `<Divider
  classNames={{ root: 'my-divider' }}
  styles={{ root: { margin: '24px 0' } }}
>
  Section
</Divider>`,
    },
    {
      key: 'content',
      cn: '文字内容区域',
      en: 'Text content area',
      version: '3.10.0',
      example: `<Divider
  classNames={{ content: 'my-divider-text' }}
  styles={{ content: { fontSize: 16, fontWeight: 'bold' } }}
>
  Title
</Divider>`,
    },
  ],
  demo: DividerSemanticDemo,
};

export default dividerSemantic;
