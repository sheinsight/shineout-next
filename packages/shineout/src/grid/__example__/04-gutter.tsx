/**
 * cn - 间距
 *    -- 通过 gutter 属性设置栅格间距
 * en - Gutter
 *    -- Set grid spacing through the gutter property
 */
import React from 'react';
import { Grid } from 'shineout';

const style: React.CSSProperties = {
  background: '#e8ebf0',
};
const gridStyle: React.CSSProperties = {
  color: '#fff',
  lineHeight: '30px',
  textAlign: 'center',
  background: '#197afa',
  fontSize: 14,
};
const gridStyle2: React.CSSProperties = {
  color: '#fff',
  lineHeight: '30px',
  textAlign: 'center',
  background: '#6bb5ff',
  fontSize: 14,
};

const App: React.FC = () => (
  <div style={style}>
    <Grid gutter={8}>
      {Array.from({ length: 8 })
        .map((_, i) => i + 1)
        .map((i) => (
          <Grid key={i} width={1 / 8}>
            <div style={i % 2 === 0 ? gridStyle2 : gridStyle}>1/8</div>
          </Grid>
        ))}
    </Grid>
  </div>
);

export default App;
