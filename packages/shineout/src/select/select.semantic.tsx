/**
 * Select Semantic DOM 元数据。
 *
 * 文档站构建时通过 chunk 模板自动引入，渲染 Semantic tab。
 *
 * @see /docs/rfc/0001-semantic-dom.md
 */
import React from 'react';
import type { SemanticSchema } from '@sheinx/base';
import type { SelectSemanticKey } from '@sheinx/base';
import { Select } from 'shineout';

const data = [
  { id: '1', name: 'Apple' },
  { id: '2', name: 'Banana' },
  { id: '3', name: 'Cherry' },
  { id: '4', name: 'Date' },
  { id: '5', name: 'Elderberry' },
];

const SelectSemanticDemo: React.FC = () => (
  <div style={{ display: 'flex', gap: 16 }}>
    <Select
      data={data}
      keygen='id'
      renderItem='name'
      placeholder='Select a fruit'
      defaultValue='1'
      style={{ width: 240 }}
    />
  </div>
);

const selectSemantic: SemanticSchema<SelectSemanticKey> = {
  keys: [
    {
      key: 'root',
      cn: 'Select 最外层容器',
      en: 'Select outermost wrapper element',
      version: '3.10.0',
      example: `<Select classNames={{ root: 'my-select' }} styles={{ root: { border: '1px solid #eee' } }} />`,
    },
    {
      key: 'header',
      cn: '结果区域（显示已选值 / placeholder）',
      en: 'Header area (shows selected values / placeholder)',
      version: '3.10.0',
      example: `<Select classNames={{ header: 'my-header' }} styles={{ header: { padding: '8px' } }} />`,
    },
    {
      key: 'popup',
      cn: '下拉面板',
      en: 'Dropdown popup panel',
      version: '3.10.0',
      example: `<Select classNames={{ popup: 'my-popup' }} styles={{ popup: { background: '#fff' } }} />`,
    },
    {
      key: 'list',
      cn: '选项列表容器',
      en: 'Options list container',
      version: '3.10.0',
      example: `<Select classNames={{ list: 'my-list' }} styles={{ list: { padding: 8 } }} />`,
    },
    {
      key: 'option',
      cn: '选项节点',
      en: 'Option item',
      version: '3.10.0',
      example: `<Select classNames={{ option: 'my-option' }} styles={{ option: { borderRadius: 4 } }} />`,
    },
    {
      key: 'optionInner',
      cn: '选项内容区域',
      en: 'Option inner content area',
      version: '3.10.0',
      example: `<Select classNames={{ optionInner: 'my-option-inner' }} styles={{ optionInner: { padding: '4px 8px' } }} />`,
    },
  ],
  demo: SelectSemanticDemo,
};

export default selectSemantic;
