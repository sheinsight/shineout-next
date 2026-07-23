/**
 * Message Semantic DOM 元数据。
 *
 * 文档站构建时通过 chunk 模板自动引入，渲染 Semantic tab。
 *
 * @see /docs/rfc/0001-semantic-dom.md
 */
import React, { useEffect, useRef } from 'react';
import type { SemanticSchema } from '@sheinx/base';
import type { MessageSemanticKey } from '@sheinx/base';
import Message from './index';

const MessageSemanticDemo: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const container = containerRef.current;

    // 分散到不同位置，避免重叠
    Message.info('This is an info message', 0, { container, position: 'top-left' });
    Message.success('Operation succeeded', 0, { container, position: 'top-right' });
    Message.warning('Warning notification', 0, { container, position: 'bottom-left' });
  }, []);

  return (
    <div
      ref={containerRef}
      style={{
        position: 'relative',
        width: '100%',
        height: '100%',
        minHeight: 240,
        transform: 'translateZ(0)',
        overflow: 'hidden',
      }}
    />
  );
};

const messageSemantic: SemanticSchema<MessageSemanticKey> = {
  keys: [
    {
      key: 'root',
      cn: '最外层容器（按位置定位的消息管理器）',
      en: 'Outermost wrapper (position-based message container)',
      version: '3.10.0',
      example: `Message.info('Hello', 3, {
  styles: { root: { zIndex: 2000 } }
})`,
    },
    {
      key: 'item',
      cn: '单条消息容器（动画控制层）',
      en: 'Individual message wrapper (animation controller)',
      version: '3.10.0',
      example: `Message.info('Hello', 3, {
  classNames: { item: 'my-message-item' },
  styles: { item: { boxShadow: '0 4px 12px rgba(0,0,0,0.15)' } }
})`,
    },
    {
      key: 'message',
      cn: '消息内容区（Alert 包装层）',
      en: 'Message content area (Alert wrapper)',
      version: '3.10.0',
      example: `Message.info('Hello', 3, {
  classNames: { message: 'my-message-content' },
  styles: { message: { borderRadius: 8 } }
})`,
    },
  ],
  demo: MessageSemanticDemo,
};

export default messageSemantic;
