/**
 * cn - Semantic DOM
 *    -- 通过 `classNames` 和 `styles` 两个 prop 精准定制内部 DOM 节点（root / content）。
 *    -- 可用 key 列表见组件 Semantic DOM 章节。
 * en - Semantic DOM
 *    -- Use `classNames` and `styles` props to customize internal DOM nodes (root / content).
 *    -- See the Semantic DOM section for the full key list.
 */
import React from 'react';
import { Divider } from 'shineout';

export default () => {
  return (
    <div>
      <Divider
        classNames={{ root: 'my-divider', content: 'my-divider-text' }}
        styles={{
          root: { margin: '24px 0' },
          content: { fontSize: 16, fontWeight: 'bold', color: '#1677ff' },
        }}
      >
        Custom Styled Section
      </Divider>
    </div>
  );
};
