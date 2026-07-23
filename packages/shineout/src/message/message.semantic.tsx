/**
 * Message Semantic DOM 元数据。
 *
 * 文档站构建时通过 chunk 模板自动引入，渲染 Semantic tab。
 *
 * @see /docs/rfc/0001-semantic-dom.md
 */
import React from 'react';
import type { SemanticSchema } from '@sheinx/base';
import type { MessageSemanticKey } from '@sheinx/base';
import Message from './index';
import Button from '../button';

const MessageSemanticDemo: React.FC = () => (
  <div style={{ width: '100%', display: 'flex', gap: 16, flexWrap: 'wrap' }}>
    <Button
      onClick={() => {
        Message.info('This is an info message', 5);
      }}
    >
      Info Message
    </Button>
    <Button
      onClick={() => {
        Message.success('Operation succeeded', 5);
      }}
    >
      Success Message
    </Button>
    <Button
      onClick={() => {
        Message.warning('Warning notification', 5);
      }}
    >
      Warning Message
    </Button>
  </div>
);

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
