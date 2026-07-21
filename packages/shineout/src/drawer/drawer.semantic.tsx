/**
 * Drawer Semantic DOM 元数据。
 *
 * Drawer 复用 Modal 的 DOM 结构和 Semantic Key。
 *
 * @see /docs/rfc/0001-semantic-dom.md
 */
import React, { useState } from 'react';
import type { SemanticSchema } from '@sheinx/base';
import type { ModalSemanticKey } from '@sheinx/base';
import Drawer from './index';
import Button from '../button';

const DrawerSemanticDemo: React.FC = () => {
  const containerRef = React.useRef<HTMLDivElement | null>(null)
  return (
    <div style={{ width: '100%', height: '100%', transform: 'translateZ(0)' }} ref={containerRef}>
      <Drawer
        visible
        title="Drawer Title"
        footer={<Button>OK</Button>}
        style={{ maxHeight: '100%' }}
        container={() => containerRef.current}
      >
        This is the drawer body content.
      </Drawer>
    </div>
  );
};

const drawerSemantic: SemanticSchema<ModalSemanticKey> = {
  keys: [
    {
      key: 'root',
      cn: '最外层容器（wrapper，控制动画和显示）',
      en: 'Outermost wrapper (controls animation and visibility)',
      version: '3.10.0',
      example: `<Drawer
  classNames={{ root: 'my-drawer-wrapper' }}
  styles={{ root: { zIndex: 2000 } }}
/>`,
    },
    {
      key: 'mask',
      cn: '遮罩层',
      en: 'Mask overlay layer',
      version: '3.10.0',
      example: `<Drawer
  classNames={{ mask: 'my-mask' }}
  styles={{ mask: { backdropFilter: 'blur(4px)' } }}
/>`,
    },
    {
      key: 'container',
      cn: '内容面板（控制宽高和位置）',
      en: 'Content panel (controls width, height and position)',
      version: '3.10.0',
      example: `<Drawer
  classNames={{ container: 'my-panel' }}
  styles={{ container: { maxHeight: '80%' } }}
/>`,
    },
    {
      key: 'header',
      cn: '标题栏',
      en: 'Header area',
      version: '3.10.0',
      example: `<Drawer
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
      example: `<Drawer
  classNames={{ body: 'my-body' }}
  styles={{ body: { padding: 24 } }}
/>`,
    },
    {
      key: 'footer',
      cn: '底部操作区',
      en: 'Footer action area',
      version: '3.10.0',
      example: `<Drawer
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
      example: `<Drawer
  classNames={{ close: 'my-close' }}
  styles={{ close: { opacity: 0.6 } }}
/>`,
    },
  ],
  demo: DrawerSemanticDemo,
};

export default drawerSemantic;
