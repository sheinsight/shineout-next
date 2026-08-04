/**
 * Pagination Semantic DOM 元数据。
 *
 * 文档站构建时通过 chunk 模板自动引入，渲染 Semantic tab。
 *
 * @see /docs/rfc/0001-semantic-dom.md
 */
import React from 'react';
import type { SemanticSchema } from '@sheinx/base';
import type { PaginationSemanticKey } from '@sheinx/base';
import { Pagination } from 'shineout';

const PaginationSemanticDemo: React.FC = () => (
  <Pagination
    total={200}
    pageSize={10}
    defaultCurrent={3}
    layout={['links', 'jumper', 'list']}
    text={{ jumper: 'Go to {input}' }}
  />
);

const paginationSemantic: SemanticSchema<PaginationSemanticKey> = {
  keys: [
    {
      key: 'root',
      cn: 'Pagination 最外层容器',
      en: 'Pagination outermost wrapper element',
      version: '3.10.0',
      example: `<Pagination
  classNames={{ root: 'my-pagination' }}
  styles={{ root: { padding: '8px 0' } }}
/>`,
    },
    {
      key: 'item',
      cn: '页码按钮（含 "..." 省略按钮）',
      en: 'Page number button (including "..." more button)',
      version: '3.10.0',
      example: `<Pagination
  classNames={{ item: 'my-page-btn' }}
  styles={{ item: { borderRadius: '50%' } }}
/>`,
    },
    {
      key: 'prev',
      cn: '上一页按钮',
      en: 'Previous page button',
      version: '3.10.0',
      example: `<Pagination
  classNames={{ prev: 'my-prev' }}
  styles={{ prev: { marginRight: 8 } }}
/>`,
    },
    {
      key: 'next',
      cn: '下一页按钮',
      en: 'Next page button',
      version: '3.10.0',
      example: `<Pagination
  classNames={{ next: 'my-next' }}
  styles={{ next: { marginLeft: 8 } }}
/>`,
    },
    {
      key: 'jumper',
      cn: '跳转输入区域',
      en: 'Jump-to-page input section',
      version: '3.10.0',
      example: `<Pagination
  classNames={{ jumper: 'my-jumper' }}
  styles={{ jumper: { marginLeft: 16 } }}
/>`,
    },
    {
      key: 'sizeList',
      cn: '每页条数选择区域',
      en: 'Page size selector section',
      version: '3.10.0',
      example: `<Pagination
  classNames={{ sizeList: 'my-size-list' }}
  styles={{ sizeList: { marginLeft: 16 } }}
/>`,
    },
  ],
  demo: PaginationSemanticDemo,
};

export default paginationSemantic;
