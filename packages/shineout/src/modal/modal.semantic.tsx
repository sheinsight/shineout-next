/**
 * Modal Semantic DOM 元数据。
 *
 * @see /docs/rfc/0001-semantic-dom.md
 */
import React, { useState } from 'react';
import type { SemanticSchema } from '@sheinx/base';
import type { ModalSemanticKey } from '@sheinx/base';
import Modal from './index';
import Button from '../button';

const ModalSemanticDemo: React.FC = () => {
  const containerRef = React.useRef<HTMLDivElement | null>(null)
  return (
    <div style={{ width: '100%', height: '100%', transform: 'translateZ(0)' }} ref={containerRef}>
      <Modal
        visible
        title="Modal Title"
        footer={<Button>OK</Button>}
        container={() => containerRef.current}
      >
        This is the modal body content.
      </Modal>
    </div>
  );
};

const modalSemantic: SemanticSchema<ModalSemanticKey> = {
  keys: [
    {
      key: 'root',
      cn: '最外层容器（wrapper，控制动画和显示）',
      en: 'Outermost wrapper (controls animation and visibility)',
      version: '3.10.0',
      example: `<Modal
  classNames={{ root: 'my-modal-wrapper' }}
  styles={{ root: { zIndex: 2000 } }}
/>`,
    },
    {
      key: 'mask',
      cn: '遮罩层',
      en: 'Mask overlay layer',
      version: '3.10.0',
      example: `<Modal
  classNames={{ mask: 'my-mask' }}
  styles={{ mask: { backdropFilter: 'blur(4px)' } }}
/>`,
    },
    {
      key: 'container',
      cn: '内容面板',
      en: 'Content panel',
      version: '3.10.0',
      example: `<Modal
  classNames={{ container: 'my-panel' }}
  styles={{ container: { borderRadius: 12 } }}
/>`,
    },
    {
      key: 'header',
      cn: '标题栏（包含标题文字和关闭按钮）',
      en: 'Header area (contains title and close button)',
      version: '3.10.0',
      example: `<Modal
  title="Title"
  classNames={{ header: 'my-header' }}
  styles={{ header: { borderBottom: '1px solid #eee' } }}
/>`,
    },
    {
      key: 'body',
      cn: '内容区',
      en: 'Body content area',
      version: '3.10.0',
      example: `<Modal
  classNames={{ body: 'my-body' }}
  styles={{ body: { padding: 24 } }}
/>`,
    },
    {
      key: 'footer',
      cn: '底部操作区',
      en: 'Footer action area',
      version: '3.10.0',
      example: `<Modal
  footer={<Button>OK</Button>}
  classNames={{ footer: 'my-footer' }}
  styles={{ footer: { borderTop: '1px solid #eee' } }}
/>`,
    },
    {
      key: 'close',
      cn: '关闭按钮',
      en: 'Close button',
      version: '3.10.0',
      example: `<Modal
  classNames={{ close: 'my-close' }}
  styles={{ close: { color: 'red' } }}
/>`,
    },
  ],
  demo: ModalSemanticDemo,
};

export default modalSemantic;
