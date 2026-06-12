/**
 * Popover Semantic DOM 元数据。
 *
 * 文档站构建时通过 chunk 模板自动引入，渲染 Semantic tab。
 * 修改 key 列表即修改 PopoverSemanticKey 公开契约，需谨慎。
 *
 * @see /docs/rfc/0001-semantic-dom.md
 */
import React from 'react';
import type { SemanticSchema } from '@sheinx/base';
import type { PopoverSemanticKey } from '@sheinx/base';
import Popover from './popover';
import Button from '../button';

const PopoverSemanticDemo: React.FC = () => (
  <Button mode="outline">
    Hover me
    <Popover visible={true}>This is the popover content area.</Popover>
  </Button>
);

const popoverSemantic: SemanticSchema<PopoverSemanticKey> = {
  keys: [
    {
      key: 'root',
      cn: '最外层弹层容器（与 className 等价）',
      en: 'Outer wrapper of the popup (equivalent to className)',
      version: '3.10.0',
    },
    {
      key: 'arrow',
      cn: '指向触发元素的小箭头',
      en: 'The small arrow pointing at the trigger element',
      version: '3.10.0',
    },
    {
      key: 'content',
      cn: '弹层内容承载区',
      en: 'The inner content area',
      version: '3.10.0',
    },
  ],
  demo: PopoverSemanticDemo,
};

export default popoverSemantic;
