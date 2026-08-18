/**
 * cn - Semantic DOM
 *    -- 通过 `classNames` 和 `styles` 两个 prop 精准定制内部 DOM 节点（root / indicator / label / group）。
 *    -- 可用 key 列表见组件 Semantic DOM 章节。
 * en - Semantic DOM
 *    -- Use `classNames` and `styles` props to customize internal DOM nodes (root / indicator / label / group).
 *    -- See the Semantic DOM section for the full key list.
 */
import React from 'react';
import { Radio } from 'shineout';

export default () => {
  return (
    <Radio.Group
      keygen
      data={['Apple', 'Banana', 'Orange']}
      defaultValue='Apple'
      styles={{
        group: { gap: 16, padding: 12, background: '#fafafa', borderRadius: 8 },
        root: { padding: '4px 8px' },
        indicator: { marginRight: 8 },
        label: { fontWeight: 500 },
      }}
    />
  );
};
