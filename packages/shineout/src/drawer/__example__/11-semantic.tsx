/**
 * cn - Semantic DOM
 *    -- 通过 `classNames` 和 `styles` 两个 prop 精准定制内部 DOM 节点（root / mask / header / body / footer / close）。
 *    -- Drawer 与 Modal 共享相同的 Semantic Key，支持相同的定制能力。
 *    -- `classNames` 支持**静态字符串**或**函数**两种形式。函数接收状态快照（`visible`），可按状态动态返回 class。
 * en - Semantic DOM
 *    -- Use `classNames` and `styles` props to customize internal DOM nodes (root / mask / header / body / footer / close).
 *    -- Drawer shares the same Semantic Keys with Modal.
 *    -- `classNames` accepts a **static string** or a **function**. The function receives a state snapshot (`visible`) and can return different classes based on state.
 */
import React, { useState } from 'react';
import { Drawer, Button } from 'shineout';

export default () => {
  const [visible, setVisible] = useState(false);

  return (
    <div>
      <Button onClick={() => setVisible(true)}>Open Semantic Drawer</Button>

      <Drawer
        visible={visible}
        title="Semantic DOM Demo"
        onClose={() => setVisible(false)}
        footer={<Button onClick={() => setVisible(false)}>OK</Button>}
        classNames={{
          root: ({ visible }) => visible ? 'my-drawer my-drawer--open' : 'my-drawer',
          mask: 'my-drawer-mask',
          header: 'my-drawer-header',
          body: 'my-drawer-body',
          footer: 'my-drawer-footer',
          close: 'my-drawer-close',
        }}
        styles={{
          header: { borderBottom: '1px solid #f0f0f0' },
          body: { padding: 24 },
          footer: { borderTop: '1px solid #f0f0f0' },
        }}
      >
        <p>Drawer body with custom styles via Semantic DOM API.</p>
        <p>Each internal node can be independently customized.</p>
      </Drawer>
    </div>
  );
};
