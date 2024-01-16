/**
 * cn - 嵌套
 *    -- 嵌套的栅格
 * en - Nested
 *    -- Nested grids
 */
import React from 'react';
import { Grid } from 'shineout';

const style: React.CSSProperties = {
  color: '#fff',
  lineHeight: '30px',
  textAlign: 'center',
  background: '#197afa',
  fontSize: 14,
};

const App: React.FC = () => (
  <Grid style={{ textAlign: 'center' }}>
    <Grid width={1 / 2} style={style}>
      1/2
    </Grid>

    <Grid width={1 / 2} style={{ lineHeight: '30px' }}>
      <div style={{ fontSize: 14 }}>1/2</div>
      <div>
        <Grid style={style} width={1 / 3}>
          1/3
        </Grid>
        <Grid
          style={{ ...style, background: '#6bb5ff', color: '#fff', fontSize: 14 }}
          width={1 / 3}
        >
          1/3
        </Grid>
        <Grid style={style} width={1 / 3}>
          1/3
        </Grid>
      </div>
    </Grid>
  </Grid>
);

export default App;
