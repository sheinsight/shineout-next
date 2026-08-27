/**
 * Cascader Semantic DOM 元数据。
 *
 * 文档站构建时通过 chunk 模板自动引入，渲染 Semantic tab。
 *
 * @see /docs/rfc/0001-semantic-dom.md
 */
import React from 'react';
import type { SemanticSchema } from '@sheinx/base';
import type { CascaderSemanticKey } from '@sheinx/base';
import { Cascader } from 'shineout';

const cascaderData = [
  {
    id: '1',
    name: 'February',
    children: [
      { id: '1-1', name: 'February-February' },
      { id: '1-2', name: 'February-February' },
    ],
  },
  {
    id: '2',
    name: 'March',
    children: [{ id: '2-1', name: 'March-March' }],
  },
  { id: '3', name: 'April' },
];

const CascaderSemanticDemo: React.FC = () => (
  <div style={{ width: 300 }}>
    <Cascader
      data={cascaderData}
      keygen='id'
      renderItem={(node: any) => node.name}
      placeholder='Please select'
      height={150}
    />
  </div>
);

const cascaderSemantic: SemanticSchema<CascaderSemanticKey> = {
  keys: [
    {
      key: 'root',
      cn: 'Cascader 最外层容器',
      en: 'Cascader outermost wrapper element',
      version: '3.10.0',
      example: `<Cascader
  classNames={{ root: 'my-cascader' }}
  styles={{ root: { border: '1px solid #eee' } }}
/>`,
    },
    {
      key: 'header',
      cn: '结果区域（显示已选值 / placeholder）',
      en: 'Header area (shows selected values / placeholder)',
      version: '3.10.0',
      example: `<Cascader
  classNames={{ header: 'my-header' }}
  styles={{ header: { padding: '8px' } }}
/>`,
    },
    {
      key: 'popup',
      cn: '下拉面板',
      en: 'Dropdown popup panel',
      version: '3.10.0',
      example: `<Cascader
  classNames={{ popup: 'my-popup' }}
  styles={{ popup: { background: '#fff' } }}
/>`,
    },
    {
      key: 'list',
      cn: '每列列表容器',
      en: 'Each column list container',
      version: '3.10.0',
      example: `<Cascader
  classNames={{ list: 'my-list' }}
  styles={{ list: { maxHeight: '300px' } }}
/>`,
    },
    {
      key: 'option',
      cn: '列表项',
      en: 'List item option',
      version: '3.10.0',
      example: `<Cascader
  classNames={{ option: 'my-option' }}
  styles={{ option: { padding: '8px 12px' } }}
/>`,
    },
  ],
  demo: CascaderSemanticDemo,
};

export default cascaderSemantic;
