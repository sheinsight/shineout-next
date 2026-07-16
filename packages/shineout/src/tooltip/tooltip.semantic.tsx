/**
 * Tooltip Semantic DOM 元数据。
 *
 * 文档站构建时通过 chunk 模板自动引入，渲染 Semantic tab。
 * 修改 key 列表即修改 TooltipSemanticKey 公开契约，需谨慎。
 *
 * @see /docs/rfc/0001-semantic-dom.md
 */
import React from 'react';
import type { SemanticSchema } from '@sheinx/base';
import type { TooltipSemanticKey } from '@sheinx/base';
import Tooltip from './index';

const TooltipSemanticDemo: React.FC = () => (
  <Tooltip tip="This is the tooltip content." trigger="click">
    <span style={{ padding: '4px 8px', border: '1px solid #d9d9d9', borderRadius: 4, cursor: 'pointer' }}>
      Click me
    </span>
  </Tooltip>
);

const tooltipSemantic: SemanticSchema<TooltipSemanticKey> = {
  keys: [
    {
      key: 'root',
      cn: '最外层弹层容器（与 className 等价）',
      en: 'Outer wrapper of the tooltip popup (equivalent to className)',
      version: '3.10.0',
      example: `<Tooltip
  tip="hello"
  classNames={{
    root: 'my-classname'
  }}
  styles={{
    root: {
      color: 'red'
    }
  }}
/>`,
    },
    {
      key: 'arrow',
      cn: '指向触发元素的小箭头',
      en: 'The small arrow pointing at the trigger element',
      version: '3.10.0',
      example: `<Tooltip
  tip="hello"
  classNames={{
    arrow: 'my-arrow'
  }}
  styles={{
    arrow: {
      background: '#fafafa'
    }
  }}
/>`,
    },
    {
      key: 'content',
      cn: '弹层内容承载区',
      en: 'The inner content area',
      version: '3.10.0',
      example: `<Tooltip
  tip="hello"
  classNames={{
    content: 'my-content'
  }}
  styles={{
    content: {
      padding: 16,
      borderRadius: 8
    }
  }}
/>`,
    },
  ],
  demo: TooltipSemanticDemo,
};

export default tooltipSemantic;
