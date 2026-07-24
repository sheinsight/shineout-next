/**
 * cn - Semantic DOM
 *    -- 通过 `classNames` 和 `styles` 两个 prop 精准定制内部 DOM 节点（root）。
 *    -- 可用 key 列表见组件 Semantic DOM 章节。
 * en - Semantic DOM
 *    -- Use `classNames` and `styles` props to customize internal DOM nodes (root).
 *    -- See the Semantic DOM section for the full key list.
 */
import React from 'react';
import { Grid } from 'shineout';

export default () => {
  return (
    <Grid
      gutter={16}
      classNames={{ root: 'my-grid-container' }}
      styles={{ root: { padding: 16, background: '#fafafa', borderRadius: 8 } }}
    >
      <Grid width={1 / 3}>
        <div style={{ padding: 12, background: '#e6f4ff', textAlign: 'center', borderRadius: 4 }}>1/3</div>
      </Grid>
      <Grid width={1 / 3}>
        <div style={{ padding: 12, background: '#e6f4ff', textAlign: 'center', borderRadius: 4 }}>1/3</div>
      </Grid>
      <Grid width={1 / 3}>
        <div style={{ padding: 12, background: '#e6f4ff', textAlign: 'center', borderRadius: 4 }}>1/3</div>
      </Grid>
    </Grid>
  );
};
