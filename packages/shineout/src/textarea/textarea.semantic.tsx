/**
 * Textarea Semantic DOM 元数据。
 *
 * 文档站构建时通过 chunk 模板自动引入，渲染 Semantic tab。
 *
 * @see /docs/rfc/0001-semantic-dom.md
 */
import React from 'react';
import type { SemanticSchema } from '@sheinx/base';
import type { TextareaSemanticKey } from '@sheinx/base';
import { Textarea } from 'shineout';

const TextareaSemanticDemo: React.FC = () => (
  <div style={{ width: 300 }}>
    <Textarea placeholder='Please input' rows={3} />
  </div>
);

const textareaSemantic: SemanticSchema<TextareaSemanticKey> = {
  keys: [
    {
      key: 'root',
      cn: 'Textarea 最外层容器',
      en: 'Textarea outermost wrapper element',
      version: '3.10.0',
      example: `<Textarea
  classNames={{ root: 'my-textarea' }}
  styles={{ root: { borderRadius: 8 } }}
/>`,
    },
    {
      key: 'textarea',
      cn: '内部 textarea 元素',
      en: 'Inner textarea element',
      version: '3.10.0',
      example: `<Textarea
  classNames={{ textarea: 'my-textarea-inner' }}
  styles={{ textarea: { fontFamily: 'monospace' } }}
/>`,
    },
  ],
  demo: TextareaSemanticDemo,
};

export default textareaSemantic;
