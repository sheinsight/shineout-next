/**
 * Collapse Semantic DOM 元数据。
 *
 * 文档站构建时通过 chunk 模板自动引入，渲染 Semantic tab。
 *
 * @see /docs/rfc/0001-semantic-dom.md
 */
import React from 'react';
import type { SemanticSchema } from '@sheinx/base';
import type { CollapseSemanticKey } from '@sheinx/base';
import { Collapse } from 'shineout';

const CollapseSemanticDemo: React.FC = () => (
  <Collapse defaultActive={['1']} style={{ width: 400 }}>
    <Collapse.Item keygen='1' title='Panel Title 1' extra='Extra'>
      Content of panel 1
    </Collapse.Item>
    <Collapse.Item keygen='2' title='Panel Title 2'>
      Content of panel 2
    </Collapse.Item>
  </Collapse>
);

const collapseSemantic: SemanticSchema<CollapseSemanticKey> = {
  keys: [
    {
      key: 'root',
      cn: 'Collapse 最外层容器',
      en: 'Collapse outermost wrapper element',
      version: '3.10.0',
      example: `<Collapse
  classNames={{ root: 'my-collapse' }}
  styles={{ root: { borderRadius: 8 } }}
/>`,
    },
    {
      key: 'header',
      cn: '面板头部区域',
      en: 'Panel header section',
      version: '3.10.0',
      example: `<Collapse
  classNames={{ header: 'my-header' }}
  styles={{ header: { padding: '12px 16px' } }}
/>`,
    },
    {
      key: 'title',
      cn: '标题内容',
      en: 'Panel title text',
      version: '3.10.0',
      example: `<Collapse
  classNames={{ title: 'my-title' }}
  styles={{ title: { fontWeight: 600 } }}
/>`,
    },
    {
      key: 'extra',
      cn: '额外内容区',
      en: 'Extra content area in header',
      version: '3.10.0',
      example: `<Collapse
  classNames={{ extra: 'my-extra' }}
  styles={{ extra: { color: '#999' } }}
/>`,
    },
    {
      key: 'content',
      cn: '面板展开内容区',
      en: 'Panel expanded content area',
      version: '3.10.0',
      example: `<Collapse
  classNames={{ content: 'my-content' }}
  styles={{ content: { padding: '16px' } }}
/>`,
    },
    {
      key: 'icon',
      cn: '展开/折叠图标',
      en: 'Expand/collapse icon',
      version: '3.10.0',
      example: `<Collapse
  classNames={{ icon: 'my-icon' }}
  styles={{ icon: { color: '#1890ff' } }}
/>`,
    },
  ],
  demo: CollapseSemanticDemo,
};

export default collapseSemantic;
