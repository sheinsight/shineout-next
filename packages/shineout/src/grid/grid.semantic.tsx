/**
 * Grid Semantic DOM 元数据。
 *
 * @see /docs/rfc/0001-semantic-dom.md
 */
import React from 'react';
import type { SemanticSchema } from '@sheinx/base';
import type { GridSemanticKey } from '@sheinx/base';
import Grid from './index';

const GridSemanticDemo: React.FC = () => (
  <div style={{ width: '100%' }}>
    <Grid gutter={16}>
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
  </div>
);

const gridSemantic: SemanticSchema<GridSemanticKey> = {
  keys: [
    {
      key: 'root',
      cn: '栅格容器',
      en: 'Grid container element',
      version: '3.10.0',
      example: `<Grid
  classNames={{ root: 'my-grid' }}
  styles={{ root: { background: '#fafafa' } }}
>
  <Grid width={1/2}>Left</Grid>
  <Grid width={1/2}>Right</Grid>
</Grid>`,
    },
  ],
  demo: GridSemanticDemo,
};

export default gridSemantic;
