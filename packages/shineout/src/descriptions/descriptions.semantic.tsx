/**
 * Descriptions Semantic DOM 元数据。
 *
 * 文档站构建时通过 chunk 模板自动引入，渲染 Semantic tab。
 *
 * @see /docs/rfc/0001-semantic-dom.md
 */
import React from 'react';
import type { SemanticSchema } from '@sheinx/base';
import type { DescriptionsSemanticKey } from '@sheinx/base';
import { Descriptions } from 'shineout';

const items = [
  { label: 'Name', value: 'Tom' },
  { label: 'Age', value: '28' },
  { label: 'Address', value: 'New York' },
  { label: 'Phone', value: '123-456-7890' },
];

const DescriptionsSemanticDemo: React.FC = () => (
  <Descriptions title='User Info' extra='Detail' items={items} border column={2} style={{ width: 400 }} />
);

const descriptionsSemantic: SemanticSchema<DescriptionsSemanticKey> = {
  keys: [
    {
      key: 'root',
      cn: 'Descriptions 最外层容器',
      en: 'Descriptions outermost wrapper element',
      version: '3.10.0',
      example: `<Descriptions
  classNames={{ root: 'my-descriptions' }}
  styles={{ root: { borderRadius: 8 } }}
/>`,
    },
    {
      key: 'header',
      cn: '标题区域容器',
      en: 'Header section container',
      version: '3.10.0',
      example: `<Descriptions
  classNames={{ header: 'my-header' }}
  styles={{ header: { marginBottom: 16 } }}
/>`,
    },
    {
      key: 'title',
      cn: '标题',
      en: 'Title element',
      version: '3.10.0',
      example: `<Descriptions
  classNames={{ title: 'my-title' }}
  styles={{ title: { fontSize: 18 } }}
/>`,
    },
    {
      key: 'extra',
      cn: '额外内容',
      en: 'Extra content element',
      version: '3.10.0',
      example: `<Descriptions
  classNames={{ extra: 'my-extra' }}
  styles={{ extra: { color: '#1890ff' } }}
/>`,
    },
    {
      key: 'table',
      cn: '表格元素',
      en: 'Table element',
      version: '3.10.0',
      example: `<Descriptions
  classNames={{ table: 'my-table' }}
  styles={{ table: { width: '100%' } }}
/>`,
    },
    {
      key: 'label',
      cn: '描述项标签',
      en: 'Description item label',
      version: '3.10.0',
      example: `<Descriptions
  classNames={{ label: 'my-label' }}
  styles={{ label: { fontWeight: 600 } }}
/>`,
    },
    {
      key: 'value',
      cn: '描述项值',
      en: 'Description item value',
      version: '3.10.0',
      example: `<Descriptions
  classNames={{ value: 'my-value' }}
  styles={{ value: { color: '#333' } }}
/>`,
    },
  ],
  demo: DescriptionsSemanticDemo,
};

export default descriptionsSemantic;
