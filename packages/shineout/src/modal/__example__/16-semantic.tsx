/**
 * cn - Semantic DOM
 *    -- 通过 `classNames` 和 `styles` 两个 prop 精准定制内部 DOM 节点（root / mask / header / body / footer / close）。
 *    -- `classNames` 支持**静态字符串**或**函数**两种形式。函数接收状态快照（`visible`），可按状态动态返回 class。
 *    -- 可用 key 列表见组件 Semantic DOM 章节。
 * en - Semantic DOM
 *    -- Use `classNames` and `styles` props to customize internal DOM nodes (root / mask / header / body / footer / close).
 *    -- `classNames` accepts a **static string** or a **function**. The function receives a state snapshot (`visible`) and can return different classes based on state.
 *    -- See the Semantic DOM section for the full key list.
 */
import React, { useState } from 'react';
import { Modal, Button } from 'shineout';

export default () => {
  const [visible, setVisible] = useState(false);

  return (
    <div>
      <Button onClick={() => setVisible(true)}>Open Semantic Modal</Button>

      <Modal
        visible={visible}
        title="Semantic DOM Demo"
        onClose={() => setVisible(false)}
        footer={<Button onClick={() => setVisible(false)}>OK</Button>}
        classNames={{
          root: ({ visible }) => visible ? 'my-modal my-modal--visible' : 'my-modal',
          mask: 'my-modal-mask',
          header: 'my-modal-header',
          body: 'my-modal-body',
          footer: 'my-modal-footer',
          close: 'my-modal-close',
        }}
        styles={{
          header: { borderBottom: '1px solid #f0f0f0' },
          body: { padding: 24 },
          footer: { borderTop: '1px solid #f0f0f0' },
        }}
      >
        <p>Modal body with custom styles via Semantic DOM API.</p>
        <p>Each internal node can be independently customized.</p>
      </Modal>
    </div>
  );
};
