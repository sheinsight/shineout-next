/**
 * List Semantic DOM 元数据。
 *
 * 文档站构建时通过 chunk 模板自动引入，渲染 Semantic tab。
 *
 * @see /docs/rfc/0001-semantic-dom.md
 */
import React from 'react';
import type { SemanticSchema } from '@sheinx/base';
import type { ListSemanticKey } from '@sheinx/base';
import { List } from 'shineout';

const data = ['Item 1', 'Item 2', 'Item 3', 'Item 4'];

const ListSemanticDemo: React.FC = () => (
  <List
    keygen={(d) => d}
    data={data}
    bordered
    renderItem={(d) => d}
    footer={<div style={{ padding: '12px 16px', backgroundColor: '#fff' }}>Footer</div>}
    style={{ width: 300 }}
  />
);

const listSemantic: SemanticSchema<ListSemanticKey> = {
  keys: [
    {
      key: 'root',
      cn: 'List 最外层容器',
      en: 'List outermost wrapper element',
      version: '3.10.0',
      example: `<List
  classNames={{ root: 'my-list' }}
  styles={{ root: { borderRadius: 8 } }}
/>`,
    },
    {
      key: 'item',
      cn: '每个列表项',
      en: 'Each list item',
      version: '3.10.0',
      example: `<List
  classNames={{ item: 'my-item' }}
  styles={{ item: { padding: '8px 16px' } }}
/>`,
    },
    {
      key: 'footer',
      cn: '底部内容区域',
      en: 'Footer content area',
      version: '3.10.0',
      example: `<List
  classNames={{ footer: 'my-footer' }}
  styles={{ footer: { borderTop: '1px solid #f0f0f0' } }}
/>`,
    },
  ],
  demo: ListSemanticDemo,
};

export default listSemantic;
