/**
 * cn - Semantic DOM
 *    -- 通过 `classNames` 和 `styles` 两个 prop 精准定制内部 DOM 节点（root / handler / item）。
 *    -- 可用 key 列表见组件 Semantic DOM 章节。
 * en - Semantic DOM
 *    -- Use `classNames` and `styles` props to customize internal DOM nodes (root / handler / item).
 *    -- See the Semantic DOM section for the full key list.
 */
import React from 'react';
import { Upload } from 'shineout';

export default () => {
  return (
    <Upload.Image
      action='/api/upload'
      defaultValue={['https://via.placeholder.com/80']}
      renderResult={(f: any) => f}
      styles={{
        root: { gap: 12 },
        handler: { borderRadius: 8, borderStyle: 'dashed' },
        item: { borderRadius: 8 },
      }}
    />
  );
};
