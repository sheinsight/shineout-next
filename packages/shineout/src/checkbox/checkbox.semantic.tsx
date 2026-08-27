/**
 * Checkbox Semantic DOM 元数据。
 *
 * 文档站构建时通过 chunk 模板自动引入，渲染 Semantic tab。
 *
 * @see /docs/rfc/0001-semantic-dom.md
 */
import React from 'react';
import type { SemanticSchema } from '@sheinx/base';
import type { CheckboxSemanticKey } from '@sheinx/base';
import { Checkbox } from 'shineout';

const CheckboxSemanticDemo: React.FC = () => (
  <Checkbox.Group keygen data={['Option A', 'Option B', 'Option C']} defaultValue={['Option A']} />
);

const checkboxSemantic: SemanticSchema<CheckboxSemanticKey> = {
  keys: [
    {
      key: 'root',
      cn: 'Checkbox 最外层容器',
      en: 'Checkbox outermost wrapper element',
      version: '3.10.0',
      example: `<Checkbox
  classNames={{ root: 'my-checkbox' }}
  styles={{ root: { padding: '4px 0' } }}
/>`,
    },
    {
      key: 'indicator',
      cn: '勾选框指示器区域（含方块图标）',
      en: 'Checkbox indicator area (includes the box icon)',
      version: '3.10.0',
      example: `<Checkbox
  classNames={{ indicator: 'my-indicator' }}
  styles={{ indicator: { borderRadius: 4 } }}
/>`,
    },
    {
      key: 'label',
      cn: '文字标签区域',
      en: 'Label text area',
      version: '3.10.0',
      example: `<Checkbox
  classNames={{ label: 'my-label' }}
  styles={{ label: { fontWeight: 500 } }}
/>`,
    },
    {
      key: 'group',
      cn: 'Checkbox.Group 容器',
      en: 'Checkbox.Group container',
      version: '3.10.0',
      example: `<Checkbox.Group
  classNames={{ group: 'my-group' }}
  styles={{ group: { gap: 16 } }}
/>`,
    },
  ],
  demo: CheckboxSemanticDemo,
};

export default checkboxSemantic;
