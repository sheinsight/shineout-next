/**
 * cn - Semantic DOM
 *    -- 通过 `classNames` 和 `styles` 两个 prop 精准定制内部 DOM 节点（root / step / tail / icon / title / description / content）。
 *    -- `classNames` 支持**静态字符串**或**函数**两种形式。函数接收状态快照（`status` / `index`），可按状态动态返回 class。
 *    -- 可用 key 列表见组件 Semantic DOM 章节。
 * en - Semantic DOM
 *    -- Use `classNames` and `styles` props to customize internal DOM nodes (root / step / tail / icon / title / description / content).
 *    -- `classNames` accepts a **static string** or a **function**. The function receives a state snapshot (`status` / `index`) and can return different classes based on state.
 *    -- See the Semantic DOM section for the full key list.
 */
import React from 'react';
import { Steps } from 'shineout';

export default () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
      {/* 静态 classNames + styles（在 Steps 容器上统一设置） */}
      <Steps
        current={1}
        classNames={{ root: 'my-steps' }}
        styles={{ root: { padding: 16 } }}
      >
        <Steps.Step
          title="Completed"
          description="First step"
          styles={{ icon: { boxShadow: '0 0 0 2px #1890ff' } }}
        />
        <Steps.Step
          title="In Progress"
          description="Second step"
          styles={{ title: { fontWeight: 'bold', color: '#1890ff' } }}
        />
        <Steps.Step
          title="Waiting"
          description="Third step"
        />
      </Steps>

      {/* 函数式 classNames（在 Step 上根据状态动态设置） */}
      <Steps current={2}>
        <Steps.Step
          title="Step 1"
          classNames={{
            step: ({ status }) => status === 'finish' ? 'step-done' : '',
            icon: ({ status }) => status === 'finish' ? 'icon-done' : '',
          }}
        />
        <Steps.Step
          title="Step 2"
          classNames={{
            step: ({ status }) => status === 'finish' ? 'step-done' : '',
          }}
        />
        <Steps.Step
          title="Step 3"
          classNames={{
            step: ({ status }) => status === 'process' ? 'step-active' : '',
          }}
          styles={{ title: { color: '#52c41a' } }}
        />
      </Steps>
    </div>
  );
};
