/**
 * Input Semantic DOM 元数据。
 *
 * 文档站构建时通过 chunk 模板自动引入，渲染 Semantic tab。
 *
 * @see /docs/rfc/0001-semantic-dom.md
 */
import React from 'react';
import type { SemanticSchema } from '@sheinx/base';
import type { InputSemanticKey } from '@sheinx/base';
import { Input } from 'shineout';

const InputSemanticDemo: React.FC = () => (
  <div style={{ display: 'flex', gap: 16 }}>
    <Input placeholder='Enter text' defaultValue='Hello' style={{ width: 240 }} />
  </div>
);

const inputSemantic: SemanticSchema<InputSemanticKey> = {
  keys: [
    {
      key: 'root',
      cn: 'Input 最外层容器',
      en: 'Input outermost wrapper element',
      version: '3.10.0',
      example: `<Input classNames={{ root: 'my-input' }} styles={{ root: { borderRadius: 8 } }} />`,
    },
    {
      key: 'input',
      cn: '内部 <input> 元素',
      en: 'Inner <input> element',
      version: '3.10.0',
      example: `<Input classNames={{ input: 'my-input-el' }} styles={{ input: { fontSize: 16 } }} />`,
    },
  ],
  demo: InputSemanticDemo,
};

export default inputSemantic;
