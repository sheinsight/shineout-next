/**
 * cn - Semantic DOM
 *    -- 通过 `classNames` 和 `styles` 两个 prop 精准定制内部 DOM 节点（root / indicator / content）。
 *    -- 可用 key 列表见组件 Semantic DOM 章节。
 * en - Semantic DOM
 *    -- Use `classNames` and `styles` props to customize internal DOM nodes (root / indicator / content).
 *    -- See the Semantic DOM section for the full key list.
 */
import React from 'react';
import { Switch } from 'shineout';

export default () => {
  return (
    <Switch
      defaultValue
      content={['On', 'Off']}
      styles={{
        root: { borderRadius: 4 },
        indicator: { borderRadius: 4 },
        content: { fontSize: 12, fontWeight: 500 },
      }}
    />
  );
};
