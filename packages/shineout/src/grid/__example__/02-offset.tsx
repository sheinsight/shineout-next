/**
 * cn - 偏移
 *    -- offset 属性可以设置偏移，取值方式和宽度相同
 * en - Offset
 *    -- The offset property set the offset in the same way as the width
 */
import React from 'react';
import { Grid } from 'shineout';

const style: React.CSSProperties = {
  background: '#e8ebf0',
};
const gridStyle: React.CSSProperties = {
  color: '#fff',
  lineHeight: '60px',
  textAlign: 'center',
  background: '#197afa',
  fontSize: 14,
};

const App: React.FC = () => (
  <div style={style}>
    <Grid width={1 / 3} offset={1 / 3} style={gridStyle}>
      With 1/3, Offset 1/3
    </Grid>
  </div>
);

export default App;
