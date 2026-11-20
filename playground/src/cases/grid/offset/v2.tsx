import { Grid } from 'shineout-v2';

const gridStyle = { color: '#fff', lineHeight: '60px', textAlign: 'center' as const, background: '#197afa', fontSize: 14 };

export default function Demo() {
  return (
    <div style={{ background: '#e8ebf0' }}>
      <Grid width={1 / 3} offset={1 / 3} style={gridStyle}>
        With 1/3, Offset 1/3
      </Grid>
    </div>
  );
}
