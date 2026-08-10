/**
 * cn - Semantic DOM
 *    -- 通过 `classNames` 和 `styles` 两个 prop 精准定制内部 DOM 节点（root / image / text / button）。
 *    -- 可用 key 列表见组件 Semantic DOM 章节。
 * en - Semantic DOM
 *    -- Use `classNames` and `styles` props to customize internal DOM nodes (root / image / text / button).
 *    -- See the Semantic DOM section for the full key list.
 */
import React from 'react';
import { Skeleton } from 'shineout';

export default () => {
  return (
    <Skeleton
      loading
      animation
      image
      button
      styles={{
        root: { padding: 16 },
        image: { borderRadius: 8 },
        text: { marginTop: 8 },
        button: { marginTop: 16 },
      }}
    />
  );
};
